import request from 'supertest';
import app from '../app';
import timeSheets from '../models/Time-sheets';
import timeSheetSeed from '../seed/time-sheets';

let timesheetId;

beforeAll(async () => {
  await timeSheets.collection.insertMany(timeSheetSeed);
});

// Test for GET method by Fer
describe('GET /api/time-sheets', () => {
  test('Response should return a 200 status', async () => {
    const response = await request(app).get('/api/time-sheets').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Time-Sheets');
    expect(response.body.data).toEqual(expect.any(Object));
    expect(response.body.error).toBeFalsy();
  });
  test('Wrong path', async () => {
    const response = await request(app).get('/api/time/sheets').send();
    expect(response.status).toBe(404);
  });
  test('Wrong path', async () => {
    const response = await request(app).get('/api/timesheets').send();
    expect(response.status).toBe(404);
  });
  test('Wrong path', async () => {
    const response = await request(app).get('/api').send();
    expect(response.status).toBe(404);
  });
});

// Test for CREATE method by Fer
describe('POST /api/time-sheets', () => {
  test('New time-sheet created', async () => {
    const response = await request(app).post('/api/time-sheets').send({
      projectId: '6289c467fc13ae72d60000c9',
      Task: [
        {
          taskId: '6289c467fc13ae72d60000cb',
        },
      ],
      approved: true,
    });
    expect(response.status).toBe(201);
    expect(response.body.msg).toBe('Timesheet created');
    expect(response.body.data).toEqual(expect.any(Object));
    expect(response.body.error).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    timesheetId = response.body.data._id;
  });
  test('Should fill all required fields', async () => {
    const response = await request(app).post('/api/time-sheets').send({
      projectId: '6289c467fc13ae72d60000c9',
      Task: [
        {
          taskId: '6289c467fc13ae72d60000cb',
        },
      ],
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('There was an error during the validation of the request');
    expect(response.body.error.length).toBeGreaterThan(3);
  });
  test('Must not pass projectId validation', async () => {
    const response = await request(app).post('/api/time-sheets').send({
      projectId: '6289c467fc13ae72d',
      Task: [
        {
          taskId: '6289c467fc13ae72d60000cb',
        },
      ],
      approved: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('There was an error during the validation of the request');
    expect(response.body.error.length).toBeGreaterThan(3);
  });
  test('Must not pass taskId validation', async () => {
    const response = await request(app).post('/api/time-sheets').send({
      projectId: '6289c467fc13ae72d60000c9',
      Task: [
        {
          taskId: '6289c467fc13ae7',
        },
      ],
      approved: true,
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('There was an error during the validation of the request');
    expect(response.body.error.length).toBeGreaterThan(3);
  });
});

// Test for DELETE method by Fer
describe('DELETE /api/time-sheets', () => {
  test('Should delete a timesheet', async () => {
    // eslint-disable-next-line no-undef
    const response = await request(app).delete(`/api/time-sheets/${timesheetId}`).send();
    expect(response.status).toEqual(200);
    expect(response.body.msg).toBe(`The ${timesheetId} timesheet has been susccesfully deleted`);
  });
  test('Should not delete a project ', async () => {
    const response = await request(app).delete('/api/time-sheets/6280062d5f0b9b4131e527e4').send();
    expect(response.status).toEqual(404);
    expect(response.body.msg).toBe('There is no timesheet with this Id 6280062d5f0b9b4131e527e4');
    expect(response.body.error).toBeTruthy();
  });
});
