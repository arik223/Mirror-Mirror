 var img;
 var filterName;
 var dayOrNight;
 var starsDone = false;

 var alpha = 0,   /// current alpha value
 delta = 0.1;

var filterList =[{
    "filterName": "christmasHat",
    "source":"images/christmasHat.png"
    },{
    "filterName": "3dGoggles",
    "source":"images/glasses2.png"
    },{
    "filterName": "DogFace",
    "source":"images/dog.png"  
    },{
    "filterName": "Turtle",
    "source":"images/Turtle.png"  
    },{
    "filterName": "Sponge",
    "source":"images/sponge.png"   
    },{
    "filterName": "Patrick",
    "source":"images/patrick.png"
    },{
    "filterName": "halo",
    "source":"images/halo.png"       
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
        'hi': function() {
            print("switching")
            var rand = filterList[Math.floor(Math.random() * filterList.length)];
            img.src = rand.source;
            filterName = rand.filterName;
        }
        
    };
    annyang.addCommands(commands);
    annyang.start();
    //bye();
   // draw();
    use2DCanvas();
  }

  
function use2DCanvas(){
    var videoInput = document.getElementById('video');
    var ctracker = new clm.tracker();
    ctracker.init();
    ctracker.start(videoInput);
    var video;
   
    var canvasInput = document.getElementById('canvas');
    var cc = canvasInput.getContext('2d');

    var canvasInputbg = document.getElementById('canvasbg');
    var ccbg = canvasInputbg.getContext('2d');
    
    img = document.createElement("img");

    img.src = "images/halo.png"
    filterName = "Slime"    

    var video = document.createElement("video");
    video.src = "images/goo.mp4";
    video.addEventListener('loadeddata', function() {
        video.play();  // start playing
        update(); //Start rendering
    });

   //filterName = "Morn";

cc.globalAlpha = .5;
    function drawLoop(){
        requestAnimationFrame(drawLoop);
        //Gets positions
        var positions = ctracker.getCurrentPosition();
        if (positions){
            dayOrNight = "Morn"
        } else {
            dayOrNight = "nightSky"
        }
        if (dayOrNight == "nightSky1"){
            if(!starsDone){
                ccbg.clearRect(0, 0, canvasInputbg.width, canvasInputbg.height);
                $('#canvasbg').css('background', 'linear-gradient(rgba(0,17,30,.5) 30%, rgba(3,61,94,.5))');
                var xMax = canvasInputbg.width = window.screen.availWidth;
                var yMax = canvasInputbg.height = window.screen.availHeight;
                var hmTimes = Math.round(xMax + yMax);	    
                for(var i=0; i<=hmTimes; i++) {
                    var randomX = Math.floor((Math.random()*xMax)+1);
                    var randomY = Math.floor((Math.random()*yMax)+1);
                    var randomSize = Math.floor((Math.random()*2)+1);
                    var randomOpacityOne = Math.floor((Math.random()*9)+1);
                    var randomOpacityTwo = Math.floor((Math.random()*9)+1);
                    var randomHue = Math.floor((Math.random()*360)+1);
                    if(randomSize>1) {
                    ccbg.shadowBlur = Math.floor((Math.random()*15)+5);
                    ccbg.shadowColor = "white";
                    }
                    ccbg.fillStyle = "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")";
                    ccbg.fillRect(randomX, randomY, randomSize, randomSize);
                }
                starsDone = true;
            } 
        } else if (dayOrNight == "Morn1"){
            starsDone = false;   
            ccbg.clearRect(0, 0, canvasInputbg.width, canvasInputbg.height);
            $('#canvasbg').css('background', 'linear-gradient(rgba(237, 235, 154,.5), rgba(142, 230, 242,.5))');
            ccbg.globalCompositeOperation = 'destination-out';
            ccbg.fillStyle = 'rgba(0, 0, 0, .1)';
            ccbg.fillRect( 0, 0, canvasInputbg.width, canvasInputbg.height );
            ccbg.globalCompositeOperation = 'lighter';
            
            /* Sun */
            ccbg.beginPath();
            ccbg.arc( 100 + Math.random(), 75 + Math.random() , 50 + Math.random() * 5, 0, Math.PI * 2);
            ccbg.fillStyle = 'rgba(255, 249, 21, 0.8)';
            ccbg.fill();
        }
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
            cc.drawImage(img, -sizeOfGlassesX/2, -sizeOfGlassesY*5.5, sizeOfGlassesX, sizeOfGlassesY)
            //cc.drawImage(img, -img.width/5, -img.height/2, sizeOfGlassesX, 50);
            cc.restore(); 
        } else if (filterName == "Slime"){
            if(video.ended){
                video.play();
            }
            cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
            cc.drawImage(video,0,0,canvasInput.width, canvasInput.height);
        }
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
