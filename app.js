// =====================================================
// ELEMENTS
// =====================================================

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const guide = document.getElementById("guide");

const modal = document.getElementById("trackingModal");
const continueBtn = document.getElementById("continueBtn");
const closeBtn = document.getElementById("closeBtn");

const replayCard = document.getElementById("replayCard");
const replayBtn = document.getElementById("replayBtn");

// =====================================================
// VIDEOS
// =====================================================

const videos = [
  document.getElementById("video0"),
  document.getElementById("video1"),
  document.getElementById("video2"),
  document.getElementById("video3"),
];

// =====================================================
// TARGETS
// =====================================================

const targets = [
  document.getElementById("target0"),
  document.getElementById("target1"),
  document.getElementById("target2"),
  document.getElementById("target3"),
];

// =====================================================
// VIDEO PLANES
// =====================================================

const planes = [
  document.getElementById("plane0"),
  document.getElementById("plane1"),
  document.getElementById("plane2"),
  document.getElementById("plane3"),
];

// =====================================================
// VARIABLES
// =====================================================

let started = false;

let currentVideo = null;
let currentPlane = null;
let currentTarget = null;

let lostTimer = null;
let targetLost = false;

// =====================================================
// MOBILE CHECK
// =====================================================

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

window.addEventListener("load", () => {
  if (!isMobile()) {
    const warning = document.getElementById("desktop-warning");

    warning.style.display = "flex";

    document.querySelector("a-scene").style.display = "none";
  }
});

// =====================================================
// START EXPERIENCE
// =====================================================

startBtn.addEventListener("click", async () => {
  started = true;

  startScreen.style.opacity = "0";

  setTimeout(() => {
    startScreen.style.display = "none";

    guide.style.display = "block";
  }, 500);

  // Unlock all videos for iOS

  try {
    for (const video of videos) {
      video.muted = false;

      await video.play();

      video.pause();

      video.currentTime = 0;
    }
  } catch (err) {
    console.log(err);
  }
});

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function pauseAllVideos() {
  videos.forEach((video) => {
    video.pause();
  });
}

function hideAllPlanes() {
  planes.forEach((plane) => {
    plane.setAttribute("visible", false);
  });
}

function resetAllVideos() {
  videos.forEach((video) => {
    video.pause();

    video.currentTime = 0;
  });
}

// =====================================================
// TARGET FOUND
// =====================================================

targets.forEach((target, index) => {
  target.addEventListener("targetFound", async () => {
    if (!started) return;

    console.log("TARGET FOUND:", index);

    targetLost = false;

    if (lostTimer) {
      clearTimeout(lostTimer);

      lostTimer = null;
    }

    // Hide guide

    guide.style.display = "none";

    // Hide tracking modal

    modal.style.display = "none";

    // If another target was active

    if (currentVideo && currentVideo !== videos[index]) {
      currentVideo.pause();
    }

    // Hide previous planes

    hideAllPlanes();

    // Set active target

    currentTarget = target;

    currentVideo = videos[index];

    currentPlane = planes[index];

    // Show current AR plane

    currentPlane.setAttribute("visible", true);

    try {
      await currentVideo.play();
    } catch (error) {
      console.log("Video play error:", error);
    }
  });
});

// =====================================================
// TARGET LOST
// =====================================================

targets.forEach((target, index) => {
  target.addEventListener("targetLost", () => {
    if (!started) return;

    console.log("TARGET LOST:", index);

    targetLost = true;

    lostTimer = setTimeout(() => {
      if (targetLost) {
        if (currentVideo) {
          currentVideo.pause();
        }

        modal.style.display = "flex";
      }
    }, 5000);
  });
});

// =====================================================
// CONTINUE WATCHING
// =====================================================

continueBtn.addEventListener("click", async () => {
  modal.style.display = "none";

  targetLost = false;

  if (currentVideo) {
    try {
      await currentVideo.play();
    } catch (error) {
      console.log(error);
    }
  }
});

// =====================================================
// CLOSE VIDEO
// =====================================================

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";

  targetLost = false;

  if (currentVideo) {
    currentVideo.pause();

    currentVideo.currentTime = 0;
  }

  hideAllPlanes();

  currentVideo = null;

  currentPlane = null;

  currentTarget = null;
});

// =====================================================
// VIDEO FINISHED
// =====================================================

videos.forEach((video) => {
  video.addEventListener("ended", () => {
    replayCard.style.display = "block";
  });
});

// =====================================================
// REPLAY VIDEO
// =====================================================

replayBtn.addEventListener("click", async () => {
  replayCard.style.display = "none";

  if (!currentVideo) return;

  currentVideo.currentTime = 0;

  try {
    await currentVideo.play();
  } catch (error) {
    console.log(error);
  }
});

// =====================================================
// SAFETY CLEANUP
// =====================================================

window.addEventListener("beforeunload", () => {
  resetAllVideos();
});
