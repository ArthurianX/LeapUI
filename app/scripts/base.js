$(document).ready(function () {
    bottom_blob();
    carousel();
    keybinder();
    $('.switch-view').click(function() {
        if (draggable[0] != undefined) {
            var type = draggable[0].vars.type;
            draggable[0].kill();
            if (draggable[0].vars.type == "rotation") {
                tl.to('.carousel', 0.5, {
                    rotation: 0
                });
                $('.carousel').removeClass('circular');
                carousel();
            }
            else {
                $('.carousel').addClass('circular');
                spinning_weel()
            }
        }
    });
});
var draggable = null;
var tl = new TimelineMax();
function bottom_blob() {
    $("#main_wrapper").mousemove(function(event) {
        $(".upper-blob").css("left", event.pageX + 'px');
    });
}
function spinning_weel() {
    draggable = Draggable.create(".carousel", {type: "rotation", throwProps: true});
}
function carousel() {
    var wHeight = $(window).height();
    var wWidth = $(window).width();
    $('ul.carousel').css("height", wHeight);
    draggable = Draggable.create(".carousel", {
        type:"x",
        edgeResistance:0.65,
        bounds:"#main_wrapper",
        lockAxis:true,
        throwProps:true,
        onDragEnd: function(x) {
            tl.to('.carousel', 0.5, {x: $().calculateX()});
        }
    });
}

function keybinder() {
    jwerty.key('right/left', function (e) {
        var direction = (e.originalEvent.keyIdentifier == 'Right') ? -1 : 1;
        tl.to('.carousel', 0.5, {
            x: $().calculateX(direction)
        });
    });
}
/**
 * Calculates the X value for snap and more.
 *
 * @returns {number}
 */
$.fn.calculateX = function(add) {
    var gridWidth = $('#main_wrapper').width();
    var transform = $('.carousel')[0]._gsTransform.x;
    var multiple = Math.round(transform / gridWidth);
    if (add != undefined) {
        multiple = add + multiple;
    }
    if (multiple > 0) {
        multiple = multiple -1;
    }
    else if (Math.abs(multiple) + 1 >= $('.page').length) {
        multiple = multiple + 1;
    }

    return multiple * gridWidth;
}
