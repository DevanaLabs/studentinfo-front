// Disable context menu
// dev-comment document.addEventListener('contextmenu', function(event){ event.preventDefault(); });

'use strict';

// Declare app level module which depends on views, and components
angular.module('siApp', ['ngCachedResource', 'ui.router', 'ngAnimate']);

angular.module('siApp')
	.constant('API_BASE_URL', globalSettings.apiBaseUrl)
	.constant('SCREENSAVER_TIME', globalSettings.screensaverTime);