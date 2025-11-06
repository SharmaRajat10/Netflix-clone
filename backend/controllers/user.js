import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "invalid data",
                success: false,
            });
        }
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({
                message: "Invalid email or password",
                success: false,
            });
        }
        const isMatch = await bcrypt.compare(String(password), userExist.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }
        const tokenData = {
            id: userExist._id,
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1h' });
        // userExist.password = undefined;
        return res.status(200).cookie("token", token, { httpOnly: true }).json({
            message: `Welcome back ${userExist.fullname}`,
            user: {
                fullname: userExist.fullname,
                email: userExist.email
            },
            success: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }

}
// logout
export const Logout = async (req, res) => {
    return res.status(200).cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "Logout successfully",
        success: true,
    })
}



export const Register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        console.log("password:", password, "Type:", typeof password);
        if (!fullname || !email || !password || password.length < 6) {
            return res.status(401).json({
                message: "invalid data",
                success: false,
            });
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(401).json({
                message: "User already exist",
                success: false
            })
        }
        const hashPassword = await bcrypt.hash(String(password), 10);

        await User.create({
            fullname, email, password: hashPassword
        });


        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}