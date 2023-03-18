import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import MovieModel from "../db/models/index.js";

chai.use(chaiHttp);

const { expect } = chai;

describe("MyTop100Movies", () => {
    describe("POST /AddMovie", () => {
        it("should POST the movie if the name field is given", done => {
            chai.request(app).post("/AddMovie").send({ name : "Avengers : EndGame" })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.keys(["name", "release_date", "pg", "description", "rank", "_id", "__v"]); 
                done();
            })
        });

        afterEach(async () => {
            await MovieModel.findOneAndDelete({ name : "Avengers : EndGame" });
        })

        it("should not POST the movie if the name field is not given", done => {
            chai.request(app).post("/AddMovie").send({ pg : "12+" })
            .end((err, res) => {
                expect(res).to.have.status(500); 
                done();
            })
        });
    });

    describe("POST /RankMovie", () => {
        it("should RANK the movie if the name and rank field is given", done => {
            chai.request(app).post("/RankMovie").send({ name : "Clash of Titans", rank : 1 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        });
    });

    describe("GET /MyTop100Movies", () => {
        it("should GET My Top 100 Movies", done => {
            chai.request(app).get("/MyTop100Movies")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a("array");
                done();
            })
        });
    });

    describe("POST /RemoveMovie", () => {
        it("should REMOVE the movie if the name is given", done => {
            chai.request(app).post("/RemoveMovie").send({ name : "Pirates of the Carribean"})
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        });
    });
});