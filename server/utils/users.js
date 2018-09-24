[{
    // id
    // name
    // room
}];

// addUser(id,name,room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// Use ES6 class syntax...for fun

class Users {
    constructor () {
        this.users = [];
    }

    addUser(id,name,room) {
        const newUser = {id,name,room};
        this.users.push(newUser);
        return newUser;
    }

    removeUser(id) {
        // return user that was remove
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id != id);
        }
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        const namesArray = users.map((user) => user.name);
        return namesArray;
    }
};

module.exports = {Users};