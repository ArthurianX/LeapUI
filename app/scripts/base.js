$(document).ready(function () {
  var tl = new TimelineMax();
  jwerty.key('enter', function () { 
    tl.to('#view-politics', 1, {display:'block'});
  });
  jwerty.key('ctrl', function () { 
    tl.to('#view-sports', 1, {display:'block'});
  });
  jwerty.key('1', function () { 
    tl.to('#view-technology', 1, {display:'block'});
  });
  jwerty.key('2', function () { 
    tl.to('#view-business', 1, {display:'block'});
  });
  jwerty.key('3', function () { 
    tl.to('#view-entertainment', 1, {display:'block'});
  });
  jwerty.key('4', function () { 
    tl.to('#view-travel', 1, {display:'block'});
  });
  $("#main_wrapper").mousemove(function(event) {
    $(".upper-blob").css("left", event.pageX + 'px');
  });
});