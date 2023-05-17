// 1. if there is no body provided we should return an error.

// 2. if a body is provided API should return 200 with a success message

const expect = require("chai").expect;
const request = require("request");
const { TESTING_URL } = require("../../constants/tests");
const payload = {
  title: "test",
  link: "test",
  description: "test",
  image: "test",
};
describe("Create Pokemon API", () => {
  describe("No body provided validation error", () => {
    it("Status", (done) => {
      request.post(
        `${TESTING_URL}/api/pokemon`,
        {
          json: {},
        },
        (_, response) => {
          expect(response.statusCode).to.equal(400);
          done();
        }
      );
    });
  });
  describe("Successfull create request", () => {
    it("Status", (done) => {
      request.post(
        `${TESTING_URL}/api/pokemon`,
        {
          json: payload,
        },
        (_, response) => {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });
  describe("Delete a pokemon", () => {
    it("Delete a pokemon from database", (done) => {
      request.delete(
        `${TESTING_URL}/api/pokemon`,
        { json: payload },
        (error, response, body) => {
          expect(body.message).to.contain("Successfully removed");
          done();
        }
      );
    });
  });
});
