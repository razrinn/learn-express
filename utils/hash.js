const bcrypt = require("bcrypt");

const generatePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const checkPassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword)
}

module.exports.generatePassword = generatePassword;
module.exports.checkPassword = checkPassword;
