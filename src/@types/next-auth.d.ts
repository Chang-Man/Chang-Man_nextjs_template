import { DefaultSession, DefaultUser } from 'next-auth';
import { KakaoProfile } from 'next-auth/providers/kakao';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id?: number;
      role?: 'verified' | 'unverified';
    };
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id?: number;
      role?: 'verified' | 'unverified';
    };
    accessToken: string;
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    user: {
      id: number;
      role: 'verified' | 'unverified';
    };
    accessToken: string;
  }
}
