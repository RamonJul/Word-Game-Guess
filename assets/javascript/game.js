// word slection
function initialize() {
    var c=10
    // while(c===10){
    var number=Math.floor(Math.random() * word_list.length);   
    word = word_list[number];
    console.log(word);
    console.log(word.length);
    // console.log(available)
    console.log(c);
    // if( available[number]!=0){
    for (var i = 0; i < word.length; i++) {
        letter.push("_");
        console.log(letter[i]);
    }
    //     available[number]=0;
    //     console.log(available[number]);
    //     console.log(available)
    //     c=9;
    //     console.log (c);
    // }
}
// }
//checks if letters was used
function lettercheck(key) {
    console.log(key);
    var good = true;
    for (var k = 0; k < choices.length; k++) {
        if (key === choices[k]) {
            good = false;
        }

    }
    console.log(good);
    return good;
}
// checks the game status
//answ is a string while attempt is the array
function status(answ, attempt) {
    
    var status = true
    for (var i = 0; i < attempt.length; i++) {
        if (answ.charAt(i) !== attempt[i]) {
            status = false;
        }
    }
    return status;
}


function reset() {
    letter = [];
    choices = [];
}
//global variable list
var word_list = ["cat", "dog"];
var word; // the word that will be guessed
var letter = [];// blank array where we word will be stored
var life = 1; //how many lives
var choices = []; //list guessed letters
var score = 0;// reset when lost
var highscre=0;
// var available=[];
// for (var j=0; j< word_list.length;j++){
//     available.push(1);
// }
// console.log(available.length)
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
var canvas = document.getElementById("canvas");
//initialize

document.getElementById("canvas").style.zIndex = "-1";
document.getElementById("reset").addEventListener("click", game_start);

function game_start() {
    reset();
    document.getElementById("reset").style.opacity= 0;
    document.getElementById("reset").disabled= true;
    document.getElementById("canvas").style.zIndex = "1";
    document.getElementById("btn").style.opacity = 0;
    document.getElementById("btn").disabled=true;
    document.getElementById("spin").style.opacity = 1;
    document.getElementById("spin").disabled=false;
    ins.textContent = "Guess the Word";
    endtext.textContent = "";
    initialize();

    statustext.textContent = letter;
    lifetext.textContent = life;
    guesses.textContent = choices;
    totalscore.textContent = score;
    console.log(spun)
   

    //button is pressed
    document.onkeyup = function (event) {
        console.log(event.which);
        if (spun === true) {
            spun = false;
            gameplay();
           
        }

        else {
            endtext.textContent="Spin that wheel";
            console.log("spin the wheel")
        }

    }
};

function gameplay() {
    // acceptable_entries.test(guess)
    var correct = false;//
    var guess = event.key;
    var guessnumb= event.which;
    console.log(choices[0]);
    if (lettercheck(guess) === true && 65<=guessnumb && 95>=guessnumb ) {
        choices.push(guess);//logs the guess letter
        console.log(guess);
        //checks the guess
        for (var j = 0; j < word.length; j++) {
            if (guess === word.charAt(j)) {
                //pushes the guess into the blank array
                letter[j] = guess;
                correct = true;
                score += text;
                console.log(score);
            }
            console.log(letter[j]);
        };
        //when wrong
        totalscore.textContent = score;
        if (correct === false) {
            life--;
            console.log(life);
        }

        statustext.textContent = letter;
        lifetext.textContent = life;
        guesses.textContent = choices;
    }

    else {
        endtext.textContent="Try again";
        spun=true;
        console.log("Try another letter");
    }


    //life checker when life is zero game ends and reveal world
   
    if (life === 0) {
        endtext.textContent = "YOU LOSE";
        score=0;
        document.getElementById("reset").style.opacity= 1;
        document.getElementById("reset").disabled=false;
        statustext.textContent = "Word was"+ word;
        document.getElementById("reset").textContent="Try Again"
    }
    //checks if you won
    else if (status(word, letter)) {
        endtext.textContent = "YOU WIN";
        document.getElementById("reset").style.opacity= 1;
        document.getElementById("reset").disabled=false;
        document.getElementById("reset").textContent="Next Word"
        
    }
    if(score> highscre){
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
            //ctx.fillStyle = colors[i];
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
    spun = true;
    endtext.textContent="Pick a letter";
    console.log(spun)
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
