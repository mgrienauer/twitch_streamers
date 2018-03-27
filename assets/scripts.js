$(document).ready(function(){

  //create function that take a streamer username as input and returns json data from twitch api
  function ajaxCall(streamer){
    //make ajax call with streamer name
    $.ajax({
     type: 'GET',
     url: 'https://api.twitch.tv/kraken/streams/' + streamer,
     headers: {
       'Client-ID': 'ieym1jzi0ljgp9ntvvw0dcuxaw4hzf'
     },
     // log data to console if success
     success: function(data) {
       console.log(data);
     }
    });
  }

  //create array to store list of streamer usernames
  let streamerArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "theviperaoc", "RobotCaleb", "noobs2ninjas"];

  //for each streamer, make an ajax request and create an html div with relevant info
  streamerArr.forEach(ajaxCall);







});
