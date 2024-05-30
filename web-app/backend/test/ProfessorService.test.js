require('dotenv').config({ path: './Service/.env' });

const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const ProfessorService = require('../Service/Professor');  // Adjust the path as necessary

chai.use(chaiHttp);
chai.use(require('sinon-chai'));

const { expect } = chai;

describe('ProfessorService', () => {
    let app, dbMock;

    beforeEach(() => {
        app = express();
        app.use(bodyParser.json());

        dbMock = {
            query: sinon.stub()
        };

        ProfessorService(app, dbMock);
    });

    describe('GET /professors', () => {
        it('should return all professors when authenticated', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const professors = [{ id: 1, name: 'John Doe', course: 'Math' }];
            dbMock.query.yields(null, professors);

            chai.request(app)
                .get('/professors')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal(professors);
                    done();
                });
        });

        it('should return 401 if not authenticated', (done) => {
            chai.request(app)
                .get('/professors')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });

    describe('GET /professor/:id', () => {
        it('should return a professor by id when authenticated', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const professor = { id: 1, name: 'John Doe', course: 'Math' };
            dbMock.query.yields(null, [professor]);

            chai.request(app)
                .get('/professor/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal([professor]);
                    done();
                });
        });

        it('should return 401 if not authenticated', (done) => {
            chai.request(app)
                .get('/professor/1')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });

    describe('POST /professor/add', () => {
        it('should add a professor when data is valid and authenticated', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const newProfessor = { name: 'John Doe', course: 'Math' };
            dbMock.query.yields(null, { insertId: 1 });

            chai.request(app)
                .post('/professor/add')
                .set('Authorization', `Bearer ${token}`)
                .send(newProfessor)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('insertId', 1);
                    done();
                });
        });

        it('should return validation errors if data is invalid', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const invalidProfessor = { name: 'Jo', course: 'Ma' };

            chai.request(app)
                .post('/professor/add')
                .set('Authorization', `Bearer ${token}`)
                .send(invalidProfessor)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.errors).to.be.an('array').that.is.not.empty;
                    done();
                });
        });

        it('should return 401 if not authenticated', (done) => {
            chai.request(app)
                .post('/professor/add')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });

    describe('PUT /professor/update/:id', () => {
        it('should update a professor when data is valid and authenticated', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const updatedProfessor = { name: 'John Doe', course: 'Math' };
            dbMock.query.yields(null, { affectedRows: 1 });

            chai.request(app)
                .put('/professor/update/1')
                .set('Authorization', `Bearer ${token}`)
                .send(updatedProfessor)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('affectedRows', 1);
                    done();
                });
        });

        it('should return validation errors if data is invalid', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            const invalidProfessor = { name: 'Jo', course: 'Ma' };

            chai.request(app)
                .put('/professor/update/1')
                .set('Authorization', `Bearer ${token}`)
                .send(invalidProfessor)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.errors).to.be.an('array').that.is.not.empty;
                    done();
                });
        });

        it('should return 401 if not authenticated', (done) => {
            chai.request(app)
                .put('/professor/update/1')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });

    describe('DELETE /professor/delete/:id', () => {
        it('should delete a professor by id when authenticated', (done) => {
            const token = jwt.sign({ user: 'test' }, process.env.ACCESS_TOKEN_SECRET);
            dbMock.query.yields(null, { affectedRows: 1 });

            chai.request(app)
                .delete('/professor/delete/1')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('affectedRows', 1);
                    done();
                });
        });

        it('should return 401 if not authenticated', (done) => {
            chai.request(app)
                .delete('/professor/delete/1')
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });
});
