// 1. if there is no body provided we should return an error.

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

describe("Update note API", () => {
  describe("No body provided validation error", () => {
    it("Status", (done) => {
      request
        .put(`${TESTING_URL}/api/notes`)
        .send("")
        .then(([_, response]) => {
          expect(response.statusCode).to.equal(400);
          done();
        });
    });
  });
});
