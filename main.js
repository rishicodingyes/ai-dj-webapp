song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist=0;
scoreRightWrist=0;
song1status="";
song2status="";


function preload(){
    song1= loadSound("song1.mp3");;
    song2 =loadSound("song2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('Posenet is working!');
}

function draw(){
    image(video, 0, 0, 600, 900);
    fill("red")
    stroke("red")
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();


    if(scoreLeftWrist > 0.2)
{
circle(leftWristX,leftWristY,20);
song2.stop();
if(song1status == false)
{
    song1.play();
    document.getElementById("song_name").innerHTML=" Playing Bad Habit"
}
}
if(scoreRightWrist > 0.2)
{
circle(rightWristX,rightWristY,20);
song1.stop();
if(song2status == false)
{
    song2.play();
    document.getElementById("song_name").innerHTML=" Playing Bound 2"
}
}
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist= results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log("leftWristX =" + leftWristX +"leftWristY =" + leftWristY);

        rightWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.leftWrist.y;
        console.log("rightWristX =" + rightWristX +"rightWristY =" + rightWristY);
    }
}

function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}