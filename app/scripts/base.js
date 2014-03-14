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
    var gridWidth = $('#main_wrapper').width();
    var gridHeight = $('#main_wrapper').height();
    Draggable.create(".carousel", {
        type:"x",
        edgeResistance:0.65,
        bounds:"#main_wrapper",
        lockAxis:true,
        throwProps:true,
        snap: {
            x: function(endValue) {
                return Math.round(endValue / gridWidth) * gridWidth;
            },
            y: function(endValue) {
                return Math.round(endValue / gridHeight) * gridHeight;
            }
        }
    });
}
