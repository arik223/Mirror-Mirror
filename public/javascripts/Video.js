 var img;
 var filterName;
 var dayOrNight;
 var mp4;
 var starsDone = false;

 var alpha = 0,   /// current alpha value
 delta = 0.1;

var filterList =[{
    "filterName": "aura",
    "source":"images/particle_fountain.mp4"  
    },{
    "filterName": "aura",
    "source":"images/blueaura.mp4"  
    },{
    "filterName": "aura",
    "source":"images/redaura.mp4"   
    },{
    "filterName": "aura",
    "source":"images/greenaura.mp4"
    },{
    "filterName": "halo",
    "source":"images/halo.png"       
    },{
    "filterName": "Slime",
    "source":"images/goo.mp4"  
}]

function startDifTrack(){
   // draw();
    var video = document.querySelector("#video");  
  
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
  
    if (navigator.getUserMedia) {       
          navigator.getUserMedia({video: true, audio: true}, handleVideo, videoError);
    }
  
    function handleVideo(stream) {
          video.src = window.URL.createObjectURL(stream);
    }
  
    function videoError(e) {
          alert("There was an error with your video")
    }
    var commands = {
        'switch': function() {
            print("switching")
            var rand = filterList[Math.floor(Math.random() * filterList.length)];
            if(rand.filterName == "halo"){
                img.src = rand.source;
                filterName = rand.filterName;
            } else {
                mp4.src = rand.source;
                filterName = rand.filterName;
            }
        }
        
    };
    annyang.addCommands(commands);
    annyang.start();
    bye();
   // draw();
    use2DCanvas();
  }

  
