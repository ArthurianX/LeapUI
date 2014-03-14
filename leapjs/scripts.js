//Declare new Leap Controller
var controller = new Leap.Controller({frameEventName: "deviceFrame"});



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
    window.handHoldDemoOutput = $('#dev .position-output')

    controller
        .use('screenPosition', {
            scale: 0.7
        })

        .on('frame', function(frame) {
            var hand;


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

            if ((hand = frame.hands[0])&&(frame.fingers.length > 3)&&(frame.fingers.length <= 5)) {

                handHoldDemoOutput.html("[<br/>&nbsp;&nbsp;" + (hand.screenPosition()[0]) +
                    "        <br/>&nbsp;&nbsp;" + (hand.screenPosition()[1]) +
                    "        <br/>&nbsp;&nbsp;" + (hand.screenPosition()[2]) + "<br/>]");


                if (hand.screenPosition()[1] < triHeight) {
                    console.log("going up");

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

                    if(mTop > (viewHeight - contentHeight)) {
                        $('.content').css({
                            marginTop: mTop -= 10
                        })
                    }


                }



            }
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