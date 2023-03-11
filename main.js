song = "";
objects = [];
status = "";

function preload()
{
    song = loadSound("alarm.mp3");
}

function setup()
{
canvas = createCanvas(380, 380);
canvas.center();
video = createCapture(VIDEO);
video.size(380, 380);
video.hide();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objecets";
}


function draw()
{
    image (video,0 ,0 ,380, 380);
    
    if(status !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
     for (i = 0; i < object.length; i++)
     {
        document.getElementById("status").innerHTML = " Status : Object Detected";

        fill(r, g, b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r, g, b);
        Reflect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(object[i].label == "person")
        {
            document.getElementById("number_of_objects").innerHTML = "baby found : " ;
            console.log("stop");
            song.stop();
        }
        else
        {
            document.getElementById("number_of_objects").innerHTML = "BAbY nOT FoUnD : " ;
            console.log("play");
            song.play();
        }
    }
    }
   
}

function modelLoaded()
{
    console.log("Model Loaded!l!")
    status = true;
}

function gotResult(error, results)
{
    if (error) 
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}