import { AuthRoutes, AuthStore } from "./modules/auth";
import {
  DashboardRoutes,
  DashboardStore,
  DashboardLinks,
  LoaderStore,
} from "./modules/dashboard";
import nextFactory from "./modules/auth/middleware/MiddlewareFactory";
import { AdminRoutes, AdminStore, AdminLinks } from "./modules/admin";

export default {
  install(Vue, options) {
    // eslint-disable-next-line no-global-assign
    Event = new Vue();

    if (options.router) {
      options.router.addRoute(...DashboardRoutes);
      options.router.addRoute(...AuthRoutes);
      options.router.addRoute(...AdminRoutes);

      options.router.beforeEach((to, from, next) => {
        if (to.meta.middleware) {
          const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

          const context = {
            from,
            next,
            router: options.router,
          };

          const nextMiddleware = nextFactory(context, middleware, 1);
          return middleware[0]({ ...context, next: nextMiddleware });
        }
        return next();
      });
    }

    if (options.store) {
      options.store.registerModule("Dashboard", DashboardStore);
      options.store.registerModule("auth", AuthStore);
      options.store.registerModule("Admin", AdminStore);
      options.store.commit("Dashboard/ADD_LINK", DashboardLinks);
      options.store.registerModule("loader", LoaderStore);
    }
  },
};
