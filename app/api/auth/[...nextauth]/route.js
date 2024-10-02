import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import App from '../../api'
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Send user data to Django backend
        const response = await App.post("/auth/google-signin/",
          {
            email: user.email,
            name: user.name,
            google_id: account.providerAccountId,
            // Add any other user data you want to store
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.success) {
          return true; // Allow sign in
        } else {
          return false; // Reject sign in
        }
      } catch (error) {
        console.error("Error during Google sign-in:", error);
        return false; // Reject sign in on error
      }
    },
    async jwt({ token, account }) {
      // Add the access token to the token object
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the access token to the session
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };