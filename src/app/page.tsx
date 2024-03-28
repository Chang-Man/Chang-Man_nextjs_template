import React from 'react';
const Home = dynamic(() => import('@/containers/home'), {
  ssr: false,
});
import dynamic from 'next/dynamic';

export default async function Page() {
  return <Home />;
}
