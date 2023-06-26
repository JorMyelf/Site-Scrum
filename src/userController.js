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

async function deleteAllUsers() {
	const users = await prisma.user.deleteMany();
	console.log(users);
}

async function deleteAllPlans() {
	const plans = await prisma.plan.deleteMany();
	console.log(plans);
}

async function updateUser(email, password) {
	await prisma.user.update({
		where: { email },
		data: { password },
	});
	const user = await prisma.user.findUnique({
		where: { email },
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
	deleteAllUsers,
	deleteAllPlans,
	updateUser,
	deleteUser,
	getUserByEmail,
};
