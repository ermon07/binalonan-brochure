// =====================================================
// ELEMENTS
// =====================================================


const startScreen =
document.getElementById("start-screen");


const startBtn =
document.getElementById("start-btn");


const guide =
document.getElementById("guide");




// =====================================================
// DESTINATION DATA
// =====================================================


const destinations = [

{

id:0,

target:
document.getElementById("target0"),

video:
document.getElementById("video0"),

plane:
document.getElementById("plane0"),

card:
document.getElementById("card0"),

button:
document.getElementById("button0"),


started:false,

completed:false,

time:0,


visible:false


},



{

id:1,

target:
document.getElementById("target1"),

video:
document.getElementById("video1"),

plane:
document.getElementById("plane1"),

card:
document.getElementById("card1"),

button:
document.getElementById("button1"),


started:false,

completed:false,

time:0,


visible:false


},



{

id:2,

target:
document.getElementById("target2"),

video:
document.getElementById("video2"),

plane:
document.getElementById("plane2"),

card:
document.getElementById("card2"),

button:
document.getElementById("button2"),


started:false,

completed:false,

time:0,


visible:false


},



{

id:3,

target:
document.getElementById("target3"),

video:
document.getElementById("video3"),

plane:
document.getElementById("plane3"),

card:
document.getElementById("card3"),

button:
document.getElementById("button3"),


started:false,

completed:false,

time:0,


visible:false


}

];





// =====================================================
// VARIABLES
// =====================================================


let started=false;



let currentPlaying=null;





// =====================================================
// SHOW / HIDE CARD
// =====================================================


function showCard(destination){



destination.card.setAttribute(
"visible",
true
);



destination.button.setAttribute(
"visible",
true
);





if(destination.completed){


destination.button.setAttribute(
"value",
"▶ PLAY AGAIN"
);


}



else if(destination.started){


destination.button.setAttribute(
"value",
"▶ RESUME\n\n↺ RESTART"
);


}



else{


destination.button.setAttribute(
"value",
"▶ PLAY"
);


}



}





function hideCard(destination){


destination.card.setAttribute(
"visible",
false
);



destination.button.setAttribute(
"visible",
false
);



}





function showVideo(destination){


destination.plane.setAttribute(
"visible",
true
);


}





function hideVideo(destination){


destination.plane.setAttribute(
"visible",
false
);


}





// =====================================================
// START EXPERIENCE
// =====================================================


startBtn.addEventListener(
"click",
()=>{


started=true;



startScreen.style.opacity="0";



setTimeout(()=>{


startScreen.style.display="none";


guide.style.display="block";


},500);



});

// =====================================================
// TARGET FOUND / LOST
// =====================================================


destinations.forEach((destination)=>{


    destination.target.addEventListener(
        "targetFound",
        ()=>{


            if(!started)
                return;



            console.log(
                "FOUND TARGET:",
                destination.id
            );



            destination.visible=true;



            showCard(destination);



        }
    );





    destination.target.addEventListener(
        "targetLost",
        ()=>{


            console.log(
                "LOST TARGET:",
                destination.id
            );



            destination.visible=false;



            // Save current progress

            if(
                destination.video
                &&
                !destination.video.paused
            ){

                destination.time =
                destination.video.currentTime;



                destination.video.pause();


            }



            hideCard(destination);



        }
    );



});





// =====================================================
// BUTTON CLICK HANDLER
// =====================================================


destinations.forEach((destination)=>{


    destination.button.addEventListener(
        "click",
        ()=>{


            if(!started)
                return;



            console.log(
                "CLICK:",
                destination.id
            );



            playDestination(destination);



        }
    );


});







// =====================================================
// PLAY / RESUME / RESTART
// =====================================================


async function playDestination(destination){



    const video =
    destination.video;



    // Stop nothing else
    // Multiple videos can exist


    showVideo(destination);



    hideCard(destination);





    if(destination.completed){


        console.log(
            "Restarting completed video"
        );


        video.currentTime=0;


        destination.time=0;


        destination.completed=false;


    }





    else if(destination.started){


        console.log(
            "Resuming video"
        );


        video.currentTime =
        destination.time;


    }





    else{


        console.log(
            "First play"
        );


        video.currentTime=0;


        destination.started=true;


    }





    try{


        await video.play();



        currentPlaying =
        destination;



    }


    catch(error){


        console.log(
            "VIDEO ERROR",
            error
        );


    }



}







// =====================================================
// VIDEO UPDATE SAVE TIME
// =====================================================


destinations.forEach((destination)=>{


    destination.video.addEventListener(
        "timeupdate",
        ()=>{


            if(
                !destination.video.paused
            ){


                destination.time =
                destination.video.currentTime;


            }


        }
    );



});







// =====================================================
// VIDEO FINISHED
// =====================================================


destinations.forEach((destination)=>{


    destination.video.addEventListener(
        "ended",
        ()=>{


            console.log(
                "FINISHED:",
                destination.id
            );



            destination.completed=true;


            destination.started=true;


            destination.time=0;



            hideVideo(destination);



            if(destination.visible){


                showCard(destination);


            }



        }
    );



});

