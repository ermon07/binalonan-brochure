// =========================
// ELEMENTS
// =========================


const startScreen =
document.getElementById("start-screen");


const startBtn =
document.getElementById("start-btn");


const guide =
document.getElementById("guide");


const videoPanel =
document.getElementById("video-panel");





let started = false;






// =========================
// TARGET DATA
// =========================


const destinations = [


{
id:0,

name:"Destination 1",

target:
document.getElementById("target0"),

video:
document.getElementById("video0"),

plane:
document.getElementById("plane0"),

visible:false,

playing:false,

started:false,

finished:false,

time:0

},




{
id:1,

name:"Destination 2",

target:
document.getElementById("target1"),

video:
document.getElementById("video1"),

plane:
document.getElementById("plane1"),

visible:false,

playing:false,

started:false,

finished:false,

time:0

},




{
id:2,

name:"Destination 3",

target:
document.getElementById("target2"),

video:
document.getElementById("video2"),

plane:
document.getElementById("plane2"),

visible:false,

playing:false,

started:false,

finished:false,

time:0

},




{
id:3,

name:"Destination 4",

target:
document.getElementById("target3"),

video:
document.getElementById("video3"),

plane:
document.getElementById("plane3"),

visible:false,

playing:false,

started:false,

finished:false,

time:0

}



];








// =========================
// START EXPERIENCE
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
                "FOUND TARGET:",
                destination.id
            );



            destination.visible=true;



            createCard(destination);



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



            saveVideoTime(destination);



            removeCard(destination);



        }
    );



});









// =========================
// CREATE VIDEO CARD
// =========================


function createCard(destination){



    // prevent duplicate cards

    if(
        document.getElementById(
            "card-"+destination.id
        )
    ){

        return;

    }






    const card =
    document.createElement("div");



    card.className =
    "video-card";



    card.id =
    "card-"+destination.id;






    const title =
    document.createElement("h3");



    title.innerHTML =
    "📍 "+destination.name;







    const button =
    document.createElement("button");



    button.className =
    "video-button";



    updateButtonText(
        button,
        destination
    );






    button.onclick =
    ()=>{


        videoAction(
            destination
        );


    };







    card.appendChild(title);


    card.appendChild(button);



    videoPanel.appendChild(card);



}









// =========================
// REMOVE CARD
// =========================


function removeCard(destination){



    const card =
    document.getElementById(
        "card-"+destination.id
    );



    if(card){

        card.remove();

    }


}









// =========================
// BUTTON TEXT
// =========================


function updateButtonText(
button,
destination
){



    if(
        destination.finished
    ){


        button.innerHTML =
        "↻ Restart Video";


    }


    else if(
        destination.started
    ){


        button.innerHTML =
        "▶ Resume Video";


    }


    else{


        button.innerHTML =
        "▶ Play Video";


    }



}









// =========================
// SAVE VIDEO POSITION
// =========================


function saveVideoTime(destination){



    if(
        !destination.video.paused
    ){


        destination.time =
        destination.video.currentTime;


        destination.video.pause();


        destination.playing=false;


    }



}

// =========================
// VIDEO ACTION
// =========================


async function videoAction(destination){



const video =
destination.video;



const plane =
destination.plane;




console.log(
"VIDEO ACTION:",
destination.id
);






// FIRST PLAY

if(
!destination.started
){


video.currentTime = 0;


destination.started=true;


}






// RESTART AFTER FINISH

else if(
destination.finished
){


video.currentTime=0;


destination.finished=false;


destination.started=true;


}






// RESUME

else{


video.currentTime =
destination.time;


}






// SHOW AR VIDEO


plane.setAttribute(
"visible",
true
);





// hide other videos

destinations.forEach(
(item)=>{


if(
item.id !== destination.id
){


item.video.pause();


item.plane.setAttribute(
"visible",
false
);


}



});






try{


await video.play();



destination.playing=true;



removeCard(destination);



}


catch(error){


console.log(
"PLAY ERROR:",
error
);


}



}









// =========================
// SAVE TIME WHILE PLAYING
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
"FINISHED:",
destination.id
);



destination.finished=true;


destination.playing=false;


destination.time=0;



destination.plane.setAttribute(
"visible",
false
);





if(
destination.visible
){


createCard(destination);


}



});


});








// =========================
// CAMERA LOST WHILE PLAYING
// =========================


destinations.forEach(
(destination)=>{


destination.target.addEventListener(
"targetLost",
()=>{


if(
destination.playing
){


destination.time =
destination.video.currentTime;


destination.video.pause();


destination.playing=false;



}



});



});