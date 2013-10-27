/*
	The MIT License (MIT)

	Copyright (c) 2013 Santiago Castillo

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

// Used to avoid polluting the namespace.
var Morrocoi = Morrocoi || {};

// Constants
Morrocoi.COLORS = ["red", "yellow", "blue", "green"];

$(document).ready(function(){
	// Load the stories.
	for(var i = 0; i < Morrocoi.cuentos.list.length; i ++){
		$('#cuentos').append(Morrocoi.cuentos.parse(Morrocoi.cuentos.list[i]));
	}

	// Randomize the dates colors.
	$('div.story .date').each(function(){
		var color = Morrocoi.COLORS[Math.floor(Math.random() * Morrocoi.COLORS.length)];
		$(this).addClass(color);
	});
	
	// Setup the canvas.
	var canvas = document.getElementById('funBackground');
	Morrocoi.background.setUp(canvas);
});

$(document).scroll(
	(function(){
		var offset = 0;
		return function(event){
			Morrocoi.background.addOffset($(document).scrollTop() - offset);
			offset = $(document).scrollTop();
		};
	})()
);