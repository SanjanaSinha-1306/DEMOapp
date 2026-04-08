const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const COOKIE_NAME = "token";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: ONE_DAY_MS,
});

exports.postSignup = [

  // 🔎 VALIDATIONS

  check("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name should contain only letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Must contain at least one number"),
  async (req, res) => {
    const errors = validationResult(req);
    const { name, email, password } = req.body;

    // If validation fails
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errors.array()[0]?.msg || "Invalid signup data",
        errors: errors.array(),
      });
    }

    try {
      // Check if email already exists
      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(422).json({
          message: "Email already exists",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Save user
      await userModel.create(name, email, hashedPassword);
      return res.status(201).json({
        message: "Signup successful",
      });
    } catch (err) {
      return res.status(500).json({ message: "Server error" });
    }
  },
];

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie(COOKIE_NAME, token, getCookieOptions());

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
};

exports.me = (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({
      authenticated: true,
      user: {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      },
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
};

exports.verifySession = (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ authenticated: true });
  } catch (err) {
    return res.status(200).json({ authenticated: false });
  }
};
 