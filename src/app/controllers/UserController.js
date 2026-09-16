import User from "../models/User.js";

/**
 * store
 * index -> lista todos os dados
 * show -> listar um dado
 * update ->
 * delete
 */
class UserController {
    async store(request, response) {
        
        const {name, email, password_hash, admin } = request.body
        const user = await User.create ({
            id: v4(),
            name,
            email,
            admin,
        });

        return response.status(201).json(user);
    }
}

export default new UserController();