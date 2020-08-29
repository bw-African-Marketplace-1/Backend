const db = require('../database/dbConfig.js');
const Users = require('../users/users-model.js');
const server = require('../Api/server.js');
const request = require('supertest');

describe('registration', () => {
    beforeAll(async() => {
        await db('users').truncate();
    })
    test("registers a new user to the server", async () => {
        await Users.add({email: "test",username: 'fady4', password: 'test'});
        const user = await db('users');
        expect(user).toHaveLength(1);
    });

    test ('returns status 201 if new user', async () => {
        const data = { name: "test", email: "test", username: "test", password: "test"};
        const res = await request(server).post('/api/auth/register').send(data);
        expect(res.status).toBe(201);
    })
})

describe("login", () => {
    beforeAll(async() => {
        await db('users').truncate();
    })
    test("return 401 if user does not exist, no seed data in database", async () => {
        const data = { username: "abc", password: "test"};
        const res = await request(server).post('/api/auth/login').send(data);
        expect(res.statusCode).toBe(401);
    });

    test("returns 400 is password is not given", async () => {
        const data = {username: "chicken", password: ""};
        const res = await request(server).post('/api/auth/login').send(data);
        expect(res.statusCode).toBe(400);
    })
})

