import { authOptions } from '@/shared/constants';
import NextAuth from 'next-auth';

export const dynamic = 'force-dynamic';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
