require("dotenv").config({
    path: "./.env.test",
});
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/user");
const Expense = require("../models/expense");
const Category = require("../models/category");
const userController = require("../controllers/userController");
let expect, user, accessToken, category;

chai.use(chaiHttp);
expect = chai.expect;

describe("Integration test for expenses", () => {
    before(async () => {
        await Expense.deleteMany();
        await User.deleteMany();
        user = await User.create([{
            name: "Jill Warrick",
            email: "jill@warrick.test",
            password: "1q2w3e4r",
        }], {
            new: true,
        });
        accessToken = userController.generateToken(user[0]._id);
        category = await Category.findOne({}, null, {
            new: true,
        });
    });
    it("Should create a new expense", (done) => {
        chai.request(app)
            .post("/expenses")
            .set("Authorization", "Bearer " + accessToken)
            .send({
                category_id: category._id,
                amount: 128,
                description: "Test expense",
                date: "2025-08-11",
            })
            .end((error, response) => {
                expect(response).to.have.status(201);
                expect(response.body).to.have.property("amount");
                expect(response.body).to.have.property("description");
                expect(response.body).to.have.property("date");
                expect(response.body).to.have.property("category");
                done();
            });
    })
})
