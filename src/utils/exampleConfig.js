import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createPlans() {
	const Bronze = await prisma.plan.create({
		data: {
			name: "Bronze",
			price: 90.34,
			description: "Bronze plan",
			duration: 30,
		},
	});
	console.log(Bronze);
	const Silver = await prisma.plan.create({
		data: {
			name: "Silver",
			price: 120.34,
			description: "Silver plan",
			duration: 30,
		},
	});
	console.log(Silver);
	const Gold = await prisma.plan.create({
		data: {
			name: "Gold",
			price: 150.34,
			description: "Gold plan",
			duration: 30,
		},
	});
	console.log(Gold);
}

async function showPlans() {
	const plans = await prisma.plan.findMany();
	console.log(plans);
}

async function createUsers() {
	const user = await prisma.user.create({
		data: {
			name: "Jordanna B",
			email: "jordannab@gmail.com",
			password: "123456",
			plan: {
				connect: {
					name: "Gold",
				},
			},
		},
	});
	console.log(user);
}

async function showUsers() {
	const users = await prisma.user.findMany();
	console.log(users);
}

// createUsers()
// 	.catch((e) => {
// 		console.error(e);
// 		process.exit(1);
// 	})
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 	});

// showPlans();

// showUsers()
// 	.catch((e) => {
// 		console.error(e);
// 		process.exit(1);
// 	})
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 	});
