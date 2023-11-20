import { books } from "../datasources/mock";

const mutationResolvers = {
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
};

export default mutationResolvers;
