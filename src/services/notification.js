import Notify from "notifyjs";

export default {
  notify,
  enable,
  isSupported: Notify.isSupported
};

function notify(type, title, options = {}) {
  isEnabled(type)
    .then(() => doNotify())
    .catch(err => console.warn(err));

  function doNotify() {
    new Notify(title, options).show();
  }
}

function isEnabled() {
  // TODO: Check if yhe type is allowed to notify
  return enable();
}

function enable() {
  return new Promise((resolve, reject) => {
    if (!Notify.needsPermission) {
      return resolve(true);
    }

    if (Notify.isSupported()) {
      Notify.requestPermission(
        () => resolve(true),
        () => reject(new Error("You denied permission to display notifications"))
      );
    } else {
      reject(new Error("Notification are not supported by your browser"));
    }
  });
}
