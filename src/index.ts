import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { books } from "./datasources/mock";
import { getUser } from "./auth/user";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

const resolvers = {
	Query: {
		books: () => books,
	},
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
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
	context: async ({ req, res }) => {
		// Get the user token from the headers.
		const token = req.headers.authorization || "";

		// Try to retrieve a user with the token
		const user = await getUser(token);

		// Add the user to the context
		return { user };
	},
});

console.log(`🚀  Server ready at: ${url}`);
