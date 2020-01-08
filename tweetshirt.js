window.onload = function() {
    var button = document.getElementById("previewButton");
    button.onclick = previewHandler;
    makeImage();
}

function previewHandler() {
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    fillBackgroundColor(canvas, context);
    drawText(canvas, context);
    drawBird(canvas, context);

    //Now we need to see what shape we get in the interface. we need to find out which shape u got with the id of "shape"
    var selectObj = document.getElementById("shape");
    // Then we find out which item is selected (squares or circles) by getting the index of the selected item, and assigning its value to the variable shape.
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;

    //If the value is squares we need to draw some "about 20 of them for instance"
    if (shape === "squares") {
        for (var squares = 0; squares < 20; squares++) {
            //the function that draws the squares
            drawSquare(canvas, context);
        }
    } else if (shape === "circles"){
        for (var circles = 0; circles < 20; circles++) {
            drawCircle(canvas, context);
        }
    }
}

function drawSquare(canvas, context) {
    var w = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    context.fillStyle = "lightblue";
    context.fillRect(x, y, w, w);
}

function drawCircle(canvas, context) {
    var radius = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    context.beginPath();
    //or u can use "2 * Math.PI" at the degreesToRadians function
    context.arc(x, y, radius, 0, degreesToRadians(360), true);

    context.fillStyle = "lightblue";
    context.fill();
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}

function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var bgColor = selectObj.options[index].value;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function updateTweets(tweets) {
        var tweetsSelection = document.getElementById("tweets");


    for (var i = 0; i < tweets.length; i++) {
        tweet = tweets[i];
        var option = document.createElement("option");
        option.text = tweet.text;
        option.value = tweet.text.replace("\"", "'");

        tweetsSelection.options.add(option);
    }
    tweetsSelection.selectedIndex = 0;
}

function drawText(canvas, context) {
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;

    context.fillStyle = fgColor;
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    context.fillText("I saw this tweet", 20, 40);

    selectObj = document.getElementById("tweets");
    index = selectObj.selectedIndex;
    var tweet = selectObj[index].value;
    context.fillText(tweet, 30, 100);
    context.font = "italic 1.2em serif";


    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    context.fillText("and all I got was this lousy t-shirt!",canvas.width-20, canvas.height-40);
}

function drawBird(canvas, context) {
    var twitterBird = new Image();
    twitterBird.src = "twitter.png";
    twitterBird.onload = function() {
        context.drawImage(twitterBird, 20, 120, 70, 70);
    };
}

function makeImage() {
    var canvas = document.getElementById("tshirtCanvas");
    canvas.onclick = function () {
        window.location = canvas.toDataURL("image/png");
    };
}