$(document).ready(function(){
    console.log ("ready!");
   // Initialize Firebase
   var config = {
    apiKey: "AIzaSyDIoPl-KZsCGL3DxVqobRtmQqLob_n43k0",
    authDomain: "train-homework-dbda9.firebaseapp.com",
    databaseURL: "https://train-homework-dbda9.firebaseio.com",
    projectId: "train-homework-dbda9",
    storageBucket: "",
    messagingSenderId: "1097279092347"
  };
    firebase.initializeApp(config);
  
  
  
  // holds the firebase the data
  var database = firebase.database();
  
      // button for adding trains 
      $("#submit").on("click", function(event) {
        // Don't refresh the page!
        event.preventDefault();
        console.log("working");
  
      // Grabs user data entered into the fomr controls
        var trainName = $("#trainName").val().trim();
        var destination = $("#trainDestination").val().trim();
        var trainTimeUnix = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#trainFrequency").val().trim();
  
       var newTrain = {
          name: trainName,
          destination: destination,
          trainTime: trainTimeUnix,
          frequency: frequency
        }
  
     database.ref().push(newTrain);
  
    console.log(newTrain.trainName, newTrain.destination, newTrain.trainTimeUnix, newTrain.frequency)
  
  // Clears all of the text-boxes
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainTime").val("");
    $("#trainFrequency").val("");
  
    // Determine when the next train arrives.
    return false;
  
    });
  
      // Firebase watcher + initial loader HINT: .on("value")
      database.ref().on("child_added", function(childSnapshot, prevChildKey){
  
          console.log(childSnapshot.val());
  
  
      // Store everything into a variable.
      var tName = childSnapshot.val().name;
      var tDestination = childSnapshot.val().destination;
      var tFrequency = childSnapshot.val().frequency;
      var tFirstTrain = childSnapshot.val().trainTime;
  
    // Calculate the minutes until arrival using hardcore math
    // Calculate the minutes till arrival using unix,
    var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
    var tMinutes = tFrequency - tRemainder;
  
    // To calculate the arrival time, add the tMinutes to the currrent time
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
    console.log(tMinutes);
    console.log(tArrival);
  
    console.log(moment().format("hh:mm A"));
    console.log(tArrival);
    console.log(moment().format("X"));
  
    // Add each train's data into the table 
    $("#table").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  
    });
  });
  