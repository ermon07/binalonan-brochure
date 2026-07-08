const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

const guide = document.getElementById("guide");

const video = document.getElementById("video");
const target = document.getElementById("target");
const videoPlane = document.getElementById("videoPlane");

let trackingTimeout = null;
let trackingLost = false;

let started = false;

// =========================
// DESKTOP WARNING
// =========================

function isMobileDevice(){

    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

}

window.addEventListener("load", () => {

    if(!isMobileDevice()){

        document.getElementById("desktop-warning").style.display = "flex";

        document.querySelector("a-scene").style.display = "none";

    }

});

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

    // Tracking returned
    trackingLost = false;

    // Cancel the timeout
    if (trackingTimeout) {
        clearTimeout(trackingTimeout);
        trackingTimeout = null;
    }

    // Hide modal if it was shown
    modal.style.display = "none";

    // Hide scan guide
    guide.style.display = "none";

    // Resume only if paused
    if (video.paused) {
        try {
            await video.play();
        } catch (e) {
            console.log(e);
        }
    }

});

// =========================
// Target Lost
// =========================

target.addEventListener("targetLost", () => {

    trackingLost = true;

    // Give the tracker 5 seconds to recover
    trackingTimeout = setTimeout(() => {

        if (trackingLost) {

            video.pause();

            modal.style.display = "flex";

        }

    }, 5000);

});

// =========================
// Continue Button
// =========================


continueBtn.addEventListener("click", async () => {

    modal.style.display = "none";

    try {

        await video.play();

    } catch (e) {

        console.log(e);

    }

});

// =========================
// Close Button
// =========================

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

    video.pause();

    video.currentTime = 0;

});