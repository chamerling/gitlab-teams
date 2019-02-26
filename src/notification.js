import Notification from "@/services/notification";

export default {
  init
};

function init(store) {
  Notification.enable()
    .then(status => {
      store.dispatch("setNotificationEnabled", status);
    })
    .catch(err => {
      console.log(err);
      store.dispatch("setNotificationEnabled", false);
    });
}
