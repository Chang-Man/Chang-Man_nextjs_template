import {
  UseSuspenseQueryOptions,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { axiosAuth } from '../axiosInstance';

export const getPostList = (options?: UseSuspenseQueryOptions) => {
  return useSuspenseQuery({
    queryKey: ['post-list'],
    queryFn: async () => {
      const res = await axiosAuth.get('post');
      return res.data as IResponse<IPost[]>;
    },
    ...options,
  });
};
