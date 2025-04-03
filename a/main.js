riot.register("router", route.Router);
riot.register("route", route.Route);

riot.compile().then(() => {
  riot.mount("app");
});

