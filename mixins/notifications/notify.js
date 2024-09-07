const Notify = {
  mounted: function () {
    const Notification =
      window.Notification ||
      window.mozNotification ||
      window.webkitNotification;
    Notification.requestPermission(function (permission) {});
    if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {});
    }
  },
  methods: {
    test: function () {
      console.log("working");
    },
    showDesktopNotification: function (payload) {
      const { message, body, icon } = payload;
      const timeout = 10000;
      const instance = new Notification(message, {
        body: body,
        icon: icon,
      });
      instance.onclick = function () {
        // Something to do
      };
      instance.onerror = function () {
        // Something to do
      };
      instance.onshow = function () {};
      instance.onclose = function () {
        // Something to do
      };
      setTimeout(instance.close.bind(instance), timeout);
      return false;
    },
  },
};

export default Notify;
