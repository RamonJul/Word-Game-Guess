// word slection
function initialize(){
    word= word_list[Math.floor(Math.random()*word_list.length)];
    console.log(word);
        console.log(word.length);
        
    for(var i=0; i<word.length; i++){
    letter.push("_");
    console.log(letter[i]);
    }
  
 }
//checks if letters was used
function lettercheck(key){
    console.log(key);
    var good=true;
    for(var k=0 ; k<choices.length; k++){
            if (key===choices[k]){
                good= false;
            }
           
    } 
    console.log(good);
    return good;
}
// checks the game status
//answ is a string while attempt is the array
function status(answ, attempt){
    var status=true
    for(var i=0 ; i<attempt.length; i++){
        if (answ.charAt(i)!==attempt[i]){
            status=false;
        }
    }
    return status;
}


function reset(){

    word="";
    life=6;
    letter=[];
    life = 6; 
    choices=[]; 
}
//global variable list
var word_list = [ "cowboy", "horse"];
var word; // the word that will be guessed
var letter=[];// blank array where we word will be stored
var life = 6; //how many lives
var choices=[]; //list guessed letters
var wins=0;
var acceptable_entries=/["a-z"]/;
//html variables

var lifetext=document.getElementById("lives");
var statustext=document.getElementById("current-status");
var endtext=document.getElementById("end-text");
var guesses=document.getElementById("guess-atempts");
var ins=document.getElementById("instruction");
    //initialize

// while(done){  
function game_start(){  
    document.getElementById("btn").style.zIndex="-1";
    ins.textContent="Guess the Word";
    initialize();
    statustext.textContent=letter;
    lifetext.textContent="Remaining life is "+life;
    guesses.textContent=choices;
    //button is pressed
    document.onkeyup=function(event){

        var correct=false;
        var guess=event.key;
        console.log(choices[0]);
        if(lettercheck(guess)===true && acceptable_entries.test(guess)){
            choices.push(guess);//logs the guess letter
            console.log(guess);
        //checks the guess
            for(var j=0; j<word.length; j++){
                    if(guess===word.charAt(j)){
                        //pushes the guess into the blank array
                        letter[j]=guess; 
                    correct=true;
                    }      
                    console.log(letter[j]);
            };
            //when wrong
            if(correct=== false){
                life--;
                console.log(life);
            }

            statustext.textContent=letter;
            lifetext.textContent="Remaining life is "+life;
            guesses.textContent=choices;
      }   

        else{
            console.log("Try another letter");
        }


    //life checker when life is zero game ends and reveal world
    if (life===0){
        endtext.textContent="YOU LOSE";
        document.getElementById("btn").style.zIndex="1";
        reset();
    }
    //checks if you won
    else if(status(word, letter )){
        endtext.textContent="YOU WIN";
        wins++;
        document.getElementById("btn").style.zIndex="1";
        reset();
    }

 }
};
