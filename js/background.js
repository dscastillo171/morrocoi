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
Morrocoi.background = {};

// Constants.
Morrocoi.background.NUMBER_OF_CIRCLES = 13;
Morrocoi.background.MAX_RADIOUS = 220;
Morrocoi.background.MIN_RADIOUS = 130;
Morrocoi.background.CIRCLE_SPEED = 0.07;
Morrocoi.background.COLORS = ["rgba(242, 115, 117,", "rgba(233, 228, 127,", "rgba(132, 186, 242,", "rgba(144, 218, 102,"];
Morrocoi.background.MAX_OPACITY = 0.55;
Morrocoi.background.MIN_OPACITY = 0.25;

/**
 * Return a new random circle.
 */
Morrocoi.background.newCircle = function(screenWidth, screenHeight){
	var circle = Object.create({}, {
		"radius": {
			value: 0,
			writable: true
		}, 
		"color": {
			value: 'white',
			writable: true
		},
		"xCoordinate": {
			value: 0,
			writable: true
		},
		"yCoordinate": {
			value: 0,
			writable: true
		},
		"xSpeed":{
			value: 0,
			writable: true
		},
		"ySpeed":{
			value: 0,
			writable: true
		},
		"goingEast":{
			value: true,
			writable: true
		},
		"randomize": {
			value: function(){
				var opacity = Math.random() * (Morrocoi.background.MAX_OPACITY - Morrocoi.background.MIN_OPACITY)
					+ Morrocoi.background.MIN_OPACITY;
				this.radius = Math.random() * (Morrocoi.background.MAX_RADIOUS - Morrocoi.background.MIN_RADIOUS)
					+ Morrocoi.background.MIN_RADIOUS;
				this.color = Morrocoi.background.COLORS[Math.floor(Math.random() * Morrocoi.background.COLORS.length)] + opacity + ')';
				this.xCoordinate = Math.random() * screenWidth;
				this.yCoordinate = (Math.random() * screenHeight) + 1;
				this.xSpeed = Math.random();
				this.ySpeed = Math.random();
				this.goingEast = Math.random() >= 0.5;
			}
		},
		"draw": {
			value: function(context){
				context.beginPath();
				context.arc(this.xCoordinate, this.yCoordinate, this.radius, 0, 2 * Math.PI, false);
				context.fillStyle = this.color;
				context.fill();
			}
		},
		"update":{
			value: function(){
				this.yCoordinate -= Morrocoi.background.CIRCLE_SPEED * this.ySpeed;
				if(this.goingEast){
					this.xCoordinate += Morrocoi.background.CIRCLE_SPEED * this.xSpeed;
				} else{
					this.xCoordinate -= Morrocoi.background.CIRCLE_SPEED * this.xSpeed;
				}
				
				if(this.xCoordinate + this.radius < 0 || this.xCoordinate - this.radius > screenWidth || this.yCoordinate + this.radius < 0){
					this.randomize();
					this.yCoordinate = screenHeight + this.radius;
				} else if (this.yCoordinate - this.radius > screenHeight){
					this.randomize();
					this.yCoordinate = -this.radius;
				}
			}
		}
	});
	
	return circle;
};

Morrocoi.background.setUp = function(canvas){
	// Make sure the parameter is a canvas element.
	if(typeof(canvas) !== 'undefined' && (canvas.nodeName && canvas.nodeName.toLowerCase() === 'canvas')){
		// Make the canvas full screen.
		canvas.width = window.screen.width;
		canvas.height = window.screen.height;
		
		// Get the drawing context.
		var context = canvas.getContext('2d');
		
		// Initialize the array of circles.
		var circles = [];
		for(var i = 0; i < Morrocoi.background.NUMBER_OF_CIRCLES; i++){
			circles[i] = Morrocoi.background.newCircle(canvas.width, canvas.height);
			circles[i].randomize();
		}
		
		// Drawing function.
		var draw = function(){
			// Clear the canvas.
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			// Draw the circles.
			for(var i = 0; i < circles.length; i++){
				circles[i].update();
				circles[i].draw(context);
			}
			
			// Setup the next drawing cicle.
			Morrocoi.requestAnimationFrame(draw);
		};
		
		// Start the animation.
		Morrocoi.requestAnimationFrame(draw);
		
		// Add the given offset to each bubble.
		var addOffset = function(offset){
			for(var i = 0; i < circles.length; i++){
				circles[i].yCoordinate -= offset * circles[i].ySpeed;
				circles[i].xCoordinate -= offset * circles[i].xSpeed * 0.1;
			}
		};
		Morrocoi.background.addOffset = addOffset;
	}
};

