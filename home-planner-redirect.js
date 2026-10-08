/* Legacy fragment links cannot be forwarded by the server. Keep session trip data intact. */
(()=>{'use strict';function forward(){if(location.hash==='#planner')location.replace('/my-trip'+location.search)}forward();window.addEventListener('hashchange',forward)})();
