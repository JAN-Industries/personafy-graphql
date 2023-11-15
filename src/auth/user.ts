export const getUser = async (token) => {
	if (token)
		return {
			id: 1,
			name: "John Doe",
			email: "",
		};
	else {
		return null;
	}
};
