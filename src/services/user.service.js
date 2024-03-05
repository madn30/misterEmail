import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

const STORAGE_KEY = "user";

export const userService = {
  query,
  getUser,
};

_createAccount();

async function query() {
  const user = await storageService.query(STORAGE_KEY);
  return user;
}

function getUser() {
  let user = utilService.loadFromStorage(STORAGE_KEY);
  return { email: user.email, fullName: user.fullname };
}

function _createAccount() {
  let user = utilService.loadFromStorage(STORAGE_KEY);
  if (!user) {
    const loggedinUser = {
      email: "user@appsus.com",
      fullname: "Mahatma Appsus",
    };
    utilService.saveToStorage(STORAGE_KEY, loggedinUser);
  }
}
