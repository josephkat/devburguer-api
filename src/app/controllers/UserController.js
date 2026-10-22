import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from "../models/User.js";
import bcrypt from 'bcrypt';

/**
 * store
 * index -> lista todos os dados
 * show -> listar um dado
 * update ->
 * delete
 */
class UserController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false, strict: true });
        } catch (error) {
            return response.status(400).json({ error: error.errors });
        }

        const { name, email, password, admin } = request.body
        // verificar se o usuário já está cadastrado
        const existingUser = await User.findOne({
            where: {
                email
            }
        });

        if (existingUser) {
            return response.status(400).json({ message: "Email always taken" });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin,
        });

        return response.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
        });
    }

    async index(_request, response) {
        const users = await User.findAll();
        return response.status(200).json(users);
    }
}

export default new UserController();