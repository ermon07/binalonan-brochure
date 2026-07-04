const target = document.querySelector("#target");
const video = document.querySelector("#promo");
const videoPlane = document.querySelector("#videoPlane");
const loading = document.querySelector("#loading");

target.addEventListener("targetFound", async () => {

    console.log("Target Found");

    loading.style.display = "none";

    videoPlane.setAttribute("visible", true);

    try{
        await video.play();
    }catch(err){
        console.log(err);
    }

});

target.addEventListener("targetLost", () => {

    console.log("Target Lost");

    loading.style.display = "block";

    video.pause();
    video.currentTime = 0;

    videoPlane.setAttribute("visible", false);

});