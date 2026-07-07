/**
 * Minimal hash router.
 *
 * Views are render functions: (rootElement, ...routeParams) => void.
 * Hash-based so the site works as plain static files (no server rewrites).
 */

export class Router {
  /**
   * @param {HTMLElement} root - container all views render into
   * @param {Array<{pattern: RegExp, render: Function}>} routes
   */
  constructor(root, routes) {
    this.root = root;
    this.routes = routes;
  }

  start() {
    window.addEventListener("hashchange", () => this.resolve());
    this.resolve();
  }

  /** Navigate programmatically (e.g. from back tabs / location buttons). */
  navigate(path) {
    window.location.hash = path;
  }

  resolve() {
    const path = window.location.hash.replace(/^#/, "") || "/";

    for (const route of this.routes) {
      const match = path.match(route.pattern);
      if (match) {
        route.render(this.root, ...match.slice(1));
        return;
      }
    }

    // Unknown route → back to map
    this.navigate("/");
  }
}
