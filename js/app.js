/**
 * English Explorer — application entry point.
 *
 * Wires up the hash router and registers the three view levels:
 *   #/            → homepage map (4 unit stops + Today's Plan)
 *   #/unit/:id    → unit carousel (7 location buttons)
 *   #/unit/:id/:sectionId → section page (empty template for now)
 */

import { Router } from "./router.js";
import { renderMapView } from "./views/mapView.js";
import { renderUnitView } from "./views/unitView.js";
import { renderSectionView } from "./views/sectionView.js";

const appRoot = document.getElementById("app");

const router = new Router(appRoot, [
  { pattern: /^\/?$/, render: renderMapView },
  { pattern: /^\/unit\/([\w-]+)$/, render: renderUnitView },
  { pattern: /^\/unit\/([\w-]+)\/([\w-]+)$/, render: renderSectionView },
]);

router.start();
