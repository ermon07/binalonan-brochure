const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

const guide = document.getElementById("guide");

const video = document.getElementById("video");
const target = document.getElementById("target");
const videoPlane = document.getElementById("videoPlane");

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

    if (!started) return;

    guide.style.display = "none";

    videoPlane.setAttribute("visible", true);

    // Fade in
    videoPlane.setAttribute("animation__scale", {
        property: "scale",
        from: "0.7 0.7 0.7",
        to: "1 1 1",
        dur: 350,
        easing: "easeOutBack"
    });

    videoPlane.setAttribute("animation__opacity", {
        property: "material.opacity",
        from: 0,
        to: 1,
        dur: 300
    });

    try {

        video.currentTime = 0;

        await video.play();

    } catch (e) {

        console.log(e);

    }

});

// =========================
// Target Lost
// =========================

target.addEventListener("targetLost", () => {

    if (!started) return;

    guide.style.display = "block";

    video.pause();

    video.currentTime = 0;

    videoPlane.setAttribute("visible", false);

});