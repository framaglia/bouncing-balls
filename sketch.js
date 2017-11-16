var balls = [];
var controller;
var frame;

function setup() {
	createCanvas(windowWidth/2, windowHeight/2);
	forceRHand = createVector(0, -150);
	forceLHand = createVector(0, -150);
	forceRKey = createVector(100, 0);
	forceLKey = createVector(-100, 0);
	forceUKey = createVector(0, -300);
	controller = new Leap.Controller();
	controller.connect();
	for (var i = 10; i > 0; i--) {
		balls[i] = new Ball(random(10, width), height - 200, random(20, 40));
	}
}
 
function draw() {
	background(160);
	frame = controller.frame();
	for(var i = balls.length - 1; i > 0; i--) {
      if (frame.hands.length == 1) {
         balls[i].applyForce(forceHand);
      } else if (frame.hands.length == 2) {
         balls[i].applyForce(forceHand);
         balls[i].applyForce(forceHand);
      }
		var gravity = createVector(0, balls[i].mass);
		balls[i].applyForce(gravity);
		balls[i].update();
		balls[i].display();
		balls[i].bounce();
	}
}

function keyPressed() {
	switch(keyCode) {
    	case LEFT_ARROW:
    		applyForceToBalls(forceLKey); 
        	break;
   	case RIGHT_ARROW:
      	applyForceToBalls(forceRKey);
      	break;
      case UP_ARROW:
      	applyForceToBalls(forceUKey);
      	break;
	}
}

function applyForceToBalls(force) {
	for(var i = balls.length - 1; i > 0; i--) {
		balls[i].applyForce(force);
	}  
}

