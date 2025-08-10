require("dotenv").config({
    path: "./.env.test",
});
process.env.NODE_ENV = "test";

const chai = require("chai");
const {chaiHttp} = require("chai-http");
const app = require("../app");
const User = require("../models/user");
let expect;

expect = chai.expect;

describe("Integration test for user", () => {
    before(async () => {
        await User.deleteMany();
    });
    it("Shoud register a new user", (done) => {
        chaiHttp.request(app)
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
});
