'use strict';

angular.module('siApp.dashboard')
  .directive('siDashboardSidebar', [function () {
    return {
      scope: '',
      replace: true,
      controller: ['$scope', '$timeout', 'BACKGROUNDS', '$state', 'localStorageService', function($scope, $timeout, BACKGROUNDS, $state, localStorageService){
              function nextImg () {
                var num = Math.floor((moment().valueOf()) / 86400000 % BACKGROUNDS.length);

                //var num = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
                angular.element('body').css('background-image', "url('assets/img/bgs/" + BACKGROUNDS[num] + "')");
                angular.element('#sidebar-blur-background').css('background-image', "url('assets/img/bgs/" + BACKGROUNDS[num] + "')");
                $timeout(function () {
                  nextImg();
                }, 1000 * 60 * 60 * 1);
              }

              function tick () {
                $scope.currentTime = moment().format('HH:mm - D. MMMM, dddd');
                $scope.currentTimeShortA = moment().format('HH:mm');
                $scope.currentTimeShortB = moment().format('D. MMM');
                $timeout(function () {
                  tick();
                }, 1000);
              }
              tick();

              nextImg();

              $scope.$state = $state;

              $scope.isActive = function(state) {
                if(state==='calendar') {
                  return (
                    $state.is('dashboard.yearly') || 
                    $state.is('dashboard.monthly') ||
                    $state.is('dashboard.day')
                  );
                }
                else if(state==='schedule') {
                  return (
                    $state.is('dashboard.preSchedule.groups') || 
                    $state.is('dashboard.preSchedule.classrooms') ||
                    $state.is('dashboard.preSchedule.teachers') ||
                    $state.is('dashboard.schedule') ||
                    $state.is('dashboard.lecture')
                  );
                }
                else if(state==='about') {
                  return ( $state.is('dashboard.about') );
                }
                else if(state==='android') {
                  return ( $state.is('dashboard.android') );
                }
              }

              $scope.facultyName = localStorageService.get('auth').user.faculty.name;

              //$scope.displayAndroid = localStorageService.get('auth').user.userType == 'Panel';
            }], 
      templateUrl: 'dashboard/sidebar/si-dashboard-sidebar.html'
    };
  }]);