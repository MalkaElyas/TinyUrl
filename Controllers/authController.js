import User from "../Models/userModel.js";
import { generateToken } from "../Middlewares/jwt.js";


const authController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            // בדיקה אם קיים כבר יוזר עם אותו מייל
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "Email already in use" });
            }

            const user = await User.create({ name, email, password });

            const token = generateToken(user);
            res.status(200).json({ token , user: { _id: user._id, name: user.name, email: user.email }});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user)
                return res.status(404).json({ error: "User not found" });
            if (user.password !== password)
                return res.status(401).json({ error: "Invalid password" });
            const token = generateToken(user);
            res.status(200).json({ token ,user: { _id: user._id, name: user.name, email: user.email }});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default authController;