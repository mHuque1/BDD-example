import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import { CustomWorld } from "../support/world";

Given("the user is on the registration page", function (this: CustomWorld) {
  this.currentPage = "register";
});

When(
  "the user registers with username {string} and password {string}",
  function (this: CustomWorld, username: string, password: string) {
    // Validation
    if (!username) {
      this.validationErrorMessage = "Username is required";
      return;
    }
    if (!password) {
      this.validationErrorMessage = "Password is required";
      return;
    }
    if (username.length < 3) {
      this.validationErrorMessage = "Username must be at least 3 characters";
      return;
    }

    // Registration logic
    if (this.registeredUsers[username]) {
      this.registerResult = "Username already taken";
    } else {
      this.registeredUsers[username] = password;
      this.registerResult = "Success";
    }
  }
);

Then("the user should see a success message", function (this: CustomWorld) {
  assert.strictEqual(this.registerResult, "Success");
});



Then(
  "the user should see a validation error {string}",
  function (this: CustomWorld, message: string) {
    assert.strictEqual(this.validationErrorMessage, message);
  }
);
