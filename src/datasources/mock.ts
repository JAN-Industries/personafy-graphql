export const books = [
	{
		title: "The Awakening",
		author: "Kate Chopin",
		date: new Date().toDateString(),
	},
	{
		title: "City of Glass",
		author: "Paul Auster",
		date: new Date().toDateString(),
	},
];

export const users = [
	{
		id: 1,
		name: "John Doe",
		email: "john.doe@email.com",
		username: "john.doe",
		books: [books[0]],
	},
	{
		id: 2,
		name: "Joe Doe",
		email: "Joe.doe@email.com",
		username: "joe.doe",
		books: [books[1]],
	},
];
