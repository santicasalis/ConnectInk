const login = require("../../controllers/loginController/login");
const crypto = require("crypto");

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).send("Missing data");
    } else {
      const user = await login(email, password);
      if (!user) return res.status(404).send("User not found");

      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      if (user.password === hashedPassword) {
        const userInfo = {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          phone: user.phone,
          address: user.address,
          location: user.location,
          shopName: user.shopName,
        };

        return res.status(200).json({ access: true, user: userInfo });
      } else {
        res.status(403).send("Incorrect password");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = loginHandler;
