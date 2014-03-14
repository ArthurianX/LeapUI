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
    var tl = new TimelineMax();
    $('ul.carousel').css("height", wHeight);
    var gridWidth = $('#main_wrapper').width();
    var draggable = Draggable.create(".carousel", {
        type:"x",
        edgeResistance:0.65,
        bounds:"#main_wrapper",
        lockAxis:true,
        throwProps:true,
        onDragEnd: function(x) {
            var transform = $('.carousel')[0]._gsTransform.x;
            var multiple = Math.round(transform / gridWidth);
            if (Math.abs(multiple) + 1 >= $('.page').length) {
                multiple = multiple + 1;
            }
            tl.to('.carousel', 0.5, {x: multiple * gridWidth});
        }
    });
}
