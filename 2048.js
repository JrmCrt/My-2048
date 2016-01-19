/* globals document, $ */
$(document).ready(function(){
    "use strict";
    $("body").append('<div id="container"></div>');
    var size = parseInt($("#gridSize").val());

    $('.icon-ok').click(function() {
        size = parseInt($("#gridSize").val());
        array = randomStart(size);
        resetScore();
        $("#win").css("display", "none");
        $("#lost").css("display", "none");
    });
    var score = 0;
    var addChar = false;
    function editscore(toAdd)
    {
        score += toAdd;
        $("#score").text(score);
    }
    function resetScore()
    {
        score = 0;
        $("#score").text(score);
    }
    function win(arr)
    {
        var i, j;
        for (i = 0; i < arr.length; i+= 1) 
            for (j = 0; j < arr[i].length; j+= 1)  if(arr[i][j] === 2048) return true; 
                return false;
        }
        editscore(0);
        function displayGrid(arr)
        {
            var i, j;
            $("#container").html("");
            for (i = 0; i < arr.length; i+= 1)
            {
                for (j = 0; j < arr[i].length; j+= 1)
                {
                    if(arr[i][j] !== 0) 
                    {
                        $("#container").append("<div class='case caseFilled c"+arr[i][j]+"'>"+arr[i][j]+"</div>");
                    }   
                    else $("#container").append("<div class='case'></div>");
                }   
            }
            return arr; 
        }

        function gridFilled(arr)
        {
            var i, j;
            for (i = 0; i < arr.length; i+= 1) 
                for (j = 0; j < arr[i].length; j+= 1)  if(arr[i][j] === 0) return false; 
                    return true;
            }

            function addRandomChar(arr)
            {
                var nb = (Math.floor((Math.random() * 10) + 1) > 9 ) ? 4 : 2;
                var x = Math.floor((Math.random() * size) + 0) ;
                var y = Math.floor((Math.random() * size) + 0) ;

                if(!gridFilled  (arr))
                { 
                    if(arr[y][x] === 0) arr[y][x] = nb;
                    else
                    {
                        while(1)
                        {   
                            x = Math.floor((Math.random() * size) + 0) ;
                            y = Math.floor((Math.random() * size) + 0) ;    
                            if(arr[y][x] === 0) 
                            {
                                arr[y][x] = nb;
                                break;
                            }
                        }
                    }
                }
                return arr;
            }

            function randomStart(size)
            {
                if(size < 2 || size > 10) size = 4;
                var arr = new Array(size);
                var i, j;
                for (i = 0; i < size; i+= 1) 
                {   
                    arr[i] = new Array(size);
                }
            //var arr = [[0,4,0,0],[16,0,0,0],[0,32,8,0],[0,0,0,0]];
            var x1 = Math.floor((Math.random() * size) + 0) ;
            var y1 = Math.floor((Math.random() * size) + 0) ;
            var nb1 = (Math.floor((Math.random() * 10) + 1) > 9 ) ? 4 : 2; 
            var x2 = x1;
            var y2 = y1;
            var nb2 = (Math.floor((Math.random() * 10) + 1) > 9 ) ? 4 : 2; 

            while( x1 === x2 && y1 === y2)
            {
                x2 = Math.floor((Math.random() * arr.length) + 0) ;
                y2 = Math.floor((Math.random() * arr.length) + 0) ;
            }

            $("#container").css({
                "width" : size * 122.25+"px",
                "height" : size * 122.25  - (size * 4) +"px",
            });

            $("#container").html("");
            for (i = 0; i < arr.length; i+= 1) 
            {
                for (j = 0; j < arr[i].length; j+= 1) 
                {
                    if(y1 === i && x1 === j) 
                    {
                        $("#container").append("<div class='case caseFilled c"+nb1+"'>"+nb1+"</div>");
                        arr[i][j] = nb1;
                    }   
                    else if(y2 === i && x2 === j)
                    {
                        $("#container").append("<div class='case caseFilled c"+nb2+"'>"+nb2+"</div>");
                        arr[i][j] = nb2;
                    } 
                    else 
                    {
                        $("#container").append("<div class='case'></div>");
                        arr[i][j] = 0;
                    }
                }   
            }
            return arr;
        }

        var array = randomStart(size);

        $(document).keydown(function(e)
        {
            if(e.keyCode === 82) 
            {
                var size = parseInt($("#gridSize").val());
                array = randomStart(size);
                resetScore();
                $("#win").css("display", "none");
                $("#lost").css("display", "none");
            }
            if(e.keyCode === 37) 
            {
                addChar = false;
                if(moveLeft(array)) addChar = true;
                if(merge(array, "left")) addChar = true;
                displayGrid(array);
                if(addChar) addRandomChar(array);
                displayGrid(array);
                if(win(array)) $("#win").css("display", "inline-block");
                if(gameOver(array)) $("#lost").css("display", "inline-block");
            }
            if(e.keyCode === 38) 
            {
                addChar = false;
                if(moveUp(array)) addChar = true;
                if(merge(array, "up")) addChar = true;
                displayGrid(array);
                if(addChar) addRandomChar(array);
                displayGrid(array);
                if(win(array)) $("#win").css("displSay", "inline-block");
                if(gameOver(array)) $("#lost").css("display", "inline-block");
            }
            if(e.keyCode === 39) 
            {
                addChar = false;
                if(moveRight(array)) addChar = true;
                if(merge(array, "right")) addChar = true;
                displayGrid(array);
                if(addChar) addRandomChar(array);
                displayGrid(array);
                if(win(array)) $("#win").css("display", "inline-block");
                if(gameOver(array)) $("#lost").css("display", "inline-block");
            }
            if(e.keyCode === 40) 
            {
                addChar = false;
                if(moveDown(array)) addChar = true;
                if(merge(array, "down")) addChar = true;
                displayGrid(array);
                if(addChar) addRandomChar(array);
                displayGrid(array);
                if(win(array)) $("#win").css("display", "inline-block");
                if(gameOver(array)) $("#lost").css("display", "inline-block");
            }
        });

$('#new').click(function() {
    var size = parseInt($("#gridSize").val());
    array = randomStart(size);
    $("#win").css("display", "none");
    $("#lost").css("display", "none");
});

function moveLeft(arr)
{
    var canMove = false;
    var i, j, k;
    for (i = 0; i < arr.length; i+= 1) 
    {
        for (j = 1; j < arr[i].length; j+= 1) 
        {
            if(arr[i][j] !== 0) 
            {
                for (k = 0; k < j; k+= 1) 
                {
                    if(arr[i][k] === 0) 
                    {
                        arr[i][k] = arr[i][j];
                        arr[i][j] = 0; 
                        canMove = true;
                        break;
                    }
                }
            } 
        }   
    }
    return canMove;
}

function moveRight(arr)
{
    var canMove = false;
    var i, j, k;
    for (i = 0; i < arr.length; i+= 1) 
    {
        for (j = arr[i].length - 2; j >= 0; j--) 
        {
            if(arr[i][j] !== 0) 
            {
                for (k = arr[i].length ; k > j; k--) 
                {
                    if(arr[i][k] === 0) 
                    {
                        arr[i][k] = arr[i][j];
                        arr[i][j] = 0; 
                        canMove = true;
                        break;
                    }
                }
            } 
        }   
    }
    return canMove;
}

function moveUp(arr)
{
    var canMove = false;
    var i, j, k;
    for (i = 0; i < arr.length; i+= 1) 
    {
        for (j = 1; j < arr[i].length ; j+= 1) 
        {
            if(arr[j][i] !== 0) 
            {
                for (k = 0; k < j; k+= 1) 
                {
                    if(arr[k][i] === 0) 
                    {
                        arr[k][i] = arr[j][i];
                        arr[j][i] = 0; 
                        canMove = true;
                        break;
                    }
                }
            } 
        }   
    }
    return canMove;
}

function moveDown(arr)
{
    var canMove = false;
    var i, j, k;
    for (i = 0; i < arr.length; i+= 1) 
    {
        for (j = arr[i].length - 1; j >= 0 ; j--) 
        {
            if(arr[j][i] !== 0) 
            {
                for (k = arr[i].length - 1; k > j; k--) 
                {
                    if(arr[k][i] === 0) 
                    {
                        arr[k][i] = arr[j][i];
                        arr[j][i] = 0; 
                        canMove = true;
                        break;
                    }
                }
            } 
        }   
    }
    return canMove;
}



function merge(arr, dir)
{
    var canMove = false;
    var i, j;
    if(dir === "left")
    {
        for (i = 0; i < arr.length; i+= 1) 
        {
            for (j = 0; j < arr[i].length; j+= 1) 
            {
                if(arr[i][j] === arr[i][j+1] && arr[i][j] !== 0)
                {
                    arr[i][j] = arr[i][j] + arr[i][j];
                    arr[i][j+1] = 0;
                    canMove = true;
                    editscore(arr[i][j]);
                }           
            }   
        }
        if(canMove) moveLeft(arr);
    }
    if(dir === "right")
    {
        for (i = 0; i < arr.length; i+= 1) 
        {
            for (j = arr[i].length - 2; j >= 0; j--) 
            {
                if(arr[i][j] === arr[i][j+1] && arr[i][j] !== 0)
                {
                    arr[i][j] = arr[i][j] + arr[i][j];
                    arr[i][j+1] = 0;
                    canMove = true;
                    editscore(arr[i][j]);
                }           
            }   
        }
        if(canMove) moveRight(arr);
    }
    if(dir === "up")
    {
        for (i = 0; i < arr.length; i+= 1) 
        {
            for (j = 0; j < arr[i].length - 1; j+= 1) 
            {
                if(arr[j][i] === arr[j+1][i] && arr[j][i] !== 0) 
                {
                    arr[j][i] = arr[j][i] + arr[j][i];
                    arr[j+1][i] = 0;
                    canMove = true;
                    editscore(arr[j][i]);
                } 
            }   
        }

        if(canMove) moveUp(arr);
    }
    if(dir === "down")
    {
        for (i = 0; i < arr.length; i+= 1) 
        {
            for (j = arr[i].length - 2; j >= 0; j--) 
            {
                if(arr[j][i] === arr[j+1][i] && arr[j][i] !== 0) 
                {
                    arr[j][i] = arr[j][i] + arr[j][i];
                    arr[j+1][i] = 0;
                    canMove = true;
                    editscore(arr[j][i]);
                } 
            }   
        }
        if(canMove) moveDown(arr);
    }
    return canMove;
}

function gameOver(arr)
{
    if(!gridFilled(arr)) return false;
    var i, j, k;
    for (i = 0; i < arr.length; i+= 1) //left
    {
        for (j = 0; j < arr[i].length; j+= 1) 
        {
            if(arr[i][j] === arr[i][j+1] && arr[i][j] !== 0) return false;
        }   
    }
    for (i = 0; i < arr.length; i+= 1) //right
    {
        for (j = arr[i].length - 2; j >= 0; j--) 
        {
            if(arr[i][j] === arr[i][j+1] && arr[i][j] !== 0) return false;
        }   
    }
    for (i = 0; i < arr.length; i+= 1) 
    {
        for (j = 0; j < arr[i].length - 1; j+= 1) //up
        {
            if(arr[j][i] === arr[j+1][i] && arr[j][i] !== 0) return false;
        }   
    }
    for (i = 0; i < arr.length; i+= 1) //down
    {
        for (j = arr[i].length - 2; j >= 0; j--) 
        {
            if(arr[j][i] === arr[j+1][i] && arr[j][i] !== 0) return false;
        }   
    }
    return true;
}   
});