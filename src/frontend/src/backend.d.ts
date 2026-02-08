import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SessionInput {
    imageId: string;
}
export type Time = bigint;
export interface CrossRealityScore {
    potentialRating: number;
    details: Array<ImageResult>;
    rating: number;
}
export interface SelfieSession {
    score: CrossRealityScore;
    timestamp: Time;
    imageId: string;
}
export interface UserProfile {
    name: string;
}
export enum ImageResult {
    goodLighting = "goodLighting",
    centeredFace = "centeredFace",
    smileDetected = "smileDetected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllSessions(): Promise<Array<SelfieSession>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCurrentCrossRealityScore(): Promise<number>;
    getSessionCount(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitSelfie(input: SessionInput): Promise<CrossRealityScore>;
}
