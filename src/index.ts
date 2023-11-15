import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { books, users } from "./datasources/mock";
import { getUser } from "./auth/user";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typesArray = loadFilesSync(path.join(__dirname, "./schema/*.graphql"));
const typeDefs = mergeTypeDefs(typesArray);


const resolvers = {
	Query: {
		books: () => books,
		users: () => users,
		user: (_: unknown, { id }) => users.find((user) => String(user.id) === id),
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
