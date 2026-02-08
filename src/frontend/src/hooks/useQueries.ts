import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, SessionInput, CrossRealityScore, SelfieSession } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useSubmitSelfie() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation<CrossRealityScore, Error, SessionInput>({
    mutationFn: async (input: SessionInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitSelfie(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      queryClient.invalidateQueries({ queryKey: ['sessionCount'] });
    },
  });
}

export function useGetAllSessions() {
  const { actor, isFetching } = useActor();

  return useQuery<SelfieSession[]>({
    queryKey: ['sessions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSessions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSessionCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['sessionCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getSessionCount();
    },
    enabled: !!actor && !isFetching,
  });
}
