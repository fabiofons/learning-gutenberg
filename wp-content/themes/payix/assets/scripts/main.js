// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import solutions from './routes/solutions';

/** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  // Solutions page
  solutions
});

// Load Events
jQuery(document).ready(() => routes.loadEvents());