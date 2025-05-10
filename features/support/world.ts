import { setWorldConstructor, World } from "@cucumber/cucumber";

class CustomWorld extends World {
  currentPage: string = "";
  username?: string;
  password?: string;
  loggedIn: boolean = false;
  registeredUsers: Record<string, string> = {};
  registerResult?: string;
  validationErrorMessage?: string;
}

setWorldConstructor(CustomWorld);
export type { CustomWorld };
