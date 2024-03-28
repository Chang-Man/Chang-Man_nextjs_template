import { Metadata } from 'next';
import '@/styles/style.scss';
import SessionProvider from '@/components/providers/sessionProvider';
import { auth } from './api/auth/[...nextauth]/auth';
import TanstackProvider from '@/components/providers/tanstackProvider';
import SessionLoader from '@/components/providers/sessionLoader';

// export const metadata: Metadata = {
//   title: "title",
//   description: "database",
//   metadataBase: new URL(process.env.BASE_URL as string),
//   openGraph: {
//     title: "title",
//     description: "descsription",
//   },
//   alternates: {
//     canonical: "https://url",
//   },
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="kr">
      <body>
        <SessionProvider session={session}>
          <SessionLoader>
            <TanstackProvider>
              <main>{children}</main>
            </TanstackProvider>
          </SessionLoader>
        </SessionProvider>
      </body>
    </html>
  );
}
