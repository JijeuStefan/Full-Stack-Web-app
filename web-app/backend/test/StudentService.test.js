require('dotenv').config({ path: './Service/.env' });

const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const StudentService = require('../Service/Students');  // Update the path as necessary

chai.use(chaiHttp);
chai.use(require('sinon-chai'));

const { expect } = chai;

describe('StudentService', () => {
    let app, dbMock;

    beforeEach(() => {
        app = express();
        app.use(bodyParser.json());

        dbMock = {
            query: sinon.stub()
        };

        StudentService(app, dbMock);
    });

    describe('GET /students', () => {
        it('should return all students when authenticated', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const students = [{ id: 1, name: 'John' }];
            dbMock.query.yields(null, students);

            chai.request(app)
                .get('/students')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal(students);
                    done();
                });
        });

        it('should return 401 if not authenticated', (done) => {
            chai.request(app)
                .get('/students')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });

    describe('GET /student/:id', () => {
        it('should return a student by id when authenticated', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const student = { id: 1, name: 'John' };
            dbMock.query.yields(null, [student]);

            chai.request(app)
                .get('/student/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal([student]);
                    done();
                });
        });

        it('should return 401 if not authenticated', (done) => {
            chai.request(app)
                .get('/student/1')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });

    describe('POST /student/add', () => {
        it('should add a student when data is valid and authenticated', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const newStudent = { name: 'John Doe', email: 'john@example.com', group: 800, id: 1 };
            dbMock.query.yields(null, { insertId: 1 });

            chai.request(app)
                .post('/student/add')
                .set('Authorization', `Bearer ${token}`)
                .send(newStudent)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('insertId', 1);
                    done();
                });
        });

        it('should return validation errors if data is invalid', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const invalidStudent = { name: 'Jo', email: 'invalid-email', group: 1000, id: 1 };

            chai.request(app)
                .post('/student/add')
                .set('Authorization', `Bearer ${token}`)
                .send(invalidStudent)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.errors).to.be.an('array').that.is.not.empty;
                    done();
                });
        });

        it('should return 401 if not authenticated', (done) => {
            chai.request(app)
                .post('/student/add')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });

    describe('PUT /student/update/:id', () => {
        it('should update a student when data is valid and authenticated', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const updatedStudent = { name: 'John Doe', email: 'john@example.com', group: 800 };
            dbMock.query.yields(null, { affectedRows: 1 });

            chai.request(app)
                .put('/student/update/1')
                .set('Authorization', `Bearer ${token}`)
                .send(updatedStudent)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('affectedRows', 1);
                    done();
                });
        });

        it('should return validation errors if data is invalid', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const invalidStudent = { name: 'Jo', email: 'invalid-email', group: 1000 };

            chai.request(app)
                .put('/student/update/1')
                .set('Authorization', `Bearer ${token}`)
                .send(invalidStudent)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.errors).to.be.an('array').that.is.not.empty;
                    done();
                });
        });

        it('should return 401 if not authenticated', (done) => {
            chai.request(app)
                .put('/student/update/1')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });

    describe('DELETE /student/delete/:id', () => {
        it('should delete a student by id when authenticated', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            dbMock.query.yields(null, { affectedRows: 1 });

            chai.request(app)
                .delete('/student/delete/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('affectedRows', 1);
                    done();
                });
        });

        it('should return 401 if not authenticated', (done) => {
            chai.request(app)
                .delete('/student/delete/1')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });
});
