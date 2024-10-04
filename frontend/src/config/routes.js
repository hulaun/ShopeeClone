const routes = {
  public: {
    home: "/",
    login: "/login",
    signup: "/signup",
    test: "/test",
  },
  consumer: {
    profile: "/consumer/profile",
  },
  vendor: {},
  admin: {
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    analitics: "/admin/analitics",
    calendar: "/admin/calendar",
    settings: "/admin/settings",
    messages: "/admin/messages",
  },
};
export default routes;
