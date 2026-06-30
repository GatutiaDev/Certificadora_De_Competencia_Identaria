import { prisma } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function postCadastro(dados) {

    const { name, email, password } = dados;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error("Usuário já existe.");
    }

    const senhaHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
        name,
        email,
        password: senhaHash,
        },
    });
  return user;
}

export async function postLogin(dados) {

    const { email, password } = dados;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    const senhaValida = await bcrypt.compare(password, user.password);

    if (!senhaValida) {
        throw new Error("Senha incorreta.");
    }

    const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

    return token;
}