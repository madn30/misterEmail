import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
  getDefaultFilter,
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    const { search = "", status } = filterBy;

    if (search) {
      emails = emails.filter(email => 
        email.subject.toLowerCase().includes(search.toLowerCase()) || 
        email.body.toLowerCase().includes(search.toLowerCase()) || 
        email.to.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status && status !== 'all') {
      const isRead = status === "read";
      emails = emails.filter(email => email.isRead === isRead);
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
function getDefaultFilter() {
  return {
    search: "",
    status: "all",
  };
}
function createEmail() {
  return {

  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [
      {
        id: "e101",
        subject: "[Slack] Vicky Polatov - Coding Academy mentioned you in #ca-preground",
        body: "You have a new mention in Coding Academy - PreGround Course - JAN 24 (codingacademy-2oz1401.slack.com)From #ca-preground Vicky Polatov - Coding Academy January",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        to: "user@appsus.com",
      },
      {
        id: "e102",
        subject: "[Slack] Vicky Polatov - Coding Academy mentioned you in #ca-preground",
        body: "You have a new mention in Coding Academy - PreGround Course - JAN 24 (codingacademy-2oz1401.slack.com)From #ca-preground Vicky Polatov - Coding Academy January",
        isRead: true,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        to: "user@appsus.com",
      },
      {
        id: "e103",
        subject: "[Slack] Vicky Polatov - Coding Academy mentioned you in #ca-preground",
        body: "You have a new mention in Coding Academy - PreGround Course - JAN 24 (codingacademy-2oz1401.slack.com)From #ca-preground Vicky Polatov - Coding Academy January",
        isRead: false,
        isStarred: true,
        sentAt: 1551133930594,
        removedAt: null,
        to: "user@appsus.com",
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
