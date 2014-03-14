$(document).ready(function () {
  var tl = new TimelineMax();
  jwerty.key('enter', function () { 
    alert('this');
    tl.to('.page', 1, {display:'block'});
  });
});