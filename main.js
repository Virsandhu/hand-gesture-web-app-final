https://teachablemachine.withgoogle.com/models/P5W-l4t4l/
prediction_1=""
prediction_2=""

Webcam.set({
height:300,
width:350,
img_format:'png',
png_quality:90
});
camera= document.getElementById("#camera");
Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("results").innerHTML= '<img id="captured_img"src="'+data_uri+'"/>'
    });}
console.log("ml5 version",ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/P5W-l4t4l/model.json',modelLoaded)

function modelLoaded(){
    console.log("Model is ready");
}

function speak(){
   var synth= window.speechSynthesis;
   speak_data_1= "The first prediction is "+prediction_1;
   speak_data_2= "And The Second prediction is "+prediction_2;
   var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
   synth.speak(utterThis);
}

function check(){
    img= document.getElementById("captured_img");
    classifier.classify(img,got_results)
}

function got_results(error,results){
    if (error){
console.error
    } else {
        console.log(results);

        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;

        prediction_1= results[0].label;
        prediction_2= results[1].label;
        speak();

        if (results[0].label == "victory"){
            document.getElementById("emotion_emoji").innerHTML="&#9996";
        }
        if (results[0].label == "amazing"){
            document.getElementById("emotion_emoji").innerHTML="&#128076";
        }
        if (results[0].label == "best"){
            document.getElementById("emotion_emoji").innerHTML="&#128077";
        }




        if (results[1].label == "victory"){
            document.getElementById("emotion_emoji2").innerHTML="&#9996";
        }
        if (results[1].label == "amazing"){
            document.getElementById("emotion_emoji2").innerHTML="&#128076";
        }
        if (results[1].label == "best"){
            document.getElementById("emotion_emoji2").innerHTML="&#128077";
        }

    }
}