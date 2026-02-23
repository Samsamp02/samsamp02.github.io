//calculates and display time until wedding
var countDownDate = new Date("August 15, 2026").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    
    //conversions for the different units
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("counter").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    document.getElementById("counter").style.fontSize = "24px";
    if (distance < 0) {
    clearInterval(x);
    document.getElementById("counter").innerHTML = "You missed it :(";
    }
}, 1000);