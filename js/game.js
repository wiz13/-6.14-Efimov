const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let TotalMiss = 0;

function round() {
  let divSelector = randomDivId();  
  $(divSelector).addClass("target");    
  $(divSelector).text(hits+1);    
  $(".col").removeClass("miss");    
  if (firstHitTime===0) {firstHitTime = getTimestamp()}
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $("#table").addClass("d-none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-miss").text(TotalMiss);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {  
  if ($(event.target).hasClass("target")) {
    $(event.target).removeClass("target");    
    $(event.target).text("");
    hits++;    
    round();    
  }
  else {    
    $(event.target).addClass("miss");    
    TotalMiss++;
  }  
}

function InitGamePlace() {
    if (!$("#win-message").hasClass("d-none")) {$("#win-message").addClass("d-none");}
    if ($("#table").hasClass("d-none")) {$("#table").removeClass("d-none");}    
    $(".col").removeClass("miss").removeClass('target').text("");                
    hits = 0;
    TotalMiss = 0;
    firstHitTime = 0;
}


function init() {
  $(".game-field").click(handleClick);

  $("#button-start").click(function() {            
    InitGamePlace();
    round();  
   });  

  $("#button-reload").click(function() {        
    InitGamePlace();
    location.reload();
  });
}

$(document).ready(init);
