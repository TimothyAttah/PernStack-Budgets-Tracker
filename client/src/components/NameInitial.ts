type UserStore = any;
export const auth: UserStore = localStorage.getItem('user');

export const user = auth && JSON.parse(auth);
console.log('user', user);

export const fullName = `${user?.first_name} ${user?.last_name}`; 

export const nameToInitials = (name: any) => {
	const namesArray = fullName.trim().split(' ');
	if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
	else
		return `${namesArray[0].charAt(0)}${namesArray[
			namesArray.length - 1
		].charAt(0)}`;
};
