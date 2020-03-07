$(document).ready(function () {
  $('.paymodal-select').niceSelect();



  var paymodalOverlay = $('.paymodal-overlay');
  var paymodal = $('.paymodal');

  $('#show').click(function () {
    paymodal.removeClass("paymodal--closed");
    paymodalOverlay.removeClass("paymodal-overlay--hidden");
  });

  $('.paymodal-close').click(function () {
    paymodal.addClass("paymodal--closed");
      /*.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
        $(this).off();
        paymodalOverlay.addClass("paymodal-overlay--hidden");
      });*/
    paymodalOverlay.addClass("paymodal-overlay--hidden");
  });
});
