// =========================
// ELEMENTS
// =========================

const startScreen = document.getElementById("start-screen");

const startBtn = document.getElementById("start-btn");

const guide = document.getElementById("guide");

const video = document.getElementById("video");

const target = document.getElementById("target");

const videoPlane = document.getElementById("videoPlane");

const modal = document.getElementById("trackingModal");

const continueBtn = document.getElementById("continueBtn");

const closeBtn = document.getElementById("closeBtn");

const replayCard = document.getElementById("replayCard");

const replayBtn = document.getElementById("replayBtn");

// =========================
// VARIABLES
// =========================

let started = false;

let lostTimer = null;

let targetLost = false;

// =========================
// MOBILE CHECK
// =========================

function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

window.addEventListener("load", () => {
    if (!isMobile()) {
        const warning = document.getElementById("desktop-warning");

        if (warning) {
            warning.style.display = "flex";
        }

        const scene = document.querySelector("a-scene");

        if (scene) {
            scene.style.display = "none";
        }
    }
});

// =========================
// START EXPERIENCE
// =========================

startBtn.addEventListener("click", async () => {
    started = true;

    startScreen.style.opacity = "0";

    setTimeout(() => {
        startScreen.style.display = "none";

        guide.style.display = "block";
    }, 500);

    // unlock video permission

    try {
        video.muted = false;

        await video.play();

        video.pause();

        video.currentTime = 0;
    } catch (error) {
        console.log(error);
    }
});

// =========================
// TARGET FOUND
// =========================

target.addEventListener("targetFound", async () => {
    if (!started) return;

    console.log("TARGET FOUND");

    targetLost = false;

    if (lostTimer) {
        clearTimeout(lostTimer);

        lostTimer = null;
    }

    modal.style.display = "none";

    guide.style.display = "none";

    // Show video plane

    videoPlane.setAttribute("visible", true);

    // Resume video

    if (video.paused) {
        try {
            await video.play();
        } catch (error) {
            console.log(error);
        }
    }
});

// =========================
// TARGET LOST
// =========================

target.addEventListener("targetLost", () => {
    if (!started) return;

    console.log("TARGET LOST");

    targetLost = true;

    lostTimer = setTimeout(() => {
        if (targetLost) {
            video.pause();

            modal.style.display = "flex";
        }
    }, 5000);
});

// =========================
// CONTINUE WATCHING
// =========================

continueBtn.addEventListener("click", async () => {
    modal.style.display = "none";

    try {
        await video.play();
    } catch (error) {
        console.log(error);
    }
});

// =========================
// CLOSE
// =========================

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";

    video.pause();

    video.currentTime = 0;

    videoPlane.setAttribute("visible", false);
});

// =========================
// VIDEO FINISHED
// =========================

video.addEventListener("ended", () => {
    replayCard.style.display = "block";
});

// =========================
// REPLAY
// =========================

replayBtn.addEventListener("click", async () => {
    replayCard.style.display = "none";

    video.currentTime = 0;

    try {
        await video.play();
    } catch (error) {
        console.log(error);
    }
});
