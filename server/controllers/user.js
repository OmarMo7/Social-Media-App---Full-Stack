import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ messege: "This user does not exist!" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ messege: "Invalid Credentials" });

    const token = jwt.sign({
      email: existingUser.email,
      id: existingUser._id
    }, 'testing token', { expiresIn: '1h' });

    res.status(200).json({ result: existingUser, token, messege: "Sign in successfully" });

  } catch (error) {
    res.status(500).json({ messege: "Something wrong happened!" });
    console.log(error);
  }
};



export const signup = async (req, res) => {
  console.log('req: ' + req.body);
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(403).json({ messege: "This email address already exists!" });

    if (password !== confirmPassword) return res.status(403).json({ messege: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name: `${firstName} ${lastName}`, email, password: hashedPassword });

    const token = jwt.sign({
      email: newUser.email,
      id: newUser._id
    }, 'testing token', { expiresIn: '1h' });

    res.status(200).json({ result: newUser, token, messege: "User has been saved successfully" });

  } catch (error) {
    res.status(500).json({ messege: "Something wrong happened!" });
    console.log(error);
  }
};
