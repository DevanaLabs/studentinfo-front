// Disable context menu
// dev-comment document.addEventListener('contextmenu', function(event){ event.preventDefault(); });

'use strict';

// Declare app level module which depends on views, and components
angular.module('siApp', ['ngCachedResource', 'ui.router', 'ngAnimate', 'ui.calendar']);