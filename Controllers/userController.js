import User from "../Models/userModel.js";

const UserController = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate("links");
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // getAllUserLinks: async (req, res) => {
    //     try {
    //         const UserLinks = await User.findById(req.params.userId).populate("links");
    //         res.status(200).json(UserLinks.links);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },

    //הוספת משתמש היא רק ע"י רישום 
    // postUser: async (req, res) => {
    //     try {
    //         const { name, email, password } = req.body;

    //         // בדיקה אם קיים כבר יוזר עם אותו מייל
    //         const existingUser = await User.findOne({ email });
    //         if (existingUser) {
    //             return res.status(409).json({ message: "Email already in use" });
    //         }

    //         const user = await User.create({ name, email, password });
    //         res.status(201).json(user);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
    putUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const { name: userName, email: userEmail, password: userPassword } = await User.findById(req.params.id);

            // בדיקה אם קיים כבר יוזר עם אותו מייל
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== req.params.id) {
                return res.status(409).json({ message: "Email already in use" });
            }
            const user = await User.findByIdAndUpdate(req.params.id,
                {
                    name: name ? name : userName,
                    email: email ? email : userEmail,
                    password: password ? password : userPassword
                },
                { new: true }
            );
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
export default UserController;
