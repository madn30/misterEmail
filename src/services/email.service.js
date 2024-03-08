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
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  const { email } = userService.getUser();
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    const { search = "", status, folder } = filterBy;

    if (search) {
      emails = emails.filter(
        (email) =>
          email.subject.toLowerCase().includes(search.toLowerCase()) ||
          email.body.toLowerCase().includes(search.toLowerCase()) ||
          email.to.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status && status !== "all") {
      const isRead = status === "read";
      emails = emails.filter((email) => email.isRead === isRead);
    }
    if (folder) {
      switch (folder) {
        case "starred":
          emails = emails.filter((email) => email.isStarred);
        case "inbox":
          return emails.filter((e) => e.from !== email);
        case "sent":
          emails = emails.filter((e) => e.from === email);
        default:
          return emails;
      }
    }
  }
  return emails;
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
function getDefaultFilter() {
  return {
    search: "",
    status: "all",
    folder: "inbox",
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
