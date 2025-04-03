riot.register("router", route.Router);
riot.register("route", route.Route);

riot.compile().then(() => {
  riot.mount("app");

  // ✅ Force la route à se déclencher même si on accède directement à une URL avec ?query=
  const pathOnly = window.location.pathname;
  route.push(pathOnly);
});
