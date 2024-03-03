import Notification from "../models/notifications";

export const unreadNotification = (notifications: Notification[]) => {
  return notifications.filter((n) => n.isRead === false);
};
