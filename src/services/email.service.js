import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const robotService = {
  query,
  save,
  remove,
  getById,
  createRobot,
};

const STORAGE_KEY = "emails";

_createRobots();

async function query(filterBy) {
  const robots = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    var { type, maxBatteryStatus, minBatteryStatus, model } = filterBy;
    maxBatteryStatus = maxBatteryStatus || Infinity;
    minBatteryStatus = minBatteryStatus || 0;
    robots = robots.filter(
      (robot) =>
        robot.type.toLowerCase().includes(type.toLowerCase()) &&
        robot.model.toLowerCase().includes(model.toLowerCase()) &&
        robot.batteryStatus < maxBatteryStatus &&
        robot.batteryStatus > minBatteryStatus
    );
  }
  return robots;
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(robotToSave) {
  if (robotToSave.id) {
    return storageService.put(STORAGE_KEY, robotToSave);
  } else {
    robotToSave.isOn = false;
    return storageService.post(STORAGE_KEY, robotToSave);
  }
}

function createRobot(model = "", type = "", batteryStatus = 100) {
  return {
    model,
    batteryStatus,
    type,
  };
}

function _createRobots() {
  let robots = utilService.loadFromStorage(STORAGE_KEY);
  if (!robots || !robots.length) {
    emails = [
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        to: "user@appsus.com",
      },
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        to: "user@appsus.com",
      },
      {
        id: "e101",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isStarred: false,
        sentAt: 1551133930594,
        removedAt: null,
        to: "user@appsus.com",
      },
    ];
    utilService.saveToStorage(STORAGE_KEY, robots);
  }
}
