import { decode } from "next-auth/jwt";
import "dotenv/config";

export async function getUser(sessionToken: string) {
	// console.log("sessionToken", sessionToken);
	try {
		// Verify the token
		const decodedToken = await decode({
			token: sessionToken,
			secret: process.env.NEXTAUTH_SECRET,
		});

		// console.log("decodedToken", decodedToken);

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
