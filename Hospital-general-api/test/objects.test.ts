import supertest from "supertest";
import {app} from "../src/app";

describe('objects', () => {
    describe('get object by responsble', () => {
        describe('given a responsable', () => {
            it('should respond with an array of objects', async () => {
                const responsable = 'Edgar';
                await supertest(app).get(`/api/objects/responsable/${responsable}`).expect(200).timeout(10000);
            });
            describe
        });
    });
});