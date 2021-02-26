const UserService = require('./userService');

class AuthService {
    login(userData) {
        const user = UserService.search(userData);
        if(!user) {
            throw Error('User not found');
        }
        user.role = (user.email == 'admin') ? 'admin' : 'user';
        console.log(user);
        return user;
    }
}

module.exports = new AuthService();