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

describe("Integration test for categories", () => {
    it("Should list all categories", (done) => {
        chai.request(app)
            .get("/categories")
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.be.an("array");
                done();
            });
    })
});
