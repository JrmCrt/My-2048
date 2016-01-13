$(document).ready(function(){
	"use strict";
	$("body").append('<div id="container"></div>');
	var size = parseInt($("#gridSize").val());

	$('.icon-ok').click(function() {
		size = parseInt($("#gridSize").val());
		array = randomStart(size);
	});

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

	function gameOver(arr)
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
		//var nb = 8;
		var x = Math.floor((Math.random() * size) + 0) ;
		var y = Math.floor((Math.random() * size) + 0) ;

		if(!gameOver(arr))
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
		}
		if(e.keyCode == 37) 
		{
			array = moveLeft(array);
		}
		if(e.keyCode == 39) 
		{
			array = moveRight(array);
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
						else if(arr[i][k] == arr[i][j]) 
						{
							var canMerge = true;
							for (var l = k + 1; l < j; l++) 
							{
								console.log(arr[i][l]);
								if (arr[i][l] != 0) canMerge = false;
							}
							console.log(arr[i]);
							if(canMerge)
							{
								arr[i][k] = arr[i][j] + arr[i][k];
								arr[i][j] = 0; 
								canMove = true;
								break;	
							}	
						}
					}
				} 
			}	
		}
		if(canMove) arr = addRandomChar(arr);
		displayGrid(arr);
		return arr;
	}
});