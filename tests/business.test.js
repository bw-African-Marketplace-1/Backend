const db = require('../database/dbConfig.js');
const server = require('../Api/server.js');
const request = require('supertest');

describe('Business Router', () => {
    // beforeAll(async() => {
    //     await db('users').truncate()
    //     await db('business').truncate();
    // });
    test("returns 500 if no session is found", async () => {
        await db('users').truncate();
        const res = await request(server).get('/api/business');
        expect(res.status).toBe(500);
    })

    test('returns a json object', async () => {
        const newUser = { name: 'test', email: 'test', username: 'fady', password: 'gouda' };
        await db('users').truncate()
		await request(server).post('/api/auth/register').send(newUser)
			.then(async () => {
				await request(server)
					.post('/api/auth/login')
					.send(newUser)
					.then(async (res) => {
                        console.log(res.body)
						const token = res.body.token;
                        console.log(token)
						await request(server).get('/api/business').set('Authorization', token);
							expect(res.type).toBe('application/json');
					});
			});
    });
    
    test('post request', async () => {
        const newUser = { name: 'test1', email: 'test1', username: 'fady1', password: 'gouda1' };
        const newBusiness = {name: 'Gouda industries', description: 'Well builder', location: 'Egypt', user_id: '1'};
        await db('users').truncate()
        await db('business').truncate()
        await request(server).post('/api/auth/register').send(newUser)
			.then(async () => {
				await request(server)
					.post('/api/auth/login')
					.send(newUser)
					.then(async (res) => {
                        console.log(res.body)
						const token = res.body.token;
                        console.log(token)
                        await request(server).post('/api/business').set('Authorization', token).send(newBusiness);
                        expect(res.status).toBe(200);
					});
			});
    });

    test('put request', async () => {
        const newUser = { name: 'test1', email: 'test1', username: 'fady1', password: 'gouda1' };
        const newBusiness = {name: 'Gouda industries', description: 'Well builder', location: 'Egypt', user_id: '1'};
        const editBusiness = {name: 'Gouda ', description: 'Pottery', location: 'Egypt', user_id: '1'};
        await db('users').truncate()
        await db('business').truncate()
        await request(server).post('/api/auth/register').send(newUser)
			.then(async () => {
				await request(server)
					.post('/api/auth/login')
					.send(newUser)
					.then(async (res) => {
                        console.log(res.body)
						const token = res.body.token;
                        console.log(token)
                        await request(server).post('/api/business').set('Authorization', token).send(newBusiness)
                        .then(async () => {
                            await request(server).put('/api/business/1').send(editBusiness)
                            expect(res.status).toBe(200);
                        })
					});
			});
    });
    test('Delete a business', async () => {
        const newUser = { name: 'test1', email: 'test1', username: 'fady1', password: 'gouda1' };
        const newBusiness = {name: 'Gouda industries', description: 'Well builder', location: 'Egypt', user_id: '1'};
        await db('users').truncate()
        await db('business').truncate()
        await request(server).post('/api/auth/register').send(newUser)
			.then(async () => {
				await request(server)
				.post('/api/auth/login')
				.send(newUser)
				.then(async (res) => {
                    console.log(res.body)
				    const token = res.body.token;
                    console.log(token)
                    await request(server).post('/api/business').set('Authorization', token).send(newBusiness)
                    .then(async () => {
                        await request(server).delete('/api/business/1')
                        expect(res.status).toBe(200);
                    })
                })
            });
        });
    })