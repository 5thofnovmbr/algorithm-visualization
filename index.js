const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("root") },
    { path: "/test", view: () => console.log("test") },
    { path: "/posts", view: () => console.log("posts") },
    { path: "/:dir_id", view: () => console.log("dir") },
  ];

  const pageMatches = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname,
    };
  });

  let match = pageMatches.find((pageMatch) => pageMatch.isMatch);
  match.route.view();
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState(null, null, e.target.href);
    router();
  });

  router();
});
