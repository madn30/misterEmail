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
  getDraftEmail,
  hasExistingDraft,
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy) {
  const { email: userEmail } = userService.getUser();
  let emails = await storageService.query(STORAGE_KEY);

  if (!filterBy) return emails;

  const {
    query = "",
    folder,
    to,
    from,
    subject,
    has,
    hasnot,
  } = { ...filterBy };
  return emails.filter((email) => {
    if (
      query &&
      !(
        email.subject.toLowerCase().includes(query.toLowerCase()) ||
        email.body.toLowerCase().includes(query.toLowerCase()) ||
        email.to.toLowerCase().includes(query.toLowerCase())
      )
    )
      return false;

    switch (folder) {
      case "inbox":
        return email.from !== userEmail && !email.isTrash && !email.isDraft;
      case "starred":
        return email.isStarred;
      case "sent":
        return email.from === userEmail && !email.isTrash && !email.isDraft;
      case "drafts":
        return email.isDraft;
      case "trash":
        return email.isTrash;
      default:
    }
    if (to && email.to !== to) return false;
    if (from && email.from !== from) return false;
    if (subject && email.subject !== subject) return false;

    if (
      query &&
      !(
        email.subject.toLowerCase().includes(query.toLowerCase()) ||
        email.body.toLowerCase().includes(query.toLowerCase()) ||
        email.to.toLowerCase().includes(query.toLowerCase())
      )
    )
      return false;
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
  const count = emails?.filter((email) => {
    return email?.folder?.includes(folder) && !email.isRead;
  }).length;
  return count;
}
function getDraftEmail(id) {
  const emails = utilService.loadFromStorage(STORAGE_KEY) || [];
  return emails.find((email) => email.id === id);
}
function hasExistingDraft(id) {
  const emails = utilService.loadFromStorage(STORAGE_KEY) || [];
  return emails.some((email) => email.id === id && email.isDraft);
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
    isTrash: false,
    isDraft: false,
    sentAt: "",
    removedAt: "",
    sentAt: new Date(),
  };
}
function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter();
  const filterBy = {};
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || defaultFilter[field];
  }

  return filterBy;
}

function getDefaultFilter({
  query = "",
  folder = null,
  to = "",
  from = "",
  subject = "",
  has = "",
  hasnot = "",
} = {}) {
  return {
    query,
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
    emails = [
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: false,
        isDraft: false,
        isTrash: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: "e102",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: false,
        isDraft: false,
        isTrash: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}
