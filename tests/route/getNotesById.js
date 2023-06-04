// if a request is successfull returns a success message

import chai from "chai";
import request from "es6-request";
import { TESTING_URL } from "../../constants/tests.js";
const { expect } = chai;
const payload = {
  title: "test",
  email: "test",
  description: "test",
  noteId: "test",
};
describe("Get all users by API", () => {
  describe("Returns all users api call successful", () => {
    it("Status", (done) => {
      request.get(`${TESTING_URL}/api/user`).then(([_, response]) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe("Returns notes by ID when api call successful", () => {
    it("Status", (done) => {
      request
        .get(`${TESTING_URL}/api/notesbyuserid`)
        .query({
          email: "tom@mail.com",
          noteId: "16854508013",
        })
        .then(([_, response]) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });
});
