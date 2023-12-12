const login = require("../../controllers/loginController/login");
const crypto = require("crypto");

const loginHandler = async (req, res) => {
  const { tokenId } = req.body;
  try {
    const user = await login(tokenId);
    if (!user.hasOwnProperty("id")) return res.status(404).send("User not found");

    return res.status(200).json(user);

    // const hashedPassword = crypto
    //   .createHash("sha256")
    //   .update(password)
    //   .digest("hex");
    // if (user.password === hashedPassword) {
    //   const userInfo = {
    //     id: user.id,
    //     name: user.name,
    //     lastName: user.lastName,
    //     email: user.email,
    //     password: user.password,
    //     phone: user.phone,
    //     address: user.address,
    //     location: user.location,
    //     shopName: user.shopName,
    //   };

    //   return res.status(200).json({ access: true, user: userInfo });
    // } else {
    //   res.status(403).send("Incorrect password");
    // }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

module.exports = loginHandler;
