// Disable context menu
document.addEventListener('contextmenu', function(event){ event.preventDefault(); });

// Change backgrounds 
function nextImg() {
	var bgs = [
	"resized_photo-1440688807730-73e4e2169fb8.jpg",
	"resized_photo-1441155472722-d17942a2b76a.jpg",
	"resized_photo-1442120108414-42e7ea50d0b5.jpg",
	"resized_photo-1442589031151-61d5645469d7.jpg",
	"resized_photo-1444090542259-0af8fa96557e.jpg",
	"resized_photo-1444858345149-8ff40887589b.jpg",
	"resized_shutterstock_120441409.jpg",
	"resized_shutterstock_203436451.jpg",
	"resized_shutterstock_203436520.jpg",
	"resized_shutterstock_211796950.jpg",
	"resized_shutterstock_234826687.jpg",
	"resized_shutterstock_286056893.jpg",
	"resized_shutterstock_306756323.jpg",
	"resized_shutterstock_307763318.jpg",
	"resized_shutterstock_309705941.jpg",
	"resized_shutterstock_317358113.jpg",
	"resized_shutterstock_323467583.jpg"
	]
	
	var num = bgs[Math.floor(Math.random() * bgs.length)];
	document.body.style.background = "url('images/bgs/" + num + "')";
	document.getElementById("bgBlur").style.background = "url('images/bgs/" + num + "') ";
	
	setTimeout(function(){nextImg()}, 1000*60*60*24); //24h
}
//nextImg(); 


'use strict';

// Declare app level module which depends on views, and components
angular.module('siApp', ['ngCachedResource', 'ui.router', 'ngAnimate']);

angular.module('siApp')
	.constant('API_BASE_URL', globalSettings.apiBaseUrl)
	.constant('SCREENSAVER_TIME', globalSettings.screensaverTime);
