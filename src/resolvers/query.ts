import OpenAI from "openai";
import { books, users } from "../datasources/mock";

const queryResolvers = {
	books: () => books,
	users: () => users,
	user: (_: unknown, __: unknown, context: any) => {
		const user = users.find((user) => String(user.id) === context.user.id);
		if (!user) return null;
		user.image = context.user.image;
		return user;
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
