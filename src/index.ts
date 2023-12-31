import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getUser } from "./auth/user";
import {
	resolvers as scalarResolvers,
	typeDefs as scalarTypeDefs,
} from "graphql-scalars";
import "dotenv/config";
import typeDefs from "./schema";
import { User } from "./types/generated";
import { books, users } from "./datasources/mock";
import OpenAI from "openai";

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

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req }) => {
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
