const video = document.getElementById("myvideo"),
  canvas = document.getElementById("canvas"),
  context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton"),
  updateNote = document.getElementById("updatenote"),
  statutColor = document.querySelector('aside div')

let isVideo = false;
let model = null;

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
};

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    if (status) {
      updateNote.innerText = "Video started. Now tracking";
      statutColor.style.backgroundColor = 'green';
      isVideo = true;
      runDetection();
    } else {
      updateNote.innerText = "Please enable video";
    }
  });
}

const toggleVideo = () => {
  if (!isVideo) {
    updateNote.innerText = "Starting video";
    statutColor.style.backgroundColor = 'yellow';
    startVideo();
  } else {
    updateNote.innerText = "Stopping video";
    handTrack.stopVideo(video);
    isVideo = false;
    updateNote.innerText = "Video stopped";
    statutColor.style.backgroundColor = 'red';
  }
};

function runDetection() {
  model.detect(video).then((predictions) => {
    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
  updateNote.innerText = "Loaded Model!";
  trackButton.disabled = false;
  statutColor.style.backgroundColor = 'yellow';
});
