import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const result = await prisma.user.findMany();
    // const create = await prisma.user.create({
    //     data:{
    //         username: 'admin',
    //         password: 'admin',
    //     },
    // })
    // const update = await prisma.user.update({
    //     where:{
    //         username: 'admin',
    //     },
    //     data:{
    //         password: 'root',
    //     },
    // });
    console.log(result);
}

main().catch(e=>{
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
})