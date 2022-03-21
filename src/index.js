const video = document.getElementById("myvideo"),
  canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton"),
  updateNote = document.getElementById("updatenote"),
  statutColor = document.querySelector("aside div");

let isVideo = false,
  model = null;

const modelParams = {
  flipHorizontal: true,
  maxNumBoxes: 20,
  iouThreshold: 0.5,
  scoreThreshold: 0.6,
};

const startVideo = () => {
  handTrack.startVideo(video).then(function (status) {
    if (status) {
      updateNote.innerText = "Video started. Now tracking"
      statutColor.style.backgroundColor = "green"
      isVideo = true
      runDetection()
    } else updateNote.innerText = "Please enable video"
  });
};

const toggleVideo = () => {
  if (!isVideo) {
    updateNote.innerText = "Starting video"
    statutColor.style.backgroundColor = "yellow"
    startVideo()
  } else {
    updateNote.innerText = "Stopping video"
    handTrack.stopVideo(video)
    isVideo = false
    updateNote.innerText = "Video stopped"
    statutColor.style.backgroundColor = "red"
  }
};

const runDetection = () => {
  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, canvas, context, video)
    if (isVideo) requestAnimationFrame(runDetection)
  });
};

window.addEventListener("load", () => {
  handTrack.load(modelParams).then((lmodel) => {
    model = lmodel
    updateNote.innerText = "Loaded Model!"
    statutColor.style.backgroundColor = "yellow"
  });
});
