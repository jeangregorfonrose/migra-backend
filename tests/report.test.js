// Mock Firebase Admin BEFORE importing anything else
const mockVerifyIdToken = jest.fn();

jest.mock('../firebase/firebase', () => ({
    auth: () => ({
        verifyIdToken: mockVerifyIdToken,
    }),
}));

const request = require('supertest');
const app = require('../server');
require('./setup'); // Import setup to run beforeAll/afterAll hooks

describe('Report API', () => {
    const mockUser = { uid: 'test-user-uid', email: 'test@example.com' };
    const validToken = 'valid-token';

    beforeEach(() => {
        // Reset mocks
        mockVerifyIdToken.mockClear();
    });

    describe('POST /api/report', () => {
        it('should create a new report with valid data', async () => {
            mockVerifyIdToken.mockResolvedValue(mockUser);

            const reportData = {
                description: 'Test report',
                location: {
                    type: 'Point',
                    coordinates: [-73.935242, 40.73061],
                },
            };

            const res = await request(app)
                .post('/api/report')
                .set('Authorization', `Bearer ${validToken}`)
                .send(reportData);

            expect(res.statusCode).toEqual(201);
            expect(res.body.data.description).toEqual(reportData.description);
            expect(res.body.data.active).toBe(true); // Default value
        });

        it('should fail if validation fails (missing coordinates)', async () => {
            mockVerifyIdToken.mockResolvedValue(mockUser);

            const invalidData = {
                description: 'Test report',
                location: {
                    type: 'Point',
                    // Missing coordinates
                },
            };

            const res = await request(app)
                .post('/api/report')
                .set('Authorization', `Bearer ${validToken}`)
                .send(invalidData);

            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Validation error');
        });

        it('should reject extra fields (Mass Assignment Check)', async () => {
            mockVerifyIdToken.mockResolvedValue(mockUser);

            const reportData = {
                description: 'Test report',
                location: {
                    type: 'Point',
                    coordinates: [-73.935242, 40.73061],
                },
                active: false, // Should be forbidden
                timestamp: '2020-01-01', // Should be forbidden
            };

            const res = await request(app)
                .post('/api/report')
                .set('Authorization', `Bearer ${validToken}`)
                .send(reportData);

            // Our schema uses Joi.forbidden(), so it should be 400
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual('Validation error');
        });

        it('should return 401 if not authenticated', async () => {
            const reportData = {
                description: 'Test report',
                location: {
                    type: 'Point',
                    coordinates: [-73.935242, 40.73061],
                },
            };

            const res = await request(app)
                .post('/api/report')
                .send(reportData);

            expect(res.statusCode).toEqual(401);
        });
    });

    describe('GET /api/reports', () => {
        it('should return a list of reports', async () => {
            const res = await request(app).get('/api/reports');

            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });
});
