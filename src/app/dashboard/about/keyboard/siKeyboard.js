'use strict';

angular.module('siApp.dashboard')
  .directive('siKeyboard', function () {
    return {
      scope: '',
      replace: true,
      templateUrl: 'dashboard/about/keyboard/keyboard.html',
      link: function ($scope, $element, $attr) {
        $(function () {
          var $write = $('#write'),
            shift = false,
            capslock = false;

          $('#keyboard li').click(function () {
            var $this = $(this),
              character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

            $write.focus();

            // Shift keys
            if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
              $('.letter').toggleClass('uppercase');
              $('.symbol span').toggle();

              shift = (shift === true) ? false : true;
              capslock = false;
              return false;
            }

            // Caps lock
            if ($this.hasClass('capslock')) {
              $('.letter').toggleClass('uppercase');
              capslock = true;
              return false;
            }

            // Delete
            if ($this.hasClass('delete')) {
              // if text not selected
              if($write[0].selectionStart === $write[0].selectionEnd){
                var s = $write[0].selectionStart;
                $write[0].value = $write[0].value.substr(0, s-1) + $write[0].value.substr(s);
                $write[0].selectionStart = s-1;
                $write[0].selectionEnd = s-1;
              }
              else { // if text selected
                var s = $write[0].selectionStart;
                var e = $write[0].selectionEnd;
                $write[0].value = $write[0].value.substr(0, s) + $write[0].value.substr(e);
                $write[0].selectionStart = s;
                $write[0].selectionEnd = s; 
              }
              return false;
            }

            // Special characters
            if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
            if ($this.hasClass('space')) character = ' ';
            if ($this.hasClass('tab')) character = "\t";
            if ($this.hasClass('return')) character = "\n";

            // Uppercase letter
            if ($this.hasClass('uppercase')) character = character.toUpperCase();

            // Remove shift once a key is clicked.
            if (shift === true) {
              $('.symbol span').toggle();
              if (capslock === false) $('.letter').toggleClass('uppercase');

              shift = false;
            }

            // Add the character
            $write.val($write.val() + character);
          });
        });
      }
    };
  });