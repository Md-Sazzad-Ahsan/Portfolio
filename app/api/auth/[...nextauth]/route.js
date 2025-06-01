import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log('Authorization attempt for email:', credentials.email);
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            console.log('No user found with email:', credentials.email);
            return null;
          }
          
          console.log('User found, comparing passwords...');
          console.log('Input password length:', credentials.password.length);
          console.log('Stored hash length:', user.password.length);
          console.log('Stored hash starts with:', user.password.substring(0, 10) + '...');
          
          try {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password, 
              user.password
            );
            
            console.log('Password comparison result:', isPasswordCorrect);
            if (!isPasswordCorrect) {
              console.log('Password comparison failed - hash does not match');
              return null;
            }
          } catch (error) {
            console.error('Error during password comparison:', error);
            return null;
          }
          
          return { 
            id: user._id.toString(),
            email: user.email, 
            name: user.name, 
            username: user.username, 
            isAdmin: user.isAdmin 
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { 
          id: user.id, 
          email: user.email, 
          name: user.name,
          username: user.username,
          isAdmin: user.isAdmin 
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
