import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export const DateOrString = new GraphQLScalarType({
	name: "DateOrString",
	description: "Date or String custom scalar type",
	serialize(value) {
		return value; // value sent to the client
	},
	parseValue(value) {
		return value; // value from the client
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
			return ast.value; // ast value is always in string format
		}
		return null;
	},
});
