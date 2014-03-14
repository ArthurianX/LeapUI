//Declare new Leap Controller
var controller = new Leap.Controller({
    frameEventName: "deviceFrame",
    enableGestures: true
});



$(document).ready(function(){

    /* Default values */

    var viewHeight = $(window).height();

    var viewWidth = $(window).width();

    var triHeight = viewHeight / 3;

    var contentHeight = $(".content").height();

    var mTop = 1;


    console.log(viewHeight);
    console.log(viewWidth);
    console.log(triHeight);
    console.log(contentHeight);



    /*
     * ======================= LEAP CONTROL
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

            //Cursor movement, with 1-3 fingers
            if ((hand = frame.hands[0])&&(frame.fingers.length >= 1)&&(frame.fingers.length <4)) {

                handHoldDemoOutput.html("[<br/>&nbsp;&nbsp;" + (hand.screenPosition()[0]) +
                    "        <br/>&nbsp;&nbsp;" + (hand.screenPosition()[1]) +
                    "        <br/>&nbsp;&nbsp;" + (hand.screenPosition()[2]) + "<br/>]");

                $('.cursor').css({
                    left: hand.screenPosition()[0] + 'px',
                    top: hand.screenPosition()[1] + 'px'
                });
                var overlapping = $(".cursor").collision( ".content div"/*, {obstacleData: "odata", colliderData: "cdata", directionData: "ddata", as: "<div/>"}*/);
                $(".content div").removeClass("hovered");
                overlapping.addClass("hovered");
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
                        $('.content').css({
                            marginTop: mTop += 10
                        })
                    } else if ((hand.screenPosition()[1] > 200) && (mTop < 0)) {
                        $('.content').css({
                            marginTop: mTop += 15
                        })
                    } else if ((hand.screenPosition()[1] < 200) && (mTop < 0)) {
                        $('.content').css({
                            marginTop: mTop += 20
                        })
                    }

                } else {
                    console.log("going down");


                    //Accelerate on scroll
                    if((mTop > (viewHeight - contentHeight))&&((hand.screenPosition()[1] < 350))) {
                        $('.content').css({
                            marginTop: mTop -= 10
                        })
                    } else if((mTop > (viewHeight - contentHeight))&&((hand.screenPosition()[1] < 400))) {
                        $('.content').css({
                            marginTop: mTop -= 15
                        })
                    } else if((mTop > (viewHeight - contentHeight))&&((hand.screenPosition()[1] < 500))) {
                        $('.content').css({
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
                        } else {
                            console.log("Swipe Event LEFT fired");
                        }

                    }

                }

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




    controller.connect();












});