// =========================
// ELEMENTS
// =========================


const startScreen =
document.getElementById("start-screen");


const startBtn =
document.getElementById("start-btn");


const guide =
document.getElementById("guide");



// =========================
// DESTINATION DATA
// =========================


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
document.getElementById("btn0"),


started:false,

completed:false,

time:0,

visible:false,

position:null


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
document.getElementById("btn1"),


started:false,

completed:false,

time:0,

visible:false,

position:null


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
document.getElementById("btn2"),


started:false,

completed:false,

time:0,

visible:false,

position:null


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
document.getElementById("btn3"),


started:false,

completed:false,

time:0,

visible:false,

position:null


}

];





let started=false;





// =========================
// START AR
// =========================


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

// =========================
// TARGET FOUND / LOST
// =========================


destinations.forEach((destination)=>{


    destination.target.addEventListener(
        "targetFound",
        ()=>{


            if(!started)
                return;


            console.log(
                "TARGET FOUND:",
                destination.id
            );



            destination.visible=true;



            updateButton(destination);



            showCard(destination);



            startTrackingPosition(destination);



        }
    );







    destination.target.addEventListener(
        "targetLost",
        ()=>{


            console.log(
                "TARGET LOST:",
                destination.id
            );



            destination.visible=false;



            saveProgress(destination);



            hideCard(destination);



        }
    );



});








// =========================
// SHOW CARD
// =========================


function showCard(destination){


    destination.card.style.display="block";


}





function hideCard(destination){


    destination.card.style.display="none";


}







// =========================
// UPDATE BUTTON TEXT
// =========================


function updateButton(destination){



    if(destination.completed){


        destination.button.innerHTML =
        "↻ PLAY AGAIN";


    }



    else if(destination.started){


        destination.button.innerHTML =
        "▶ RESUME<br>↺ RESTART";


    }



    else{


        destination.button.innerHTML =
        "▶ PLAY";


    }


}








// =========================
// POSITION HTML CARD
// =========================


function startTrackingPosition(destination){



    function update(){



        if(!destination.visible)
            return;



        const worldPosition =
        new THREE.Vector3();



        destination.target.object3D
        .getWorldPosition(
            worldPosition
        );



        const camera =
        document.querySelector(
            "a-camera"
        );



        const vector =
        worldPosition.clone();



        vector.project(
            camera.components.camera.camera
        );



        const x =
        (vector.x * .5 + .5)
        * window.innerWidth;



        const y =
        (-vector.y * .5 + .5)
        * window.innerHeight;





        destination.card.style.left =
        x+"px";



        destination.card.style.top =
        y+"px";



        requestAnimationFrame(
            update
        );


    }


    update();

}








// =========================
// SAVE VIDEO TIME
// =========================


function saveProgress(destination){



    if(
        !destination.video.paused
    ){


        destination.time =
        destination.video.currentTime;


        destination.video.pause();


    }



}








// =========================
// BUTTON CLICK
// =========================


destinations.forEach(
(destination)=>{


destination.button.addEventListener(
"click",
()=>{


playVideo(destination);



});


});

// =========================
// PLAY VIDEO
// =========================


async function playVideo(destination){



const video =
destination.video;



console.log(
"PLAYING VIDEO:",
destination.id
);





// show AR video

destination.plane.setAttribute(
"visible",
true
);



// hide button

hideCard(destination);






// FIRST TIME PLAY

if(!destination.started){


    video.currentTime=0;


    destination.started=true;


}






// RESUME

else if(
destination.started &&
!destination.completed
){


    video.currentTime =
    destination.time;


}






// REPLAY AFTER FINISH

else if(destination.completed){


    video.currentTime=0;


    destination.completed=false;


    destination.started=true;


}







try{


    // unlock mobile playback

    video.muted=false;



    await video.play();



    console.log(
    "VIDEO STARTED"
    );


}



catch(error){


    console.log(
    "VIDEO ERROR:",
    error
    );


}



}









// =========================
// SAVE CURRENT TIME
// =========================


destinations.forEach(
(destination)=>{


destination.video.addEventListener(
"timeupdate",
()=>{


if(
!destination.video.paused
){


destination.time =
destination.video.currentTime;



}



});


});









// =========================
// VIDEO FINISHED
// =========================


destinations.forEach(
(destination)=>{


destination.video.addEventListener(
"ended",
()=>{


console.log(
"VIDEO FINISHED:",
destination.id
);




destination.completed=true;


destination.time=0;




destination.plane.setAttribute(
"visible",
false
);





if(destination.visible){


updateButton(destination);


showCard(destination);


}



});


});