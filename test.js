const axios = require('axios');

const API_URL = 'https://restful-booker.herokuapp.com';

describe('RESTful-Booker API Tests', () => {

    test('should fetch all bookings', async () => {
        const response = await axios.get(`${API_URL}/booking`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    test('should fetch specific booking by ID', async () => {
        const bookingId = 85;
        const response = await axios.get(`${API_URL}/booking/${bookingId}`);
        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('object');
    });

    test('should create a new booking', async () => {
        const bookingData = {
            firstname: "Jim",
            lastname: "Brown",
            totalprice: 111,
            depositpaid: true,
            bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01"
            },
            additionalneeds: "Breakfast"
        };

        const response = await axios.post(`${API_URL}/booking`, bookingData);
        expect(response.status).toBe(200);
        expect(typeof response.data.bookingid).toBe('number');
    });

    test('should update a booking', async () => {
        const bookingId = 85;
        const updatedData = {
            firstname: "James",
            lastname: "Brown",
            totalprice: 112,
            depositpaid: false
        };

        const response = await axios.put(`${API_URL}/booking/${bookingId}`, updatedData);
        expect(response.status).toBe(200);
        expect(response.data.firstname).toBe("James");
    });

    test('should delete a booking', async () => {
        const bookingId = 85;

        const response = await axios.delete(`${API_URL}/booking/${bookingId}`);
        expect(response.status).toBe(201);
    });
});
