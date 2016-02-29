'use strict';

angular.module('siApp.dashboard')
  .directive('siDashboardSidebar', [function () {
    return {
      scope: '',
      replace: true,
      controller: ['BACKGROUNDS', function(BACKGROUNDS){
              function nextImg () {
                console.log('asdf');
                var num = Math.floor((moment().valueOf()) / 86400000 % BACKGROUNDS.length);

                //var num = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
                angular.element('body').css('background-image', "url('assets/img/bgs/" + BACKGROUNDS[num] + "')");
                angular.element('#sidebar-blur-background').css('background-image', "url('assets/img/bgs/" + BACKGROUNDS[num] + "')");
                setTimeout(function () {
                  nextImg()
                }, 1000 * 60 * 60 * 1);
              }

              nextImg();
            }], 
      templateUrl: 'dashboard/sidebar/si-dashboard-sidebar.html'
    };
  }]);