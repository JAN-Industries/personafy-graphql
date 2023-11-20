import OpenAI from "openai";
import { books, users } from "../datasources/mock";

const queryResolvers = {
	books: () => books,
	users: () => users,
	user: (_: unknown, __: unknown, context: any) => {
		console.log("context", context);
		return users.find((user) => String(user.id) === context.user.id);
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
};

export default queryResolvers;
