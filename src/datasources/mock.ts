import { User } from "../types/generated";

export let books = [
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

export let users: User[] = [
	{
		id: "1",
		email: "jon.snow@email.com",
		username: "ghost_gang",
		profile: {
			firstName: "Jon",
			lastName: "Snow",
			id: "1",
			age: 20,
			occupation: "Student",
			about: "I know nothing",
			education: [
				{
					id: "1",
					school: "University of Winterfell",
					degreeLevel: "Bachelors",
					fieldOfStudy: "Computer Science",
					startDate: new Date("11/01/1273").toDateString(),
					endDate: new Date("11/01/1277").toDateString(),
				},
			],
			employment: [
				{
					id: "1",
					company: "Night's Watch",
					position: "Lord Commander",
					description: "Protected the realm from the dead and wildlings",
					startDate: new Date("11/01/1273").toDateString(),
					endDate: "Until death",
				},
				{
					id: "2",
					company: "King in the North",
					position: "King",
					description: "King in the North",
					startDate: new Date("11/01/1273").toDateString(),
					endDate: new Date("5/01/1274").toDateString(),
				},
			],
			projects: [
				{
					id: "1",
					name: "New sword",
					description: "I need a new sword",
					startDate: new Date("11/01/1273").toDateString(),
					endDate: new Date("11/01/1273").toDateString(),
				},
			],
		},
	},
	{
		id: "2",
		email: "Joe.doe@email.com",
		username: "joe.doe",
	},
	{
		id: "35301702",
		email: "nolangelinas@gmail.com",
		username: "nrgbistro",
		profile: {
			id: "2",
			firstName: "Nolan",
			lastName: "Gelinas",
			education: [
				{
					id: "2",
					school: "University of California, Berkeley",
					degreeLevel: "Bachelors",
					fieldOfStudy: "Computer Science",
					startDate: new Date("11/01/2017").toDateString(),
					endDate: new Date("11/01/2021").toDateString(),
				},
			],
		},
	},
];
