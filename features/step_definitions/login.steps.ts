import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { CustomWorld } from '../support/world';

Given('the user is on the login page', function (this: CustomWorld) {
  this.currentPage = 'login';
});

When('the user enters valid credentials', function (this: CustomWorld) {
  if (this.currentPage !== 'login') throw new Error('Not on login page');
  this.username = 'validUser';
  this.password = 'validPass';
});

When('clicks the login button', function (this: CustomWorld) {
  if (this.username === 'validUser' && this.password === 'validPass') {
    this.loggedIn = true;
    this.currentPage = 'dashboard';
  }
});

Then('the user should see the dashboard', function (this: CustomWorld) {
  assert.strictEqual(this.loggedIn, true);
  assert.strictEqual(this.currentPage, 'dashboard');
});
