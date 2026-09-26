import * as Yup from "yup";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthConfig from './../../config/auth.js';

class SessionController {
	async store(request, response) {
		const schema = Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().min(6).required(),
		});

		const isValid = await schema.isValid(request.body, { strict: true });

		const emailOrPasswordIncorrect = () => {
			return response
				.status(400)
				.json({ error: "Email or password incorrect" });
		};

		if (!isValid) {
			emailOrPasswordIncorrect();
		}

		const { email, password } = request.body;
		// verificar se o usuário já está cadastrado
		const existingUser = await User.findOne({
			where: {
				email,
			},
		});

		if (!existingUser) {
			emailOrPasswordIncorrect();
		}

		const isPasswordCorrect = bcrypt.compare(
			password,
			existingUser.password_hash,
		);

		// verificar se a senha está correta
		if (!isPasswordCorrect) {
			emailOrPasswordIncorrect();
		}

		const token = jwt.sign({ id: existingUser.id },
			AuthConfig.secret,
			{
				expiresIn: AuthConfig.expiresIn,
			},
		);

		return response.status(200).json({
			id: existingUser.id,
			name: existingUser.name,
			email: existingUser.email,
			admin: existingUser.admin,
			token,
		});
	}
}

export default new SessionController();
