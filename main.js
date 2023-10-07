aSong = "";
fatRat = "";
staus = "";
leftWristScore = 0;
xleft = 0;
xright = 0;
yleft = 0;
yright = 0;

function preload()  
{ 
    aSong = loadSound("Joe Valeriano - A Song.mp3");
    fatRat = loadSound("The Fat Rat - Monody.mp3");
}

function setup()  
{ 
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    postNet = ml5.poseNet(video, modelLoaded);
    postNet.on('pose', gotposes);
}

function modelLoaded() 
{ 
    console.log("Model has loaded");
}

function gotposes(results) 
{ 
    if(results>0){
        xleft = results[0].pose.leftWrist.x;
        yleft = results[0].pose.leftWrist.y;
        xright = results[0].pose.rightWrist.x;
        yright = results[0].pose.rightWrist.y;
        leftWristScore = results.keypoints[9].score;
    }
}

function draw()  
{ 
    image(video, 0, 0, 500, 500);
    stroke(0, 0, 0);
    fill(23, 45, 67);

    songStatus = aSong.isPlaying();

    if(leftWristScore > 0.2)
    { 
        circle(xleft, yleft, 20);
        fatRat.stop();
    }
    if(songStatus == false){
        fatRat.play();
        document.getElementById("songShown").innerHTML = "FatRat";
    }
}