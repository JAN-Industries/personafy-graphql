import { decode } from "next-auth/jwt";
import "dotenv/config";

export async function getUser(sessionToken: string) {
	if (!process.env.NEXTAUTH_SECRET)
		throw new Error("Set NEXTAUTH_SECRET env variable");
	try {
		// Verify the token
		const decodedToken = await decode({
			token: sessionToken,
			secret: process.env.NEXTAUTH_SECRET,
		});

		if (!decodedToken) return null;
		// Retrieve the user's information
		const user = {
			id: decodedToken.sub,
			name: decodedToken.name,
			email: decodedToken.email,
			image: decodedToken.picture,
		};
		return user;
	} catch (err) {
		console.error("Failed to authenticate user:", err);
		return null;
	}
}
