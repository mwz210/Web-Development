if (document.getElementById("vid1")) {
  videojs("vid1").ready(function() {

    var myPlayer = this;

    //Set initial time to 0
    var currentTime = 0;

    //This example allows users to seek backwards but not forwards.
    //To disable all seeking replace the if statements from the next
    //two functions with myPlayer.currentTime(currentTime);

    myPlayer.on("seeking", function(event) {
      if (currentTime < myPlayer.currentTime()) {
        myPlayer.currentTime(currentTime);
      }
    });

    myPlayer.on("seeked", function(event) {
      if (currentTime < myPlayer.currentTime()) {
        myPlayer.currentTime(currentTime);
      }
    });

    setInterval(function() {
      if (!myPlayer.paused()) {
        currentTime = myPlayer.currentTime();
      }
    }, 1000);

  });
}


//===========================================================================
player.on("seeking", doNotLetSeek());

function doNotLetSeek(){
  if (currentTime != player.currentTime()) {
    createNewMarker(player.currentTime());
    player.currentTime(currentTime);
    alert("lol2");
    return false;
    //break;
  }
  alert("lol3");
  return false;
  //break;
}

player.off("seeking", doNotLetSeek());
alert("lol4");
return false;
});

//==========================================================================

/*
// BLUE MARKER
$(".add-blue-marker").click(function(){
  // resetting the current time
  var help = 0;

  setInterval(function(){
      if (!player.seeking()) {
        currentTime = player.currentTime();
      }
  }, .00000000001);


  // CLICK for marker - not letting the user seek, then calling the function to create another marker
  player.on("seeking", function() {
    if (currentTime != player.currentTime()) {
      createNewBlueMarker(player.currentTime());
      // add to our own array of markers and times
      player.currentTime(currentTime);
      help += 1;
    }
    if (help >= 2){
      player.off("seeking");
    }
    return false;
  });

  return false;
});
*/


  // blue marker
  function createNewBlueMarker(currentTime) {
    player.markers.add([{
      time: currentTime,
      text: "Blue",
      overlayText: "Blue"
      class: "special-blue"
    }]);

    return player.currentTime();

  }