function use2DCanvas(){
    var videoInput = document.getElementById('video');
    var ctracker = new clm.tracker();
    ctracker.init();
    ctracker.start(videoInput);
   
    var canvasInput = document.getElementById('canvas');
    var cc = canvasInput.getContext('2d');

    var canvasInputbg = document.getElementById('canvasbg');
    var ccbg = canvasInputbg.getContext('2d');
    
    img = document.createElement("img");

    filterName = "Slime";
    img.src = 'images/halo.png';

    mp4 = document.createElement("video");
    mp4.src = "images/goo.mp4";
    mp4.addEventListener('loadeddata', function() {
        mp4.play();  // start playing
    });

   //filterName = "Morn";

    //cc.globalAlpha = .5;
    function drawLoop(){
        requestAnimationFrame(drawLoop);
        //Gets positions
        var positions = ctracker.getCurrentPosition();
        if (filterName == "3dGoggles") {
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            //Gets the slope for rotation
            var slope = (positions[19][1] - positions[15][1]) / (positions[19][0] - positions[15][0]);
            var sizeOfGlassesX = hypot(positions[0], positions[14]);
            var sizeOfGlassesY = hypot(positions[29], positions[31]) * 5;
            cc.save(); 
            cc.translate(positions[33][0], positions[33][1]); 
            cc.rotate(Math.atan(slope)); 
            cc.drawImage(img, -sizeOfGlassesX/2, -sizeOfGlassesY/3, sizeOfGlassesX, sizeOfGlassesY);
            cc.restore(); 
            console.log(positions[23][0])
        } else if (filterName == "christmasHat") {
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            var slope = (positions[20][1] - positions[16][1]) / (positions[20][0] - positions[16][0]);
            var sizeOfGlassesX = hypot(positions[0], positions[14]) * 1.5;
            var sizeOfGlassesY = hypot(positions[7], positions[33]) * 1.5;
            cc.save(); 
            cc.translate(positions[33][0], positions[33][1]);
            cc.rotate(Math.atan(slope));
            cc.drawImage(img, -sizeOfGlassesX/2.3, -sizeOfGlassesY*1.05, sizeOfGlassesX, sizeOfGlassesY)
            //cc.drawImage(img, -img.width/5, -img.height/2, sizeOfGlassesX, 50);
            cc.restore(); 
        } else if (filterName == "DogFace"){
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            var slope = (positions[20][1] - positions[16][1]) / (positions[20][0] - positions[16][0]);
            var sizeOfGlassesX = hypot(positions[0], positions[14])
           // var a = (positions[14][0] - positions[0][0]) ;
            var sizeOfGlassesY = hypot(positions[17], positions[57]) * 3.5
            //var b = (positions[57][1] - positions[17][1]) * 3.5;
            cc.save(); 
            cc.translate(positions[57][0], positions[57][1]);
            cc.rotate(Math.atan(slope));
            cc.drawImage(img, -sizeOfGlassesX/1.9, -sizeOfGlassesY/1.525, sizeOfGlassesX, sizeOfGlassesY)
            //cc.drawImage(img, -img.width/5, -img.height/2, sizeOfGlassesX, 50);
            cc.restore(); 
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
        } else if (filterName == "Turtle"){
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            var slope = (positions[20][1] - positions[16][1]) / (positions[20][0] - positions[16][0]);
            var sizeOfGlassesX = hypot(positions[0], positions[14]) * 1.55;
           // var a = (positions[14][0] - positions[0][0]) ;
            var sizeOfGlassesY = hypot(positions[7], positions[33]) * 1.5;
            //var b = (positions[57][1] - positions[17][1]) * 3.5;
            cc.save(); 
            cc.translate(positions[62][0], positions[62][1]);
            cc.rotate(Math.atan(slope));
            cc.drawImage(img, -sizeOfGlassesX/1.95, -sizeOfGlassesY, sizeOfGlassesX, sizeOfGlassesY)
            //cc.drawImage(img, -img.width/5, -img.height/2, sizeOfGlassesX, 50);
            cc.restore(); 
        } else if (filterName == "Sponge"){
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            var slope = (positions[20][1] - positions[16][1]) / (positions[20][0] - positions[16][0]);
            var sizeOfGlassesX = hypot(positions[0], positions[14]) * 1.4;
           // var a = (positions[14][0] - positions[0][0]) ;
            var sizeOfGlassesY = hypot(positions[7], positions[33]) * 1.5;
            //var b = (positions[57][1] - positions[17][1]) * 3.5;
            cc.save(); 
            cc.translate(positions[62][0], positions[62][1]);
            cc.rotate(Math.atan(slope));
            cc.drawImage(img, -sizeOfGlassesX/2.1, -sizeOfGlassesY/1.15, sizeOfGlassesX, sizeOfGlassesY)
            //cc.drawImage(img, -img.width/5, -img.height/2, sizeOfGlassesX, 50);
            cc.restore(); 
        } else if (filterName == "Patrick"){
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            var slope = (positions[20][1] - positions[16][1]) / (positions[20][0] - positions[16][0]);
            var sizeOfGlassesX = Math.hypot(positions[0][0]-positions[14][0], positions[0][1]-positions[14][1]) * 1.4;
           // var a = (positions[14][0] - positions[0][0]) ;
            var sizeOfGlassesY = Math.hypot(positions[7][0]-positions[33][0], positions[7][1]-positions[33][1])*1.65;
            //var b = (positions[57][1] - positions[17][1]) * 3.5;
            cc.save(); 
            cc.translate(positions[62][0], positions[62][1]);
            cc.rotate(Math.atan(slope) + 0.05);
            cc.drawImage(img, -sizeOfGlassesX/2, -sizeOfGlassesY/1.15, sizeOfGlassesX, sizeOfGlassesY)
            //cc.drawImage(img, -img.width/5, -img.height/2, sizeOfGlassesX, 50);
            cc.restore(); 
        } else if (filterName == "halo"){
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            var slope = (positions[20][1] - positions[16][1]) / (positions[20][0] - positions[16][0]);
            var sizeOfGlassesX = hypot(positions[0], positions[14]) * 1.5;
            var sizeOfGlassesY = hypot(positions[41], positions[33]) * 1.5;
            cc.save(); 
            cc.translate(positions[33][0], positions[33][1]);
            cc.rotate(Math.atan(slope));
            cc.drawImage(img, -sizeOfGlassesX/2, -sizeOfGlassesY*3.5, sizeOfGlassesX, sizeOfGlassesY)
            //cc.drawImage(img, -img.width/5, -img.height/2, sizeOfGlassesX, 50);
            cc.restore(); 
        } else if (filterName == "Slime"){
            console.log((positions[60][1] - positions[57][1]))
            if((positions[60][1] - positions[57][1]) < -15){
                if(mp4.ended){
                    mp4.play();
                }
                runSlimeAnimation(positions);
            }
        } else if (filterName == "aura"){
            console.log((positions[60][1] - positions[57][1]))
            if((positions[60][1] - positions[57][1]) < -25){
                console.log("Playing aura")
                if(mp4.ended){
                    mp4.play();
                }
                runSlimeAnimation(positions);
            }
        }
    }
    function runSlimeAnimation(positions){
            requestAnimationFrame(runSlimeAnimation);
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            cc.drawImage(mp4,0,-50,canvasInput.width, canvasInput.height);
    }
        //This draws the green dots of the face
       // ctracker.draw(canvasInput);

    drawLoop();
}
    
function findAngle(positions){
    var angleRadians = Math.atan2(positions[15][1] - positions[19][1], positions[15][0] - positions[19][0]);
    return angleRadians;
}
function hypot(p1, p2){
    var hypot = Math.hypot(p1[0]-p2[0], p1[1]-p2[1]);
    return hypot;
}
function bye(){
    $('#video').hide();
}
