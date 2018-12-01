// word slection and initilization for but loss and win
function initialize() {
    while(true){
    var number=Math.floor(Math.random() * word_list.length);   
    word = word_list[number];
    console.log(available);
    if( available[number]!=0){
    for (var i = 0; i < word.length; i++) {
      
        letter.push("_");
        console.log(letter[i]);
    }
        available[number]=0;
        console.log(available[number]);
        console.log(available)
        break;
    }
}
    reset.style.opacity= 0;
    reset.disabled= true;
    document.getElementById("canvas").style.zIndex = "1";
    strt.style.opacity = 0;
    strt.disabled=true;
    spinner.style.opacity = 1;
    spinner.disabled=false;
    ins.textContent = "Guess the Word";
    endtext.textContent = "";
    statustext.textContent = letter;
    lifetext.textContent = life;
    guesses.textContent = choices;
    totalscore.textContent = score;
}
//checks if letters was used
function lettercheck(key) {
 
    var good = true;
    for (var k = 0; k < choices.length; k++) {
        if (key === choices[k]) {
            good = false;
        }
    }
    return good;
}
// checks the game status
function state(){
    
    var status = true
    for (var i = 0; i < letter.length; i++) {
        if (word.charAt(i) !== letter[i]) {
            status = false;
        }
      
    };
    return status;
}
// win or lose events
function end_events(result){
    letter = [];
    choices = [];
    reset.style.opacity= 1;
    reset.disabled=false;
    if(result===true){
        statustext.textContent =  word;
        ins.textContent = "Good Job go to the next one";
        endtext.textContent = "YOU WIN";
        reset.textContent="Next One"
    }
    else if(result===false){
        endtext.textContent = "YOU LOSE";
        statustext.textContent = "Word was "+ word;
        ins.textContent = "Nice try";
        reset.textContent="Try Again"
    }
};

// sets the availability array
function list_reset(){
    available=[]
for (var j=0; j< word_list.length;j++){
    available.push(1);
};
};

//global variable list
var word_list = ["cat", "dogs"];
var word; // the word that will be guessed
var letter = [];// blank array where the word will be stored
var life = 6; //how many lives reset on loss
var choices = []; //list guessed letters
var score = 0;// reset when loss
var highscre=0;
var available=[];// availability of a word
list_reset();

///WHEEL SECTION
var options = [100, 10, 25, 250, 30, 1000, 1, 200, 45, 500, 5, 20, 1, 1000000, 1, 350, 5, 99];

var startAngle = 0;
var arc = Math.PI * 2 / (options.length);// how many arcs
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var text = null;
var ctx;
var spun = null;



//html variables

var lifetext = document.getElementById("lives");
var statustext = document.getElementById("current-status");
var endtext = document.getElementById("end-text");
var guesses = document.getElementById("guess-atempts");
var ins = document.getElementById("instruction");
var highscore=document.getElementById("highscore")
var totalscore=document.getElementById("score")
var reset =document.getElementById("reset");
var strt=document.getElementById("btn");
var spinner= document.getElementById("spin");
//initialize

document.getElementById("canvas").style.zIndex = "-1";


function main() {
    
    initialize();
    //button is pressed
    document.onkeyup = function (event) {
       
        if (spun === true) {
            spun = false;
            
            gameplay(event);
           
        }

        else {
            endtext.textContent="Spin that wheel";
          
        }

    }
};

function gameplay(event) {
    // acceptable_entries.test(guess)
    var correct = false;//
    var guess = event.key;
    var guessnumb= event.which;
    
    if (lettercheck(guess) === true && 65<=guessnumb && 95>=guessnumb ) {
        spinner.disabled=false;
        guess=guess.toLowerCase();// to allow uppercase entries
        choices.push(guess);//logs the guess letter
            guess=guess.toLowerCase();
        //checks the guess
        for (var j = 0; j < word.length; j++) {
            if (guess === word.charAt(j)) {
                //pushes the guess into the blank array
                letter[j] = guess;
                correct = true;
                score += text;// adding to score
              
            }
           
        };
        totalscore.textContent = score;
            //when wrong
            if (correct === false) {
                life--;
            
        }

        statustext.textContent = letter;
        lifetext.textContent = life;
        guesses.textContent = choices;
    }

    else {
        endtext.textContent="Try again";
        spun=true;
       
    }

    //life checker when life is zero game ends and reveal world
        if (life === 0) {
            var win=false  
            score=0;
            life=6;
        list_reset();
        end_events(false);
        }
    //checks if you won
      
        else if (state()) {
            var win=true
            
            end_events(true);
         };
        if(score> highscre){// checks for a new highscore
            highscre=score
            highscore.textContent =highscre ;
     }


}






//wheel

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}

function RGB2Color(r, g, b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
    var phase = 0;
    var center = 128;
    var width = 127;
    var frequency = Math.PI * 2 / maxitem;

    red = Math.sin(frequency * item + 2 + phase) * width + center;
    green = Math.sin(frequency * item + 0 + phase) * width + center;
    blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return RGB2Color(red, green, blue);
}

function drawRouletteWheel() {
   
    if (canvas.getContext) {
        var outsideRadius = 200;
        var textRadius = 160;
        var insideRadius = 125;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.font = 'bold 12px Helvetica, Arial';

        for (var i = 0; i < options.length; i++) {
            var angle = startAngle + i * arc;
        
            ctx.fillStyle = getColor(i, options.length);

            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            ctx.save();
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur = 0;
            ctx.shadowColor = "rgb(220,220,220)";
            ctx.fillStyle = "black";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = options[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }

        //Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
    }
}

function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
    spinner.disabled=true;
    spun = true;
    endtext.textContent="Pick a letter";
 
}

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
    ctx.fillStyle = "azure";
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial';
    text = options[index]
    console, console.log(text);

    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
}

function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

drawRouletteWheel();
