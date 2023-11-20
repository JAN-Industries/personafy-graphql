import queryResolvers from "./query";
import mutationResolvers from "./mutation";

export const resolvers = {
	Query: queryResolvers,
	Mutation: mutationResolvers,
};
