const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

const guide = document.getElementById("guide");

const video = document.getElementById("video");
const target = document.getElementById("target");
const videoPlane = document.getElementById("videoPlane");

const modal = document.getElementById("trackingModal");
const continueBtn = document.getElementById("continueBtn");
const closeBtn = document.getElementById("closeBtn");

let lostTimer = null;

let started = false;

// =========================
// Start Experience
// =========================

startBtn.addEventListener("click", async () => {

    // Unlock audio
    video.muted = false;

    try {
        await video.play();
        video.pause();
        video.currentTime = 0;
    } catch (e) {
        console.log(e);
    }

    startScreen.style.opacity = "0";
    startScreen.style.transition = "0.5s ease";

    setTimeout(() => {

        startScreen.style.display = "none";

        guide.style.display = "block";

        started = true;

    }, 500);

});

// =========================
// Target Found
// =========================

target.addEventListener("targetFound", async () => {

    if(lostTimer){

        clearTimeout(lostTimer);

        lostTimer = null;

    }

    modal.style.display="none";

    videoPlane.setAttribute("visible",true);

    await video.play();

});

// =========================
// Target Lost
// =========================

target.addEventListener("targetLost", () => {

    lostTimer = setTimeout(() => {

        modal.style.display = "flex";

    },3000);

});

// =========================
// CONTINUE BUTTON
// =========================

continueBtn.addEventListener("click",async()=>{

    modal.style.display="none";

    if(video.paused){

        await video.play();

    }

    if(video.requestFullscreen){

        video.requestFullscreen();

    }
    else if(video.webkitEnterFullscreen){

        video.webkitEnterFullscreen();

    }

});

// =========================
// CLOSE BUTTON
// =========================

closeBtn.addEventListener("click",()=>{

    modal.style.display="none";

    video.pause();

    video.currentTime=0;

});