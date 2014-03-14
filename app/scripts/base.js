$(document).ready(function () {  
    bottom_blob();
    carousel();
});
function bottom_blob() {
  $("#main_wrapper").mousemove(function(event) {
    $(".upper-blob").css("left", event.pageX + 'px');
  });
}
function carousel() {
  var wHeight = $(window).height();
  var wWidth = $(window).width();
  $('ul.carousel').css("width", wWidth - 10);
  $('ul.carousel').css("height", wHeight);
}