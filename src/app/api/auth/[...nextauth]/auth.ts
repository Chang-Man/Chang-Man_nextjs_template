import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'login',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const body = {
          ...credentials,
          email: credentials?.email,
          password: credentials?.password,
        };
        if (!body.password || !body.email) {
          return null;
        }

        const res = await fetch(process.env.BACKEND_ENDPOINT + '/auth/login', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        const response = await res.json();
        if (res.status === 401) {
          return null;
        }
        if (res.ok && response) {
          return response.data;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ token, session }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as any;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
