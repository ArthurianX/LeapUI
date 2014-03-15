//Declare new Leap Controller
var controller = new Leap.Controller({
    frameEventName: "deviceFrame",
    enableGestures: true
});


$(document).ready(function () {


    /* Getting Some Default values to work with */

    var viewHeight = $(window).height();

    var viewWidth = $(window).width();

    var triHeight = viewHeight / 3;

    var contentHeight = $(".page").height(); //inner scrollable content

    var mTop = 1; //Starting point for the calculation of scroll


    /* Molding Viewport List */

    $('ul.carousel li').css({
        width: viewWidth
    });

    $('ul.carousel').css({
        width: viewWidth * $('ul.carousel li').length
    })


    /* Making some outpost */

    console.log("Viewport height is: " + viewHeight);
    console.log("Viewport width is: " + viewWidth);
    console.log("Height trifecta is: " + triHeight);
    console.log("Current content height is: " +contentHeight);

    bottom_blob();
    carousel();
    keybinder();

    /*
     * ======================= LEAP CONTROL START
     * */


    /* Screen Position of hand. - Pointer */
    window.handHoldDemoCursor = $('.cursor');
    window.handHoldDemoOutput = $('#dev .position-output');
    window.gestureDemoOutput = $('#dev .gestures')


    // Depending on which view we choose we have to initialize some things before that.
    $('#views').change(function() {
        if (draggable[0] != undefined) {
            var type = draggable[0].vars.type;
            draggable[0].kill();
            var carousel_element = $('.carousel');
            var select_value = $(this).val();
            carousel_element.removeAttr('class').addClass('carousel ' + select_value);
            console.log(select_value);
            switch (select_value) {
                case 'circular':
                    tl.to('.carousel', 0.5, {
                        x: 0
                    });
                    spinning_weel();
                    break;
                case 'carousel':
                    tl.to('.carousel', 0.5, {
                        rotation: 0
                    });
                    carousel();
                    break;
                case 'cards':
                    $('#main_wrapper').attr('style', 'overflow: visible;');
                    $('.cards li').click(function() {
                        if (carousel_element.hasClass('cards')) {
                            $('#main_wrapper').removeAttr('style');
                            carousel_element.removeAttr('class').addClass('carousel');
                            var pos = $( ".carousel li" ).index($(this));
                            carousel(pos);
                            $('#views').val('carousel');
                        }
                    });
                    break;
            }
        }
    });
});

var draggable = null;
var tl = new TimelineMax();



/**
 * The cursor cult1 follower.
 */
function bottom_blob() {
    $("#main_wrapper").mousemove(function(event) {
        $(".upper-blob").css("left", event.pageX + 'px');
    });
}


/**
 * Creates the circle view.
 */
function spinning_weel() {
    draggable = new Draggable.create(".carousel", {type: "rotation", throwProps: true});
}


/**
 * Creates the slider view.
 */
function carousel(pos) {
    var wHeight = $(window).height();
    var wWidth = $(window).width();
    $('ul.carousel').css("height", wHeight);
    draggable = Draggable.create(".carousel", {
        type:"x",
        edgeResistance:0.65,
        bounds:"#main_wrapper",
        lockAxis:true,
        throwProps:true,
        onDragEnd: function() {
            tl.to('.carousel', 0.1, {x: $().calculateX()});
        }
    });
    if (pos != undefined) {
        tl.to('.carousel', 0.1, {x: -pos * $('#main_wrapper').width()});
    }
}


/**
 * Enables right and left navigation by key typing.
 */
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
