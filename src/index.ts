import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getUser } from "./auth/user";
import {
	resolvers as scalarResolvers,
	typeDefs as scalarTypeDefs,
} from "graphql-scalars";
import "dotenv/config";
import typeDefs from "./schema";
import { resolvers } from "./resolvers";

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
		const user = await getUser(sessionToken);
		return { user };
	},
});

console.log(`🚀  Server ready at: ${url}`);
