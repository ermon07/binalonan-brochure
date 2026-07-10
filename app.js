// =====================================================
// ELEMENTS
// =====================================================

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

const guide = document.getElementById("guide");


// Control Card

const controlCard = document.getElementById("controlCard");

const destinationTitle = document.getElementById(
    "destinationTitle"
);

const destinationStatus = document.getElementById(
    "destinationStatus"
);


const playBtn = document.getElementById(
    "playBtn"
);

const resumeBtn = document.getElementById(
    "resumeBtn"
);

const restartBtn = document.getElementById(
    "restartBtn"
);

const closeBtn = document.getElementById(
    "closeBtn"
);



// =====================================================
// VIDEOS
// =====================================================

const videos = [

    document.getElementById("video0"),

    document.getElementById("video1"),

    document.getElementById("video2"),

    document.getElementById("video3")

];


// =====================================================
// TARGETS
// =====================================================

const targets = [

    document.getElementById("target0"),

    document.getElementById("target1"),

    document.getElementById("target2"),

    document.getElementById("target3")

];


// =====================================================
// PLANES
// =====================================================

const planes = [

    document.getElementById("plane0"),

    document.getElementById("plane1"),

    document.getElementById("plane2"),

    document.getElementById("plane3")

];



// =====================================================
// DESTINATION DATA
// =====================================================


const destinations = [

    {

        id:0,

        name:"Destination 1",

        target:targets[0],

        plane:planes[0],

        video:videos[0],


        started:false,

        completed:false,

        currentTime:0

    },


    {

        id:1,

        name:"Destination 2",

        target:targets[1],

        plane:planes[1],

        video:videos[1],


        started:false,

        completed:false,

        currentTime:0

    },


    {

        id:2,

        name:"Destination 3",

        target:targets[2],

        plane:planes[2],

        video:videos[2],


        started:false,

        completed:false,

        currentTime:0

    },


    {

        id:3,

        name:"Destination 4",

        target:targets[3],

        plane:planes[3],

        video:videos[3],


        started:false,

        completed:false,

        currentTime:0

    }

];



// =====================================================
// VARIABLES
// =====================================================


let started = false;


let activeDestination = null;


let detectedDestination = null;


let isPlaying = false;

// =====================================================
// HELPERS
// =====================================================


function hideAllPlanes(){

    planes.forEach(plane=>{

        plane.setAttribute(
            "visible",
            false
        );

    });

}



function pauseActiveVideo(){


    if(!activeDestination)
        return;



    const video =
        activeDestination.video;



    activeDestination.currentTime =
        video.currentTime;



    video.pause();



}



function showControls(destination){


    detectedDestination = destination;


    controlCard.style.display="block";


    destinationTitle.innerText =
        destination.name;



    if(
        destination.completed
    ){

        destinationStatus.innerText =
            "Video finished";


        playBtn.style.display="block";

        resumeBtn.style.display="none";

        restartBtn.style.display="none";


    }

    else if(
        destination.started
    ){

        destinationStatus.innerText =
            "Continue watching";


        playBtn.style.display="none";

        resumeBtn.style.display="block";

        restartBtn.style.display="block";


    }

    else{


        destinationStatus.innerText =
            "New experience";


        playBtn.style.display="block";

        resumeBtn.style.display="none";

        restartBtn.style.display="none";


    }


}



function hideControls(){


    controlCard.style.display="none";


}

// =====================================================
// TARGET FOUND
// =====================================================


targets.forEach((target,index)=>{


    target.addEventListener(
        "targetFound",
        ()=>{


            if(!started)
                return;



            console.log(
                "Target Found:",
                index
            );



            guide.style.display="none";



            const destination =
                destinations[index];



            // If another video is playing

            if(
                activeDestination &&
                activeDestination !== destination
            ){

                pauseActiveVideo();

                hideAllPlanes();

                isPlaying=false;

            }



            activeDestination =
                destination;



            showControls(
                destination
            );


        }

    );


});




