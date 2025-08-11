require("dotenv").config({
    path: "./.env.test",
});
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/user");
let expect, refreshToken;

chai.use(chaiHttp);
expect = chai.expect;

describe("Integration test for user", () => {
    before(async () => {
        await User.deleteMany();
    });
    it("Should register a new user", (done) => {
        chai.request(app)
            .post("/users/register")
            .send({
                name: "Clive Rosfield",
                email: "clive@rosfield.test",
                password: "1q2w3e4r",
                password_confirmation: "1q2w3e4r",
            })
            .end((error, response) => {
                expect(response).to.have.status(201);
                expect(response.body).to.have.property("accessToken");
                expect(response.body).to.have.property("refreshToken");
                done();
            });
    });
    it("Should login a user", (done) => {
        chai.request(app)
            .post("/users/login")
            .send({
                email: "clive@rosfield.test",
                password: "1q2w3e4r",
            })
            .end((error, response) => {
                refreshToken = response.body.refreshToken;
                expect(response).to.have.status(200);
                expect(response.body).to.have.property("accessToken");
                expect(response.body).to.have.property("refreshToken");
                done();
            });
    });
    it("Should refresh a token", (done) => {
        chai.request(app)
            .post("/users/refresh-token")
            .send({
                refreshToken: refreshToken,
            })
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.property("accessToken");
                expect(response.body).to.have.property("refreshToken");
                done();
            });
    });
});
