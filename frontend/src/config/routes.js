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
    dashboard: "/admin/",
    user: "/admin/user",
    analitics: "/admin/analitics",
    calendar: "/admin/calendar",
    settings: "/admin/settings",
    messages: "/admin/messages",
  },
};
export default routes;
