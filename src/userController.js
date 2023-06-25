import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createUser(name, email, password, plan) {
	const user = await prisma.user.create({
		data: {
			name,
			email,
			password,
			plan: {
				connect: {
					name: plan,
				},
			},
		},
	});
	return user;
}

async function showUsers() {
	const users = await prisma.user.findMany();
	console.log(users);
}

async function showPlans() {
	const plans = await prisma.plan.findMany();
	console.log(plans);
}

async function DeleteAllUsers() {
	const users = await prisma.user.deleteMany();
	console.log(users);
}

async function updateUser(email, name, plan, newEmail, password) {
	const user = await prisma.user.update({
		where: { email },
		data: {
			name,
			email: (email = newEmail ? newEmail : email),
			password,
			plan: {
				connect: {
					name: plan,
				},
			},
		},
	});
	return user;
}

async function deleteUser(email) {
	const user = await prisma.user.delete({
		where: { email },
	});
	return user;
}

async function getUserByEmail(email) {
	const user = await prisma.user.findUnique({
		where: { email },
	});
	return user;
}

export {
	createUser,
	showUsers,
	showPlans,
	DeleteAllUsers,
	updateUser,
	deleteUser,
	getUserByEmail,
};
