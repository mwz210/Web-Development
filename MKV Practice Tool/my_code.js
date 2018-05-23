$(document).ready(function() {
  window.HELP_IMPROVE_VIDEOJS = false;

  var player = videojs('#demo_video');
  $(".background").hide();
  $(".background2").hide();
  $(".mdl-dialog").hide();

  var section = false;
  var start_time = 0;
  var color = "";
  var half_section = false;
  var last_time = 0;
  var last_color = "";
  var count = 0;
  var chooseColor = 0;
  var start_end = document.getElementById("start-end");
  var doNotGoBack = false;
  var autoLoop = true;
  var autoCountdown = true;
  var prevent = true;
  var performance_mode = false;
  var realCreateCountdown = _.throttle(createCountdown, 6000);
  var threeCreateCountdown = _.throttle(createThreeSecCountdown, 4000);
  var prevention = _.throttle(function(){prevent = true;}, 2000);
  var doNotLetItGoBack = _.throttle(function(){
    doNotGoBack = false;
  }, 1000);
  var add_marker = false;
//===========================================================================================================

function updateCheckBox(headerCB) {
	var table = document.querySelector('table');
	var headerCheckbox = table.querySelector('thead .mdl-data-table__select input');
	var boxes = table.querySelectorAll('tbody .mdl-data-table__select');
	var rows = table.querySelectorAll('tbody tr');
	if (headerCB.checked) {
		for (let i = 0, length = boxes.length; i < length; i++) {
			boxes[i].MaterialCheckbox.check();
		}
	} else {
		for (let i = 0, length = boxes.length; i < length; i++) {
			boxes[i].MaterialCheckbox.uncheck();
		}
	}
}
// Function to delete all rows that have the checkbox checked

function rowRemoveAll() {
	var table = document.querySelector('table'); //get reference  of the table
	var boxes = table.querySelectorAll('tbody .mdl-data-table__select'); // get reference of checkbox elements as a list
	var rows = table.querySelectorAll('tbody tr'); // target rows in table body
	for (let i = 0, length = rows.length; i < length; i++) {
    var string = "#" + rows[i].id.toString();
    $(string).hide('slow', function(){
      $(string).off;
      rows[i].remove();
    });
	}
}

function rowRemove() {
	var table = document.querySelector('table'); //get reference  of the table
	var boxes = table.querySelectorAll('tbody .mdl-data-table__select'); // get reference of checkbox elements as a list
	var rows = table.querySelectorAll('tbody tr'); // target rows in table body
	for (let i = 0, length = rows.length; i < length; i++) {
		if (boxes[i].MaterialCheckbox.inputElement_.checked) // if checkbox is checked
		{
      var string = "#" + rows[i].id.toString();
      $(string).hide('slow', function(){
        $(string).off;
        rows[i].remove();
      });
		} // remove its corresponding row
	}
}
//Add a Contact
function freshUpdate(start, end, section) {
	var listContainer = document.getElementById('features-list');
	var tmptr;
	var tmptd;
	var tmplabel;
	var tmpinput;
	var tmptd2;
	var tmptd3;
  var tmptd4;
  var colorDiv;
  colorDiv = document.createElement("div");
  colorDiv.setAttribute("class", section);
	// create new elements
	tmptr = document.createElement("tr");
  tmptr.setAttribute("id", "tr-" + section);
	tmptd = document.createElement("td");
	tmptd.setAttribute("class", "mdl-data-table__cell--non-numeric");
	tmplabel = document.createElement("label");
	tmplabel.setAttribute("class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select");
	tmpinput = document.createElement("input");
	tmpinput.setAttribute("class", "mdl-checkbox__input");
	tmpinput.setAttribute("type", "checkbox");
	tmptd2 = document.createElement("td");
	tmptd2.setAttribute("class", "mdl-data-table__cell--non-numeric color-" + section);
	tmptd2.appendChild(colorDiv);
	tmptd3 = document.createElement("td");
	tmptd3.setAttribute("class", "mdl-data-table__cell--non-numeric");
	tmptd3.innerHTML = start;
  tmptd4 = document.createElement("td");
  tmptd4.setAttribute("class", "mdl-data-table__cell--non-numeric");
	tmptd4.innerHTML = end;
	// connect new Elements into the "tr row" element
	tmplabel.appendChild(tmpinput);
	tmptd.appendChild(tmplabel);
	tmptr.appendChild(tmptd);
	tmptr.appendChild(tmptd2);
	tmptr.appendChild(tmptd3);
  tmptr.appendChild(tmptd4);
	// MDL promotions that re-attach events and styles
	componentHandler.upgradeElement(tmpinput);
	componentHandler.upgradeElement(tmplabel);
	componentHandler.upgradeElement(tmptd);
	componentHandler.upgradeElement(tmptd2);
	componentHandler.upgradeElement(tmptd3);
  componentHandler.upgradeElement(tmptd4);
  componentHandler.upgradeElement(colorDiv);
	// Insert new elements into the DOM
	listContainer.appendChild(tmptr);
}

function addMarkerList(start_time, end_time, color) {
	freshUpdate(start_time, end_time, color);
	return false;
}


//===========================================================================================================
// Snackbar upon adding a marker, you can also undo the action

(function() {
  'use strict';
  var snackbarContainer = document.querySelector('#demo-snackbar-example');
  var showSnackbarButton = document.querySelector('.add-bookmark-here');
  var addBreakpointCT = document.querySelector('.add-marker');

  var handler = function(event) {
    var bool = player.markers.removeMarkerOne(last_time);
    if (start_end.innerText == "ADD START MARKER" && bool == true){
      start_end.innerHTML = "ADD END MARKER";
      document.getElementById("add-marker").style.backgroundColor = "yellow";
      document.getElementById("description").innerHTML = "Add the end of the section you will loop and practice!";
      half_section = true;
      color = last_color.replace("special-", "");
    }
    else if (bool == true){
      start_end.innerHTML = "ADD START MARKER";
      document.getElementById("add-marker").style.backgroundColor = "#5FAD46";
      document.getElementById("description").innerHTML = "Add the start of the section you will loop and practice!";
    }
  };
  showSnackbarButton.addEventListener('click', function() {
    'use strict';

    var data = {
      message: 'Marker Added',
      timeout: 2000,
      actionHandler: handler,
      actionText: 'Undo'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  });
}());


//=============================================================================================================

// Adjust playback speeds

var playbackSpeeds = [.25, .5, .75, 1.0, 1.25, 1.5, 1.75, 2.0]

$(".slower").click(function(){
  currentSpeed = document.getElementById("current-speed");

  if (player.playbackRate() == .25) {
    console.log("playback");
    alert("Can't get any slower!");
  }

  for (var i = playbackSpeeds.length - 1; i >= 0 ; i--) {
    var speed = playbackSpeeds[i];

    if (speed < player.playbackRate()) {
      player.playbackRate(speed);
      currentSpeed.innerHTML = "" + speed;

      return;
    }
  }


});

$(".faster").click(function(){
  currentSpeed = document.getElementById("current-speed");

  if (player.playbackRate() == 2.0) {
    console.log("playback");
    alert("Can't get any faster!");
  }

  for (var i = 0; i < playbackSpeeds.length ; i++) {
    var speed = playbackSpeeds[i];

    if (speed > player.playbackRate()) {
      player.playbackRate(speed);
      currentSpeed.innerHTML = "" + speed;
      return;
    }
  }
});
//=============================================================================================================
// Handling auto-loop

$("#switch-1").change(function(){
  if(!$(this).is(':checked')) {
    autoLoop = false;
  }
  else {
    autoLoop = true;
  }

});

//=============================================================================================================
// Handling auto-Countdown

$("#switch-2").change(function(){
  if(!$(this).is(':checked')) {
    autoCountdown = false;
  }
  else {
    autoCountdown = true;
  }

});

//=============================================================================================================
// Performance mode / User Goal

$("#switch-3").change(function() {
  var elems = document.getElementsByClassName("to-disable");
  var toggle1 = document.getElementById('switch-1');
  var toggle2 = document.getElementById('switch-2');
  var change_color = document.getElementsByClassName("color-change");
  var icons = document.getElementsByClassName("black600");
  currentSpeed = document.getElementById("current-speed");
  if ($(this).is(':checked')){
    document.body.style.background= "#212121";
    document.body.style.color= "white";
    player.currentTime(0);
    $('#check1')[0].MaterialSwitch.off();
    $("#check2")[0].MaterialSwitch.off();
    for (var i = 0; i < elems.length; i++){
      elems[i].disabled = true;
    }
    for (var i = 0; i < change_color.length; i++){
      change_color[i].style.color = "white";
    }
    for (var i = 0; i < icons.length; i++){
      icons[i].style.color = "white";
    }

    player.playbackRate(1);
    currentSpeed.innerHTML = "1.0";

    toggle1.disabled = true;
    toggle2.disabled = true;
    autoCountdown = false;
    autoLoop = false;
    player.requestFullscreen();
    realCreateCountdown();
    performance_mode = true;
  }
  else{
    document.body.style.background = "#fff";
    document.body.style.color= "#333";
    toggle1.disabled = false;
    toggle2.disabled = false;
    $('#check1')[0].MaterialSwitch.on();
    $('#check2')[0].MaterialSwitch.on();
    for (var i = 0; i < elems.length; i++){
      elems[i].disabled = false;
    }
    for (var i = 0; i < change_color.length; i++){
      change_color[i].style.color = "black";
    }
    for (var i = 0; i < icons.length; i++){
      icons[i].style.color = "black";
    }
    autoCountdown = true;
    autoLoop = true;
    performance_mode = false;
    player.exitFullscreen();
  }
  });





//=============================================================================================================
window.addEventListener('keyup', function (e) {
    // Press spacebar to Play/Pause.
    if (e.keyCode == 32 || e.which == 32) {
        // Stop the jerk.
        e.preventDefault();
        // If video is paused.
        if (player.paused()) {
            player.play();
        } else {
            player.pause();
        }
    }
    else if (e.which == 66 || e.keyCode == 66){
      doNotGoBack = true;
      createNewMarker(player.currentTime());
      last_time = player.currentTime();
      last_color = player.markers.findColor(last_time);
      last_color.replace("special-", "");
      if (start_end.innerText == "ADD START MARKER"){
        start_end.innerHTML = "ADD END MARKER";
        document.getElementById("add-marker").style.backgroundColor = "yellow";
        document.getElementById("description").innerHTML = "Add the end of the section you will loop and practice!";
      }

      else{
        start_end.innerHTML = "ADD START MARKER";
        document.getElementById("add-marker").style.backgroundColor = "#5FAD46";
        document.getElementById("description").innerHTML = "Add the start of the section you will loop and practice!";
      }
      if (half_section == true){
        start_time = last_time;
        section = true;
      }
      else if(half_section == false && section == true){
        temp_color = last_color.replace('special-', "");

        addPerson(Math.round(start_time), Math.round(last_time), temp_color);
        section = false;
      }
    }
    else if (e.which == 82 || e.keyCode == 82){
      var markerList = player.markers.getMarkers();
      doNotGoBack = true;
      var alreadyFalse = true;
      if (autoCountdown == true){
        autoCountdown = false;
        alreadyFalse = false;
      }
      var timeGoneTo;
      var timeBefore = player.currentTime();
      player.on("seeked", function() {
        timeGoneTo = player.currentTime();
        player.currentTime(timeBefore);
        doNotGoBack = true;
        var num = player.markers.removeMarker(timeGoneTo)
        if (num == 1 || num == 2){
          //player.pause();
          if (half_section == false){
            start_end.innerHTML = "ADD START MARKER";
            document.getElementById("add-marker").style.backgroundColor = "#5FAD46";
            document.getElementById("description").innerHTML = "Add the start of the section you will loop and practice!";
          }
          else {
            if (check_curr_color()){
              start_end.innerHTML = "ADD START MARKER";
              document.getElementById("add-marker").style.backgroundColor = "#5FAD46";
              document.getElementById("description").innerHTML = "Add the start of the section you will loop and practice!";
            }
            else{
              start_end.innerHTML = "ADD END MARKER";
              document.getElementById("add-marker").style.backgroundColor = "yellow";
              document.getElementById("description").innerHTML = "Add the end of the section you will loop and practice!";
            }
          }
        }
        player.off("seeked");
        if (!alreadyFalse){
          autoCountdown = true;
        }
    });
  }
}); // End keypress().
  //==========================================================================================================

  // Scrub through video using arrow keypress

  window.addEventListener('keydown', function (evt) {
        if (evt.keyCode == 37 || evt.which == 37) { //left arrow
            //one frame back
            player.currentTime(Math.max(0, player.currentTime() - 1));
        } else if (evt.keyCode == 39 || evt.which == 39) { //right arrow
            //one frame forward
            //Don't go past the end, otherwise you may get an error
            player.currentTime(Math.min(player.duration(), player.currentTime() + 1));
        } else if (evt.keyCode == 38 || evt.which == 38){
          player.volume(player.volume() + .05);
        } else if (evt.keyCode == 40 || evt.which == 40){
          player.volume(player.volume() - .05);
        }
});

  //===========================================================================================================
  //  Code that ensures that the video will autoloop between two segments, but not when the user clicks on a marker to jump to


  player.on("seeking", function() {
    doNotGoBack = true;
    return true;
  });

  player.on("play", function(){
    if (doNotGoBack == true){
      doNotLetItGoBack();
    }
    return true;
  });


//===========================================================================================================
/* Marker Stuff */
  player.markers({
    markerStyle: {
      'width': '15px',
      'background-color': 'blue'
    },
    markerTip:{
      display: false
    },
    breakOverlay:{
      display: false
    },
   onMarkerClick: function(marker){

     doNotGoBack = true;

      $('.dynamic-demo-events').append('<li class="list-group-item">Marker click: '+marker.time+'</li>');
      //clearInterval(interval);

      // Logic 1: Player has to press "Play" after navigating to a new marker -- this is because you can click on marker to delete it
      // Logic 2: Player doesn't have to press "Play"
        // Ensure that when clicking on the marker, the user has a few seconds to prepare on the piano before the video begins to play

      if(autoCountdown == true)
          realCreateCountdown();


   },
  onMarkerReached: function(marker){

  var markerList = player.markers.getMarkers();


    //Loop
      if(doNotGoBack == false && autoLoop == true && player.currentTime() != player.markers.prev3(player.currentTime())){

        player.currentTime(player.markers.prev3(player.currentTime()));

        var data = {
          message: 'Looping To Start Marker',
          timeout: 1500
        };
        var snackbarContainer = document.querySelector('#demo-snackbar-example');
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
      }

      if (doNotGoBack == false && autoCountdown == true){
        realCreateCountdown();
      }

  },

  //load the marker plugin
  markers: []
  });

//=====================================================================================
  // different button clicks

  $(".done").click(function(){
    rowRemoveAll();
    player.markers.removeAll();
    var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#show-dialog');
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    $(".mdl-dialog").show();
    dialog.showModal();
  });
  $(".pause-to").click(function(){
    player.pause();
  });

  $(".beginning").click(function(){
     player.currentTime(0);
  });

  $(".next").click(function(){
     player.markers.next();
     if(autoCountdown == true){
       realCreateCountdown();
     }
  });

  $(".remove").click(function(){
    var markerList = player.markers.getMarkers();
    doNotGoBack = true;
    var alreadyFalse = true;
    if (autoCountdown == true){
      autoCountdown = false;
      alreadyFalse = false;
    }
    var timeGoneTo;
    var timeBefore = player.currentTime();
    player.on("seeked", function() {
      timeGoneTo = player.currentTime();
      player.currentTime(timeBefore);
      doNotGoBack = true;
      var num = player.markers.removeMarker(timeGoneTo)
      if (num == 1 || num == 2){
        //player.pause();
        if (half_section == false){
          start_end.innerHTML = "ADD START MARKER";
          document.getElementById("add-marker").style.backgroundColor = "#5FAD46";
          document.getElementById("description").innerHTML = "Add the start of the section you will loop and practice!";
        }
        else {
          if (check_curr_color()){
            start_end.innerHTML = "ADD START MARKER";
            document.getElementById("add-marker").style.backgroundColor = "#5FAD46";
            document.getElementById("description").innerHTML = "Add the start of the section you will loop and practice!";
          }
          else{
            start_end.innerHTML = "ADD END MARKER";
            document.getElementById("add-marker").style.backgroundColor = "yellow";
            document.getElementById("description").innerHTML = "Add the end of the section you will loop and practice!";
          }
        }
      }
      player.off("seeked");
      if (!alreadyFalse){
        autoCountdown = true;
      }
    });
  });

  // Create magenta marker
  $(".add-bookmark-here").click(function(){
    doNotGoBack = true;

    // Creates new marker with the right color both visibly and internally.
    createNewMarker(player.currentTime());
    last_time = player.currentTime();
    last_color = player.markers.findColor(last_time);
    temp_color = last_color.replace("special-", "");

    if (start_end.innerHTML == "Add Start Marker"){
      start_end.innerHTML = "ADD END MARKER";
      document.getElementById("add-marker").style.backgroundColor = "yellow";
      document.getElementById("description").innerHTML = "Add the end of the section you will loop and practice!";
    }

    else{
      start_end.innerHTML = "Add Start Marker";
      document.getElementById("add-marker").style.backgroundColor = "#5FAD46";
      document.getElementById("description").innerHTML = "Add the start of the section you will loop and practice!";
    }

    if (half_section == true){
      start_time = last_time;
      section = true;
    }
    else if(half_section == false && section == true){
      addMarkerList(Math.round(start_time), Math.round(last_time), temp_color);
      section = false;
    }

  });

  function check_curr_color(){
    var markerList = player.markers.getMarkers();
    var count = 0;
    temp_color = "special-" + color;
    for (var i = 0; i < markerList.length; i++){
      if (markerList[i].class == temp_color){
        count += 1;
      }
    }
    if (count == 0){
      return true;
    }
    else{
      return false;
    }
  }

  function createNewMarker(){
    var markerList = player.markers.getMarkers();
    var red_count = 0;
    var blue_count = 0;
    var green_count = 0;
    var teal_count = 0;
    var orange_count = 0;
    var magenta_count = 0;
    var yellow_count = 0;
    var purple_count = 0;
    doNotGoBack = true;
    for (var i = 0; i < markerList.length; i++){
      if (markerList[i].class == "special-red"){
        red_count += 1;
      }
      else if (markerList[i].class == "special-blue"){
        blue_count += 1;
      }
      else if (markerList[i].class == "special-green"){
        green_count += 1;
      }
      else if (markerList[i].class == "special-teal"){
        teal_count += 1;
      }
      else if (markerList[i].class == "special-orange"){
        orange_count += 1;
      }
      else if (markerList[i].class == "special-magenta"){
        magenta_count += 1;
      }
      else if (markerList[i].class == "special-yellow"){
        yellow_count += 1;
      }
      else if (markerList[i].class == "special-purple"){
        purple_count += 1;
      }
    }

    if (color == "red" && red_count == 1){
      createNewRedMarker(player.currentTime());
      red_count += 1;
    }
    else if (color == "blue" && blue_count == 1){
      createNewBlueMarker(player.currentTime());
      blue_count += 1;
    }
    else if (color == "green" && green_count == 1){
      createNewGreenMarker(player.currentTime());
      green_count += 1;
    }
    else if (color == "teal" && teal_count == 1){
      createNewTealMarker(player.currentTime());
      teal_count += 1;
    }
    else if (color == "orange" && orange_count == 1){
      createNewOrangeMarker(player.currentTime());
      orange_count += 1;
    }
    else if (color == "magenta" && magenta_count == 1){
      createNewMagentaMarker(player.currentTime());
      magenta_count += 1;
    }
    else if (color == "yellow" && yellow_count == 1){
      createNewYellowMarker(player.currentTime());
      yellow_count += 1;
    }
    else if (color == "purple" && purple_count == 1){
      createNewPurpleMarker(player.currentTime());
      purple_count += 1;
    }

    else if (red_count < 2){
      createNewRedMarker(player.currentTime());
      red_count += 1;
    }
    else if (blue_count < 2) {
      createNewBlueMarker(player.currentTime());
      blue_count += 1;
    }
    else if (green_count < 2) {
      createNewGreenMarker(player.currentTime());
      green_count += 1;
    }
    else if (teal_count < 2) {
      createNewTealMarker(player.currentTime());
      teal_count += 1;
    }
    else if (orange_count < 2) {
      createNewOrangeMarker(player.currentTime());
      orange_count += 1;
    }
    else if (magenta_count < 2) {
      createNewMagentaMarker(player.currentTime());
      magenta_count += 1;
    }
    else if (yellow_count < 2) {
      createNewYellowMarker(player.currentTime());
      yellow_count += 1;
    }
    else if (purple_count < 2) {
      createNewPurpleMarker(player.currentTime());
      purple_count += 1;
    }
    if (red_count == 1){
      half_section = true;
      color = "red";
    }
    else if (blue_count == 1){
      half_section = true;
      color = "blue";
    }
    else if (green_count == 1){
      half_section = true;
      color = "green";
    }
    else if (teal_count == 1){
      half_section = true;
      color = "teal";
    }
    else if (orange_count == 1){
      half_section = true;
      color = "orange";
    }
    else if (magenta_count == 1){
      half_section = true;
      color = "magenta";
    }
    else if (yellow_count == 1){
      half_section = true;
      color = "yellow";
    }
    else if (purple_count == 1){
      half_section = true;
      color = "purple";
    }
    else{
      half_section = false;
      color = "";
    }

  }

//===========================================================================================================
  // https://stackoverflow.com/questions/2170923/whats-the-easiest-way-to-call-a-function-every-5-seconds-in-jquery
  // setInterval function!

  // https://stackoverflow.com/questions/16573974/ended-event-videojs-not-working
  // add event listener here!

  var currentTime = 0;

  // resetting the current time
  setInterval(function(){
      if (!player.seeking()) {
        currentTime = player.currentTime();
      }

      if (performance_mode == true && player.currentTime() >= player.duration()){
        'use strict';
        player.exitFullscreen();
        var dialog = document.querySelector('dialog');
        var showDialogButton = document.querySelector('#show-dialog');
        if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog);
        }
        var elems = document.getElementsByClassName("to-disable");
        var toggle1 = document.getElementById('switch-1');
        var toggle2 = document.getElementById('switch-2');
        var change_color = document.getElementsByClassName("color-change");
        var icons = document.getElementsByClassName("black600");
        document.body.style.background = "#fff";
        document.body.style.color= "#333";
        toggle1.disabled = false;
        toggle2.disabled = false;
        $('#check1')[0].MaterialSwitch.on();
        $('#check2')[0].MaterialSwitch.on();
        for (var i = 0; i < elems.length; i++){
          elems[i].disabled = false;
        }
        for (var i = 0; i < change_color.length; i++){
          change_color[i].style.color = "black";
        }
        for (var i = 0; i < icons.length; i++){
          icons[i].style.color = "black";
        }
        $(".mdl-dialog").show();
        dialog.showModal();
        autoCountdown = true;
        autoLoop = true;
        performance_mode = false;
        $('#performance-mode')[0].MaterialSwitch.off();
        player.exitFullscreen();
      }
    }, .000000000001);


setInterval(function() {
    rowRemove();
}, 300);

//===========================================================================================================



//==============================================================================
// function to create a 3 second countdown
function createThreeSecCountdown() {
  blah = document.getElementById("blah");

  $(".background2").show();

  var counter = 3;

  var interval = setInterval(function() {

    counter--;

    if (counter >= 0) {

      blah.innerHTML = "Next Breakpoint in " + counter + " Seconds...";

    }
    // Display 'counter' wherever you want to display it.
    if (counter === 0) {
        $(".background2").hide();
        clearInterval(counter);
    }
  }, 1000);

  blah.innerHTML = "Next Breakpoint in 3 Seconds...";
  return interval;
}


//===========================================================================================================
// function to create a Countdown
function createCountdown() {
  player.pause();
  span = document.getElementById("count");

  $(".background").show();

  var counter = 5;

  var interval = setInterval(function() {

    counter--;

    if (counter >= 0) {
      span.innerHTML = "playing in " + counter + " seconds, don't move...";
    }
    // Display 'counter' wherever you want to display it.
    if (counter === 0) {
        $(".background").hide();
        player.play();
        clearInterval(counter);
    }
  }, 1000);

  span.innerHTML = "playing in 5 seconds, don't move...";
  return interval;
}


//===========================================================================================================
  function createNewRedMarker(currentTime) {
    player.controls(true);
    player.markers.add([{
      time: currentTime,
      overlayText: "Arrived at next bookmark",
      class: "special-red"
    }]);

    return player.currentTime();
  }


  function createNewTealMarker(currentTime) {
    player.controls(true);
    player.markers.add([{
      time: currentTime,
      overlayText: "Arrived at next bookmark",
      class: "special-teal"
    }]);

    return player.currentTime();
  }

  function createNewYellowMarker(currentTime) {
    player.controls(true);
    player.markers.add([{
      time: currentTime,
      overlayText: "Arrived at next bookmark",
      class: "special-yellow"
    }]);

    return player.currentTime();
  }

  function createNewPurpleMarker(currentTime) {
    player.controls(true);
    player.markers.add([{
      time: currentTime,
      overlayText: "Arrived at next bookmark",
      class: "special-purple"
    }]);

    return player.currentTime();
  }

  function createNewOrangeMarker(currentTime) {
    player.controls(true);
    player.markers.add([{
      time: currentTime,
      overlayText: "Arrived at next bookmark",
      class: "special-orange"
    }]);

    return player.currentTime();
  }

  function createNewGreenMarker(currentTime) {
    player.controls(true);
    player.markers.add([{
      time: currentTime,
      overlayText: "Arrived at next bookmark",
      class: "special-green"
    }]);

    return player.currentTime();
  }

  //============================================================================
  function createNewBlueMarker(currentTime) {
    player.controls(true);
    player.markers.add([{
      time: currentTime,
      overlayText: "Arrived at next bookmark",
      class: "special-blue"
    }]);

    return player.currentTime();
  }

  //============================================================================

  function createNewMagentaMarker(currentTime) {
    player.controls(true);
    player.markers.add([{
      time: currentTime,
      overlayText: "Arrived at next bookmark",
      class: "special-magenta"
    }]);

    return player.currentTime();

  }



  'use strict';
   var dialog = document.querySelector('dialog');
   dialog.querySelector('.close').addEventListener('click', function() {
     dialog.close();
     $(".mdl-dialog").hide();
   });


});
