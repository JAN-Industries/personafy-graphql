import type { CodegenConfig } from "@graphql-codegen/cli";
import path from "path";

const config: CodegenConfig = {
	overwrite: true,
	schema: path.join(__dirname, "./src/schema/*.graphql"),
	generates: {
		"src/types/generated.ts": {
			plugins: ["typescript", "typescript-resolvers"],
			config: {
				scalars: {
					EmailAddress: "string",
					DateTime: "string",
				},
			},
		},
	},
};

export default config;
