const STORAGE_KEY = "emails";

_createAccount();

async function query() {
  const user = await storageService.query(STORAGE_KEY);
  return user;
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
