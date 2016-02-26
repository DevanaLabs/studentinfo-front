'use strict';

angular.module('siApp.dashboard')
  .controller('TeachersCtrl', ['$rootScope', '$scope', '$state', '$translate', 'Teachers', 
  function ($rootScope, $scope, $state, $translate, Teachers) {
    $scope.subfilters = Teachers.getFilters();

    $scope.allTeachers = Teachers.getShown();

    $scope.scrollToLetter = function (letter) {
      angular.element(".pickers-wrapper")[0].scrollTop = angular.element("#teacherLetter"+letter)[0].offsetTop;
    };

    // mark letters as active on scroll
    angular.element(".pickers-wrapper")[0].onscroll = function () {
      MarkActiveLetter();
    };

    function MarkActiveLetter () {
      var letters = angular.element(".teacher-header");
      var pos = angular.element(".pickers-wrapper")[0].scrollTop;
      for (var i = 0; i < letters.length; i++) {
        if (letters[i].offsetTop >= pos) {
          angular.element(".subfilter-wrapper.letter.active").removeClass('active');
          angular.element("#letter-filter-" + letters[i].id.substr(13,1)).addClass('active');
          break;
        }
      }
    }

    //MarkActiveLetter();
    setTimeout(function(){ MarkActiveLetter(); }, 0);

  }]);
 