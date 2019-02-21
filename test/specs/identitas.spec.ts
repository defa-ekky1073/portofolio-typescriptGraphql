import * as chai from 'chai';
import config from './config';

const expect = chai.expect;
const url = `http://localhost:${config.APP_PORT}/`;
const request = require('supertest')(url);

describe('Identity', () => {
    // Test
});