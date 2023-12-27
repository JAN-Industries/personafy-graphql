import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { books, users } from "./datasources/mock";
import { getUser } from "./auth/user";
import OpenAI from "openai";
import {
	resolvers as scalarResolvers,
	typeDefs as scalarTypeDefs,
} from "graphql-scalars";
import "dotenv/config";
import typeDefs from "./schema";
import { GraphQLError } from "graphql";
import { User } from "./types/generated";

const resolvers = {
	Query: {
		books: () => books,
		users: () => users,
		user: (_: unknown, __: unknown, { user }: { user: User }) => {
			if (!user) {
				return null;
			}
			return users.find((u) => String(u.id) === user.id);
		},
		askGPT: async (_: unknown, { question }) => {
			const openai = new OpenAI({
				apiKey: process.env["OPENAI_API_KEY"],
			});
			const chatCompletion = await openai.chat.completions
				.create({
					messages: [{ role: "user", content: question }],
					model: "gpt-3.5-turbo",
				})
				.catch((err) => ({
					content: null,
					error: err,
				}));
			return {
				content: (chatCompletion as any).choices[0].message.content,
				error: null,
			};
		},
	},
	Mutation: {
		addBook: (_: unknown, { title, author }) => {
			const book = { title, author, date: new Date().toDateString() };
			books.push(book);

			return {
				code: "200",
				success: true,
				message: "Book added successfully",
				book,
			};
		},
	},
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs: [...scalarTypeDefs, typeDefs],
	resolvers: {
		...scalarResolvers,
		...resolvers,
	},
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
	// Note: This example uses the `req` argument to access headers,
	// but the arguments received by `context` vary by integration.
	// This means they vary for Express, Fastify, Lambda, etc.

	// For `startStandaloneServer`, the `req` and `res` objects are
	// `http.IncomingMessage` and `http.ServerResponse` types.
	context: async ({ req }) => {
		// Get the user token from the headers.
		const sessionToken = req.headers.authorization || "";

		// console.log("sessionToken", sessionToken);

		// Try to retrieve a user with the token
		const user = await getUser(sessionToken);
		console.log("user", user);

		// Add the user to the context
		return { user };
	},
});

console.log(`🚀  Server ready at: ${url}`);
