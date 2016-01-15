"use strict";
$(document).ready(function(){
	$("body").append('<div id="container"></div>');
	var size = parseInt($("#gridSize").val());

	$('.icon-ok').click(function() {
		size = parseInt($("#gridSize").val());
		array = randomStart(size);
		resetScore();
	});
	var score = 0;

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
	editscore(0);
	function displayGrid(arr)
	{
		$("#container").html("");
		for (var i = 0; i < arr.length; i++) 
		{
			for (var j = 0; j < arr[i].length; j++) 
			{
				if(arr[i][j] != 0) 
				{
					$("#container").append("<div class='case caseFilled c"+arr[i][j]+"'>"+arr[i][j]+"</div>");
				}	
				else $("#container").append("<div class='case'></div>");
			}	
		}
		return arr;	
	}

	function gridFilled  (arr)
	{
		var over = true;
		for (var i = 0; i < arr.length; i++) 
		{
			for (var j = 0; j < arr[i].length; j++)  if(arr[i][j] == 0) over = false; 
		}
	return over;
}

function addRandomChar(arr)
{
	var nb = (Math.floor((Math.random() * 10) + 1) > 9 ) ? 4 : 2;
	var x = Math.floor((Math.random() * size) + 0) ;
	var y = Math.floor((Math.random() * size) + 0) ;

	if(!gridFilled  (arr))
	{ 
		if(arr[y][x] == 0) arr[y][x] = nb;
		else
		{
			while(1)
			{	
				x = Math.floor((Math.random() * size) + 0) ;
				y = Math.floor((Math.random() * size) + 0) ;	
				if(arr[y][x] == 0) 
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

	for (var i = 0; i < size; i++) 
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

			while( x1 == x2 && y1 == y2)
			{
				x2 = Math.floor((Math.random() * arr.length) + 0) ;
				y2 = Math.floor((Math.random() * arr.length) + 0) ;
			}

			$("#container").css({
				"width" : size * 122.25+"px",
				"height" : size * 122.25  - (size * 4) +"px",
			});

			$("#container").html("");
			for (var i = 0; i < arr.length; i++) 
			{
				for (var j = 0; j < arr[i].length; j++) 
				{
					if(y1 == i && x1 == j) 
					{
						$("#container").append("<div class='case caseFilled c"+nb1+"'>"+nb1+"</div>");
						arr[i][j] = nb1;
					}	
					else if(y2 == i && x2 == j)
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
			if(e.keyCode == 82) 
			{
				var size = parseInt($("#gridSize").val());
				array = randomStart(size);
				resetScore();
			}
			if(e.keyCode == 37) 
			{
				var addChar = false;
				if(moveLeft(array)) addChar = true;
				if(merge(array, "left")) addChar = true;
				displayGrid(array);
				if(addChar) addRandomChar(array);
				displayGrid(array);
			}
			if(e.keyCode == 38) 
			{
				var addChar = false;
				if(moveUp(array)) addChar = true;
				if(merge(array, "up")) addChar = true;
				displayGrid(array);
				if(addChar) addRandomChar(array);
				displayGrid(array);
			}
			if(e.keyCode == 39) 
			{
				var addChar = false;
				if(moveRight(array)) addChar = true;
				if(merge(array, "right")) addChar = true;
				displayGrid(array);
				if(addChar) addRandomChar(array);
				displayGrid(array);
			}
			if(e.keyCode == 40) 
			{
				var addChar = false;
				if(moveDown(array)) addChar = true;
				if(merge(array, "down")) addChar = true;
				displayGrid(array);
				if(addChar) addRandomChar(array);
				displayGrid(array);
			}
		});

$('#new').click(function() {
	var size = parseInt($("#gridSize").val());
	array = randomStart(size);
});

function moveLeft(arr)
{
	var canMove = false;
	for (var i = 0; i < arr.length; i++) 
	{
		for (var j = 1; j < arr[i].length; j++) 
		{
			if(arr[i][j] != 0) 
			{
				for (var k = 0; k < j; k++) 
				{
					if(arr[i][k] == 0) 
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
	for (var i = 0; i < arr.length; i++) 
	{
		for (var j = arr[i].length - 2; j >= 0; j--) 
		{
			if(arr[i][j] != 0) 
			{
				for (var k = arr[i].length ; k > j; k--) 
				{
					if(arr[i][k] == 0) 
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
	for (var i = 0; i < arr.length; i++) 
	{
		for (var j = 1; j < arr[i].length ; j++) 
		{
			if(arr[j][i] != 0) 
			{
				for (var k = 0; k < j; k++) 
				{
					if(arr[k][i] == 0) 
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
	for (var i = 0; i < arr.length; i++) 
	{
		for (var j = arr[i].length - 1; j >= 0 ; j--) 
		{
			if(arr[j][i] != 0) 
			{
				for (var k = arr[i].length - 1; k > j; k--) 
				{
					if(arr[k][i] == 0) 
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
	if(dir == "left")
	{
		for (var i = 0; i < arr.length; i++) 
		{
			for (var j = 0; j < arr[i].length; j++) 
			{
				if(arr[i][j] == arr[i][j+1] && arr[i][j] != 0)
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
	if(dir == "right")
	{
		for (var i = 0; i < arr.length; i++) 
		{
			for (var j = arr[i].length - 2; j >= 0; j--) 
			{
				if(arr[i][j] == arr[i][j+1] && arr[i][j] != 0)
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
	if(dir == "up")
	{
		for (var i = 0; i < arr.length; i++) 
		{
			for (var j = 0; j < arr[i].length - 1; j++) 
			{
				if(arr[j][i] == arr[j+1][i] && arr[j][i] != 0) 
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
	if(dir == "down")
	{
		for (var i = 0; i < arr.length; i++) 
		{
			for (var j = arr[i].length - 2; j >= 0; j--) 
			{
				if(arr[j][i] == arr[j+1][i] && arr[j][i] != 0) 
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
});