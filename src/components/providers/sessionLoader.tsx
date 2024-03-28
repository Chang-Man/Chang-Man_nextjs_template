'use client';
import { Fragment, ReactNode, useEffect } from 'react';
import { notFound } from 'next/navigation';
import React from 'react';
import { axiosAuth, updateAccessToken } from '@/services/axiosInstance';
import { useSession } from 'next-auth/react';

export default function SessionLoader({ children }: { children: ReactNode }) {
  const { data: session } = useSession({ required: false });
  useEffect(() => {
    if (session?.accessToken) {
      updateAccessToken(session?.accessToken as string);
      axiosAuth.interceptors.response.use(
        response => {
          return response;
        },
        async error => {
          const config = error.config;
          const accessTokenExpired =
            error.response && error.response.status === 401 && !config._retry;
          const forbidden =
            error.response && error.response.status === 403 && !config._retry;
          const isNotFound =
            error.response && error.response.status === 404 && !config._retry;
          if (accessTokenExpired) {
            config._retry = true;
            try {
              // await checkLogin();
              updateAccessToken(session?.accessToken as string);
            } catch (_error) {
              // error toast
              return Promise.reject(_error);
            }
            return axiosAuth(config);
          } else if (isNotFound || forbidden) {
            notFound();
          }
          return Promise.reject(error);
        }
      );
    }
  }, [session]);

  return <Fragment>{children}</Fragment>;
}
