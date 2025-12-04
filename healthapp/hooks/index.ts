import { useUser } from '../lib/react-query/auth';

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
    isRefetching,
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
    isRefetching,
  };
};
