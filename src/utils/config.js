import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createPlans() {
	const Bronze = await prisma.plan.create({
		data: {
			name: "Bronze",
			description:
				"Acesso ao site e uma mentoria focada para sua empresa",
			price: 550,
			duration: 0,
		},
	});
	const Prata = await prisma.plan.create({
		data: {
			name: "Prata",
			description:
				"Pacote Bronze + 6 meses de mentorias (até três por mês)",
			price: 2250,
			duration: 6,
		},
	});
	const Ouro = await prisma.plan.create({
		data: {
			name: "Ouro",
			description: "Pacote Prata + 1 ano de mentoria sem limites",
			price: 4850,
			duration: 12,
		},
	});

	console.log("Planos registrados com sucesso:", { Bronze, Prata, Ouro });
}
createPlans()
	.then(() => prisma.$disconnect())
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
