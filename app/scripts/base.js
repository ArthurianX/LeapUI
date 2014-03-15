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

    var pageScrollHeight = 0;

    var cardHeight = 0;

    /* Molding Viewport List */

    $('ul.carousel li').css({
        width: viewWidth
    });

    $('ul.carousel').css({
        width: viewWidth * $('ul.carousel li').length
    })

    setTimeout(function(){
        $('ul.carousel li .page').each(function(){
            if ($(this).height() > pageScrollHeight ) {
                pageScrollHeight = $(this).height();
            }

            console.log(pageScrollHeight);
        });



    }, 2000)


    /* Making some outputs */

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

    controller
        .use('screenPosition', {
            scale: 0.7
        })

        .on('frame', function(frame) {
            var hand;

            //Cursor movement,  with 1-3 fingers
            if ((hand = frame.hands[0])&&(frame.fingers.length >= 1)&&(frame.fingers.length <4)) {

                handHoldDemoOutput.html("[<br/>&nbsp;&nbsp;" + (hand.screenPosition()[0]) +
                    "        <br/>&nbsp;&nbsp;" + (hand.screenPosition()[1]) +
                    "        <br/>&nbsp;&nbsp;" + (hand.screenPosition()[2]) + "<br/>]");

                //Move cursor
                $('.cursor').css({
                    left: hand.screenPosition()[0] + 'px',
                    top: hand.screenPosition()[1] + 500 + 'px'
                });

                //Move Blob
                $(".upper-blob").css({
                    left: $('.cursor').offset().left
                })


                var overlapping = $(".cursor").collision( "#main_wrapper ul li .page div"/*, {obstacleData: "odata", colliderData: "cdata", directionData: "ddata", as: "<div/>"}*/);
                $("#main_wrapper ul li .page div").removeClass("hovered");
                overlapping.addClass("hovered");


                var changeView = $(".cursor").collision( ".switch ul li"/*, {obstacleData: "odata", colliderData: "cdata", directionData: "ddata", as: "<div/>"}*/);
                $(".switch ul li").removeClass("hovered");
                changeView.addClass("hovered");

            }

            //Page scrolling, if we have more than 3 fingers
            if ((hand = frame.hands[0])&&(frame.fingers.length > 3)&&(frame.fingers.length <= 5)) {

                handHoldDemoOutput.html("[<br/>&nbsp;&nbsp;" + (hand.screenPosition()[0]) +
                    "        <br/>&nbsp;&nbsp;" + (hand.screenPosition()[1]) +
                    "        <br/>&nbsp;&nbsp;" + (hand.screenPosition()[2]) + "<br/>]");


                if (hand.screenPosition()[1] < triHeight) {
                    console.log("going up");

                    //Accelerate on scroll
                    if ((hand.screenPosition()[1] > 250) && (mTop < 0)) {
                        $('ul.carousel li .page').css({
                            marginTop: mTop += 10
                        })
                    } else if ((hand.screenPosition()[1] > 200) && (mTop < 0)) {
                        $('ul.carousel li .page').css({
                            marginTop: mTop += 15
                        })
                    } else if ((hand.screenPosition()[1] < 200) && (mTop < 0)) {
                        $('ul.carousel li .page').css({
                            marginTop: mTop += 20
                        })
                    }

                } else {
                    console.log("going down");

                    //Accelerate on scroll
                    if((mTop > (viewHeight - pageScrollHeight))&&((hand.screenPosition()[1] < 350))) {
                        $('ul.carousel li .page').css({
                            marginTop: mTop -= 10
                        })
                    } else if((mTop > (viewHeight - pageScrollHeight))&&((hand.screenPosition()[1] < 400))) {
                        $('ul.carousel li .page').css({
                            marginTop: mTop -= 15
                        })
                    } else if((mTop > (viewHeight - pageScrollHeight))&&((hand.screenPosition()[1] > 400))) {
                        $('ul.carousel li .page').css({
                            marginTop: mTop -= 20
                        })
                    }


                }
            }

            //Gestures

            if(frame.gestures.length > 0) {

                var gestures = frame.gestures;
                var gestureType = gestures[0].type;
                var gestureState = gestures[0].state;

                //Swipe Gestures
                if (gestureType == 'swipe') {
                    var gestureDirection = gestures[0].direction[0];

                    if (gestureState == 'start') {
                        console.log(gestures[0]);

                    }

                    if (gestureState == 'stop') {
                        console.log(gestures[0]);
                        var gesturePosition = gestures[0].position[0];
                        var gestureStartPosition = gestures[0].startPosition[0];

                        //We have both values, compare them
                        if ((gestureDirection > 0)&&(Math.abs(gesturePosition - gestureStartPosition) > 50)) {
                            console.log("Swipe Event RIGHT fired");
                            tl.to('.carousel', 0.5, {
                                x: $().calculateX(-1)
                            });
                        } else {
                            console.log("Swipe Event LEFT fired");
                            tl.to('.carousel', 0.5, {
                                x: $().calculateX(1)
                            });
                        }

                    }

                }
                //Circle Gestures
                if ((gestureType == 'circle')&&(gestureState == 'start')) {
                    console.log(gestures[0]);
                    console.log("Circle Event STARTED");
                }

                if ((gestureType == 'circle')&&(gestureState == 'stop')) {

                    var gestureRadius = gestures[0].radius;

                    if (gestureRadius > 50) {
                        console.log(gestures[0]);
                        console.log("Circle Event fired and ENDED");
                    }
                }



                if ((gestureType == 'keyTap')&&(gestureState == 'stop')) {
                    console.log(gestures[0]);
                    console.log("KeyTap Gesture Fired");

                    if ($(".switch li.hovered").length) {
                        console.log("Firing " + $(".switch li.hovered").attr("class"));
                    }

                }
            }

            gestureDemoOutput.html("[<br/>&nbsp;&nbsp;" + gestures);





        })

        .on('connect', function(){
            $('.noleap').hide();
            console.log("Successfully connected.");
        })
        .on('disconnect', function(){
            $('.noleap').show();
        });


    controller.on('deviceConnected', function() {
        console.log("A Leap device has been connected.");
    });

    controller.on('deviceDisconnected', function() {
        console.log("A Leap device has been disconnected.");
    });

    controller.on('focus', function() {
        console.log("Back in the game");
    });

    controller.on('blur', function() {
        console.log("Lost focus");
    });

    controller.on('frame', function(response) {
        // your code here
        //console.log(response);
    });

    controller.on('animationFrame', function(response) {
        // your code here
        //console.log(response);
    });

    //Connect the Controller
    controller.connect();

    /*
     * ======================= LEAP CONTROL END
     * */

    // Depending on which view we choose we have to initialize some things before that.
    $('#viewss').click(function() {
        if (draggable[0] != undefined) {
            var type = draggable[0].vars.type;
            draggable[0].kill();
            var carousel_element = $('.carousel');
            var select_value = $(this).data('view');
            console.log(select_value);
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
$('#views li').click(function() {
    var viewAction = $(this).data('view');
    console.log(viewAction);
    
    switch (viewAction) {
      case 'circular':
       
        break;
      case 'carousel':
        
        break;
      case 'cards':
        $('main_wrapper').find('.carousel li').each(function(){
          var title = $(this).find('h1').text();
          console.log(title);
        });
      };
 
});
});

var draggable = null;
var tl = new TimelineMax();



/**
 * The cursor cult1 follower.
 */
function bottom_blob() {
    /*$("#main_wrapper").mousemove(function(event) {
        $(".upper-blob").css("left", event.pageX + 'px');
    });*/
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
    else if (Math.abs(multiple) + 1 > $('.page').length) {
        multiple = multiple + 1;
    }

    return multiple * gridWidth;
}