// =====================================================
// PLAY BUTTON
// =====================================================


playBtn.addEventListener(
"click",
async()=>{


    if(!detectedDestination)
        return;



    const destination =
        detectedDestination;



    activeDestination =
        destination;



    destination.started=true;

    destination.completed=false;


    destination.video.currentTime=0;



    hideAllPlanes();



    destination.plane.setAttribute(
        "visible",
        true
    );



    hideControls();



    isPlaying=true;



    try{


        await destination.video.play();


    }
    catch(error){


        console.log(error);


    }



});




// =====================================================
// RESUME BUTTON
// =====================================================


resumeBtn.addEventListener(
"click",
async()=>{


    if(!detectedDestination)
        return;



    const destination =
        detectedDestination;



    activeDestination =
        destination;



    hideAllPlanes();



    destination.plane.setAttribute(
        "visible",
        true
    );



    destination.video.currentTime =
        destination.currentTime;



    hideControls();



    isPlaying=true;



    try{


        await destination.video.play();


    }
    catch(error){


        console.log(error);


    }


});




// =====================================================
// RESTART BUTTON
// =====================================================


restartBtn.addEventListener(
"click",
async()=>{


    if(!detectedDestination)
        return;



    const destination =
        detectedDestination;



    activeDestination =
        destination;



    destination.currentTime=0;

    destination.video.currentTime=0;



    destination.completed=false;

    destination.started=true;



    hideAllPlanes();



    destination.plane.setAttribute(
        "visible",
        true
    );



    hideControls();



    isPlaying=true;



    try{


        await destination.video.play();


    }
    catch(error){


        console.log(error);


    }


});

// =====================================================
// TARGET LOST
// =====================================================


targets.forEach((target,index)=>{


    target.addEventListener(
        "targetLost",
        ()=>{


            if(!started)
                return;



            console.log(
                "Target Lost:",
                index
            );



            if(
                activeDestination &&
                activeDestination.target === target
            ){

                pauseActiveVideo();


                hideAllPlanes();


                isPlaying=false;


            }


        }

    );


});




// =====================================================
// VIDEO FINISHED
// =====================================================


destinations.forEach(destination=>{


    destination.video.addEventListener(
        "ended",
        ()=>{


            console.log(
                "Finished:",
                destination.name
            );



            destination.completed=true;


            destination.currentTime=0;


            destination.started=true;



            isPlaying=false;



            hideAllPlanes();



            if(
                activeDestination === destination
            ){

                showControls(
                    destination
                );

            }


        }

    );


});




// =====================================================
// CLOSE BUTTON
// =====================================================


closeBtn.addEventListener(
"click",
()=>{


    if(activeDestination){


        pauseActiveVideo();


    }



    hideAllPlanes();



    hideControls();



    isPlaying=false;



});




// =====================================================
// START EXPERIENCE
// =====================================================


startBtn.addEventListener(
"click",
async()=>{


    started=true;



    startScreen.style.opacity="0";



    setTimeout(()=>{


        startScreen.style.display="none";


        guide.style.display="block";


    },500);



    // Unlock videos for mobile browsers


    try{


        for(
            const destination
            of destinations
        ){


            const video =
                destination.video;



            video.muted=false;



            await video.play();



            video.pause();



            video.currentTime=0;


        }


    }
    catch(error){


        console.log(error);


    }



});




// =====================================================
// MOBILE CHECK
// =====================================================


function isMobile(){


    return /Android|iPhone|iPad|iPod/i
    .test(
        navigator.userAgent
    );


}



window.addEventListener(
"load",
()=>{


    if(!isMobile()){


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




// =====================================================
// RESET ON PAGE EXIT
// =====================================================


window.addEventListener(
"beforeunload",
()=>{


    destinations.forEach(
        destination=>{


            destination.video.pause();


        }

    );


});