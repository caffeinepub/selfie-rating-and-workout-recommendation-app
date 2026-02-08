import Time "mo:core/Time";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type ImageResult = {
    #goodLighting;
    #smileDetected;
    #centeredFace;
  };

  type CrossRealityScore = {
    rating : Float;
    potentialRating : Float;
    details : [ImageResult];
  };

  type SelfieSession = {
    timestamp : Time.Time;
    imageId : Text;
    score : CrossRealityScore;
  };

  type SessionInput = {
    imageId : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  module CrossRealityScore {
    public func create(results : [ImageResult]) : CrossRealityScore {
      let score = 3 - results.size();
      let potential = 3;

      let rating = (score * 10).toFloat();
      let potentialRating = (potential * 10).toFloat();

      {
        rating;
        potentialRating;
        details = results;
      };
    };
  };

  let selfieSessions = Map.empty<Principal, [SelfieSession]>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func submitSelfie(input : SessionInput) : async CrossRealityScore {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit selfies");
    };

    let simulatedResults : [ImageResult] = [
      #goodLighting,
      #smileDetected,
      #centeredFace,
    ];

    let score = CrossRealityScore.create(simulatedResults);

    let session : SelfieSession = {
      timestamp = Time.now();
      imageId = input.imageId;
      score;
    };

    let currentSessions = switch (selfieSessions.get(caller)) {
      case (null) { [] };
      case (?sessions) { sessions };
    };
    let updatedSessions = currentSessions.concat([session]);
    selfieSessions.add(caller, updatedSessions);

    score;
  };

  func calculateCrossRealityScore(sessions : [SelfieSession]) : Float {
    if (sessions.size() == 0) { 0.0 } else {
      let ratings = sessions.map(
        func(session) {
          session.score.rating;
        }
      );
      let total = ratings.foldLeft(0.0, func(acc, rating) { acc + rating });
      total / sessions.size().toFloat();
    };
  };

  public query ({ caller }) func getCurrentCrossRealityScore() : async Float {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their current cross reality score");
    };
    calculateCrossRealityScore(
      switch (selfieSessions.get(caller)) {
        case (null) { [] };
        case (?sessions) { sessions };
      }
    );
  };

  public query ({ caller }) func getAllSessions() : async [SelfieSession] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can retrieve sessions");
    };
    switch (selfieSessions.get(caller)) {
      case (null) { [] };
      case (?sessions) { sessions };
    };
  };

  public query ({ caller }) func getSessionCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their session count");
    };
    switch (selfieSessions.get(caller)) {
      case (null) { 0 };
      case (?sessions) { sessions.size() };
    };
  };
};
