const routes = {
  public: {
    home: "/",
    login: "/login",
    signup: "/signup",
    test: "/test",
  },
  consumer: {
    profile: "/consumer/profile",
    viewProduct: "/consumer/view-product/:id",
    cart: "/consumer/cart",
    orderSuccessVNPAY: "/consumer/order-success-vnpay",
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
