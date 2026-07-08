const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

const guide = document.getElementById("guide");

const video = document.getElementById("video");
const target = document.getElementById("target");

const modal = document.getElementById("trackingModal");
const continueBtn = document.getElementById("continueBtn");
const closeBtn = document.getElementById("closeBtn");

const replayCard = document.getElementById("replayCard");
const replayBtn = document.getElementById("replayBtn");

const fullscreenBtn = document.getElementById("fullscreenBtn");


let started = false;

let trackingLostTimer = null;

let isTrackingLost = false;



// =========================
// MOBILE CHECK
// =========================

function isMobileDevice(){

    return /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
    );

}


window.addEventListener("load",()=>{


    if(!isMobileDevice()){

        const warning =
        document.getElementById(
            "desktop-warning"
        );

        if(warning){

            warning.style.display="flex";

        }


        const scene =
        document.querySelector(
            "a-scene"
        );


        if(scene){

            scene.style.display="none";

        }

    }


});




// =========================
// START AR
// =========================


startBtn.addEventListener(
"click",
async()=>{


    // unlock video

    video.muted=false;


    try{

        await video.play();

        video.pause();

        video.currentTime=0;


    }catch(e){

        console.log(e);

    }



    startScreen.style.opacity="0";

    startScreen.style.transition=
    "0.5s ease";



    setTimeout(()=>{


        startScreen.style.display="none";


        guide.style.display="block";


        started=true;



    },500);



});





// =========================
// TARGET FOUND
// =========================


target.addEventListener(
"targetFound",
async()=>{

    fullscreenBtn.style.display="block";

    if(!started)
    return;



    console.log(
        "Target Found"
    );



    isTrackingLost=false;



    if(trackingLostTimer){

        clearTimeout(
            trackingLostTimer
        );

        trackingLostTimer=null;

    }



    modal.style.display="none";


    guide.style.display="none";



    // play only if paused

    if(video.paused){


        try{


            await video.play();


        }catch(e){


            console.log(e);


        }


    }



});







// =========================
// TARGET LOST
// =========================


target.addEventListener(
"targetLost",
()=>{


    fullscreenBtn.style.display="none";

    if(!started)
    return;



    console.log(
        "Target Lost"
    );



    isTrackingLost=true;



    trackingLostTimer =
    setTimeout(()=>{


        if(isTrackingLost){


            video.pause();


            modal.style.display="flex";


        }



    },5000);



});








// =========================
// CONTINUE WATCHING
// =========================


continueBtn.addEventListener(
"click",
async()=>{


    modal.style.display="none";



    try{


        await video.play();


    }catch(e){


        console.log(e);


    }



});







// =========================
// CLOSE
// =========================


closeBtn.addEventListener(
"click",
()=>{


    modal.style.display="none";


    video.pause();


    video.currentTime=0;



});






// =========================
// VIDEO FINISHED
// =========================


video.addEventListener(
"ended",
()=>{


    replayCard.style.display="block";


});








// =========================
// REPLAY
// =========================


replayBtn.addEventListener(
"click",
async()=>{


    replayCard.style.display="none";


    video.currentTime=0;


    try{


        await video.play();


    }catch(e){


        console.log(e);


    }


});







// =========================
// FULLSCREEN
// =========================


fullscreenBtn.addEventListener(
"click",
()=>{


    if(video.requestFullscreen){


        video.requestFullscreen();


    }

    else if(video.webkitEnterFullscreen){


        video.webkitEnterFullscreen();


    }



});