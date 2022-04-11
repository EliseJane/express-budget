const queries = require('./queries');

const login = async (email, password) => {
    const user = await queries.getUserByEmail(email);
    if (user.password === password) {
        return user.name;
    } else {
        return "incorrect password";
    }
}

module.exports = {
    login
}