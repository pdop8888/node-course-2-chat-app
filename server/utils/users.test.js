// users.test.js

const expect = require('expect');

const{Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('should add a user', () => {
       var users = new Users(); 
        const user = { 
            id: 23,
            name: 'mike',
            room: 'wd fans'
        };
        var resUser = users.addUser(user.id,user.name,user.room);
        expect(resUser).toEqual(user);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const id = '1';
        const user = users.removeUser(id);
        expect(user.id).toEqual(id);
        expect(users.users.length).toBe(2);
     });

     it('should NOT remove a user', () => {
        const id = '99';
        const user = users.removeUser(id);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
     });

     it('should get a user', () => {
        const id = '2';
        const user = users.getUser(id);
        expect(user.id).toBe(id);
     });

     it('should NOT get a user', () => {
        const id = '4';
        const user = users.getUser(id);
        expect(user).toBeFalsy();
     });

    it('should return node room name list', () => {
        const userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike','Julie']);
     });

     it('should return react room name list', () => {
        const userList = users.getUserList('React Course');
        expect(userList).toEqual(['Jen']);
     });
});