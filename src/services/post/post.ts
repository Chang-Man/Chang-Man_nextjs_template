import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { axiosAuth } from '../axiosInstance';
import { useAxiosConfig } from '@/hooks/useAxiosConfig';

export const getPostList = (options?: UseSuspenseQueryOptions) => {
  const config = useAxiosConfig();
  return useSuspenseQuery({
    queryKey: ['post-list'],
    queryFn: async () => {
      const res = await axiosAuth.get('post', config);
      return res.data as IResponse<IPost[]>;
    },
    ...options,
  });
};
