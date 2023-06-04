// performs a get request. API should return 200 with a success message

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
describe("Get all notes API", () => {
  describe("Returns success when api call successfull", () => {
    it("Status", (done) => {
      request.get(`${TESTING_URL}/api/notes`).then(([_, response]) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
