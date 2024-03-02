import { storageService } from "./async-storage.service";
import { utilService } from "./util.service";

const STORAGE_KEY = "user";

export const userService = {
  query,
  getFirstLetterAccount,
};

_createAccount();

async function query() {
  const user = await storageService.query(STORAGE_KEY);
  return user;
}
async function getFirstLetterAccount() {

  
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
