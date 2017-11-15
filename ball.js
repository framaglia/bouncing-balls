function Ball(x, y, m) {

	this.mass = m;
	this.position = createVector(x, y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
   this.friction = map(this.mass, 20, 40, 0.1, 0.4);
	this.col = [random(0,255), random(0,100), random(0,255)];

	this.display = function() {
		fill(this.col[0], this.col[1], this.col[2]);
		stroke(2);
		ellipse(this.position.x, this.position.y, this.mass, this.mass);
	}

	this.applyForce = function(acceleration) {
      // A = F / M
		var acc = p5.Vector.div(acceleration, this.mass);
		this.acceleration.add(acc);
	}

	this.update = function() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	this.bounce = function() {
		if (this.position.y + this.mass/2 > height) {
         this.position.y = height - this.mass/2;
         // The bounce
         this.velocity.y *= -1 + this.friction;
         // The rolling friction
         if(this.velocity.x > 0 || this.velocity.x < 0) {
            var friction = createVector(-(this.velocity.x * this.friction/10), 0);
            this.velocity.add(friction);
         }
    	}
      if (this.position.y + this.mass/2 < 0) {
         this.position.y = this.mass/2;
         // The bounce
         this.velocity.y *= -1 + this.friction;
      }
    	if (this.position.x + this.mass/2 > width) {
			this.position.x = width - this.mass/2;
    		this.velocity.x *= -1 + this.friction;
    	}
    	if(this.position.x - this.mass/2 < 0) {
    		this.position.x = this.mass/2;
    		this.velocity.x *= -1 + this.friction;
    	}
	}
}