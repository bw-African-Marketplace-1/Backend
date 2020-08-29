const db = require('../database/dbConfig.js');
const server = require('../Api/server.js');
const request = require('supertest');

describe('For-Sale Router', () => {
    beforeAll(async() => {
        await db('users').truncate()
        await db('business').truncate();
        await db('for-sale').truncate();
    });
    test("returns 500 if no session is found", async () => {
        await db('users').truncate();
        const res = await request(server).get('/api/forsale');
        expect(res.status).toBe(500);
    })

    test('returns a json object', async () => {
        const newUser = { name: 'test', email: 'test', username: 'fady', password: 'gouda' };
        await db('users').truncate()
        await db('for-sale').truncate();
		await request(server).post('/api/auth/register').send(newUser)
			.then(async () => {
				await request(server)
					.post('/api/auth/login')
					.send(newUser)
					.then(async (res) => {
                        console.log(res.body)
						const token = res.body.token;
                        console.log(token)
						await request(server).get('/api/forsale').set('Authorization', token);
							expect(res.type).toBe('application/json');
					});
			});
    });
    
    test('post request', async () => {
        const newUser = { name: 'test1', email: 'test1', username: 'fady1', password: 'gouda1' };
        const newitem = {name: 'Wells made of bricks', category: 'Resources', price: '$200.00', location: 'Alexandria, Egypt', description: 'Wells made of bricks whill last up to 50 years!', business_id: 1};
        await db('users').truncate()
        await db('for-sale').truncate()
        await request(server).post('/api/auth/register').send(newUser)
			.then(async () => {
				await request(server)
					.post('/api/auth/login')
					.send(newUser)
					.then(async (res) => {
                        console.log(res.body)
						const token = res.body.token;
                        console.log(token)
                        await request(server).post('/api/forsale').set('Authorization', token).send(newitem);
                        expect(res.status).toBe(200);
					});
			});
    });

    test('put request', async () => {
        const newUser = { name: 'test1', email: 'test1', username: 'fady1', password: 'gouda1' };
        const newitem = {name: 'Wells made of bricks', category: 'Resources', price: '$200.00', location: 'Alexandria, Egypt', description: 'Wells made of bricks whill last up to 50 years!', business_id: 1};
        const edititem = {name: 'Pots and pans', category: 'cooking', price: '$200.00', location: 'Alexandria, Egypt', description: 'Wells made of bricks whill last up to 50 years!', business_id: 1};
        await db('users').truncate()
        await db('for-sale').truncate()
        await request(server).post('/api/auth/register').send(newUser)
			.then(async () => {
				await request(server)
					.post('/api/auth/login')
					.send(newUser)
					.then(async (res) => {
                        console.log(res.body)
						const token = res.body.token;
                        console.log(token)
                        await request(server).post('/api/forsale').set('Authorization', token).send(newitem)
                        .then(async () => {
                            await request(server).put('/api/forsale/1').send(edititem)
                            expect(res.status).toBe(200);
                        })
					});
			});
    });
    test('Delete a business', async () => {
        const newUser = { name: 'test1', email: 'test1', username: 'fady1', password: 'gouda1' };
        const newitem = {name: 'Wells made of bricks', category: 'Resources', price: '$200.00', location: 'Alexandria, Egypt', description: 'Wells made of bricks whill last up to 50 years!', business_id: 1};
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
                    await request(server).post('/api/for-sale').set('Authorization', token).send(newitem)
                    .then(async () => {
                        await request(server).delete('/api/for-sale/1')
                        expect(res.status).toBe(200);
                    })
                })
            });
        });
    })