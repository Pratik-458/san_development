export var speechData;

document.addEventListener("DOMContentLoaded", () => {
  if ("webkitSpeechRecognition" in window) {
    let speechRecognition = new webkitSpeechRecognition();
  
    let final_transcript = "";
  
    speechRecognition.continuous = false;
    speechRecognition.lang = "en-AU";
  
    speechRecognition.onstart = () => {
        document.querySelector("#status").style.display = "block";
    };
    speechRecognition.onerror = () => {
        document.querySelector("#status").style.display = "none";
    };
    speechRecognition.onend = () => {
        document.querySelector("#status").style.display = "none";
    };
  
    speechRecognition.onresult = (event) => {
        let interim_transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        document.querySelector("#final").innerHTML = final_transcript;
        speechData = final_transcript;
        document.querySelector("#description").innerHTML = final_transcript;
    };

    document.querySelector("#start").onclick = () => {
        speechRecognition.start();
    };
  } else {
    console.log("Speech Recognition Not Available");
  }
});