import { storageService } from "./async-storage.service.js";
import { userService } from "./user.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  remove,
  getById,
  getDefaultEmail,
  getDefaultFilter,
  countUnreadEmailsInFolder,
  getFilterFromParams,
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  console.log({ filterBy });
  const { email: userEmail } = userService.getUser();
  let emails = await storageService.query(STORAGE_KEY);

  if (!filterBy) return emails;

  const {
    search = "",
    folder,
    to,
    from,
    subject,
    has,
    hasnot,
  } = { ...filterBy };
  return emails.filter((email) => {
    if (
      search &&
      !(
        email.subject.toLowerCase().includes(search.toLowerCase()) ||
        email.body.toLowerCase().includes(search.toLowerCase()) ||
        email.to.toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;

    switch (folder) {
      case "inbox":
        return email.from !== userEmail;
      case "starred":
        return email.isStarred;
      case "sent":
        return email.from === userEmail;
      default:
    }

    if (to && email.to !== to) return false;
    if (from && email.from !== from) return false;
    if (subject && email.subject !== subject) return false;

    if (
      has &&
      !email.subject.toLowerCase().includes(has.toLowerCase()) &&
      !email.body.toLowerCase().includes(has.toLowerCase())
    )
      return false;
    if (
      hasnot &&
      (email.subject.toLowerCase().includes(hasnot.toLowerCase()) ||
        email.body.toLowerCase().includes(hasnot.toLowerCase()))
    )
      return false;

    return true;
  });
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    emailToSave.isOn = false;
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}
function countUnreadEmailsInFolder(folder) {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  const count = emails.filter(
    (email) => email?.folder?.includes(folder) && !email.isRead
  ).length;
  return count;
}

function getDefaultEmail() {
  const { email } = userService.getUser();

  return {
    id: "",
    subject: "",
    body: "",
    to: "",
    from: email,
    isRead: false,
    isStarred: false,
    sentAt: "",
    removedAt: "",
    sentAt: new Date(),
    folder: [],
  };
}
function getFilterFromParams(searchParams) {
  console.log(searchParams);
  const defaultFilter = getDefaultFilter();
  const filterBy = {};
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || defaultFilter[field];
  }

  return filterBy;
}

function getDefaultFilter({
  search = "",
  folder = "",
  to = "",
  from = "",
  subject = "",
  has = "",
  hasnot = "",
} = {}) {
  return {
    search,
    folder,
    to,
    from,
    subject,
    has,
    hasnot,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
