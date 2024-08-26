import {User} from '../lib/axios/types';
import {useUser} from '../lib/react-query/auth';

export const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
    isFetching,
    isFetched,
    isFetchedAfterMount,
    isError,
    isSuccess,
    isRefetchError,
    isRefetchSuccess,
    isRefetching,
    isUninitialized,
    status,
  }: {
    data: User | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
    isFetching: boolean;
    isFetched: boolean;
    isFetchedAfterMount: boolean;
    isError: boolean;
    isSuccess: boolean;
    isRefetchError: boolean;
    isRefetchSuccess: boolean;
    isRefetching: boolean;
    isUninitialized: boolean;
    status: string;
  } = useUser();
  return {
    user,
    isLoading,
    error,
    refetch,
    isFetching,
    isFetched,
    isFetchedAfterMount,
    isError,
    isSuccess,
    isRefetchError,
    isRefetchSuccess,
    isRefetching,
    isUninitialized,
    status,
  };
};
