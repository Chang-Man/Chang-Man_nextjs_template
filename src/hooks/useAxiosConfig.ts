'use client';
import { AxiosRequestConfig } from 'axios';
import { useSession } from 'next-auth/react';

export const useAxiosConfig = () => {
  const { data: session } = useSession({ required: false });
  return {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  } as AxiosRequestConfig;
};
