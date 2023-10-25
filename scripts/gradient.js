let bug; // Declare object
var sizeSpeed = 0.3;
var baseMoveSpeed = 0.5;
var moveSpeed = 0.5;
var numColors = 5;
var baseColorSpeed = 0.005;
var colorSpeed = 0.005;
var edgeOffset;
var widthPossible;
var counter = 0;
var cnv;
var scrollingSpeed;
var scrollMultiplier = 0.5;
var colorMultiplier = 0.0025;
var weightedSizes = [
      { value: 250, weight: 1 },
      { value: 300, weight: 2 },
      { value: 400, weight: 3 },
      { value: 500, weight: 2 },
      { value: 600, weight: 1 }
    ];
var numCircles = 10;
var bugs = [];
var colors = [];
// Define function used to find weights.
function chooseWeighted(opts) {
  // get sum of all the weights.
  var sum = 0;
  for(var j = 0; j < opts.length; j++) {
   sum += opts[j].weight 
  }
  // now pick a random number between 0 and the sum of the weights
  var ran = random(sum);
  // loop through all the options until you find a weight that is greater
  // or equal to the random number. Subtract weight from random num every time.
  for( var i = 0; i < opts.length; i++){
    var opt = opts[i];
    if(opt.weight >= ran) {
      return opt.value;
    }
    ran -= opt.weight;
  }
}
function setup() {
  cnv = createCanvas(windowWidth * 1.4, windowHeight);
  cnv.parent("p5canvaswrap");
  cnv.style('display', 'block');
  cnv.style('pointer-events', 'none');
  cnv.style('position', 'fixed');
  cnv.style('left', windowWidth * -0.2 + 'px');
  cnv.style('top', '0');
  cnv.style('z-index', '-15');
  cnv.style('filter', 'blur(11em)');
  background("#0E0D0E");
  noStroke();
  colors.length = numColors + 1;
  colors[0] = color('#223D99');
  colors[1] = color('#4DA2D2');
  colors[2] = color('#8036BB');
  colors[3] = color('#6036BB');
  colors[4] = color('#1EC1AE');
  colors[5] = color('#20339B');
  for(var i = 0; i < numCircles; i++) {
    bugs.push(new Colorer());
    counter++;
  }
  widthPossible = windowWidth * 1.4 * 0.15;
  edgeOffset = windowWidth * 1.4 * 0.07;
}
function draw() {
  background("#0E0D0E");
  for(const i in bugs) {
    bugs[i].move();
    bugs[i].display();
  }
  var temp = baseMoveSpeed + (scrollingSpeed * scrollMultiplier);
  var temp2 = baseColorSpeed + (scrollingSpeed * colorMultiplier);
  moveSpeed = temp ? temp : baseMoveSpeed;
  colorSpeed = temp2 ? temp2 : baseColorSpeed;
  console.log(moveSpeed);
}
function windowResized() {
  resizeCanvas(windowWidth * 1.4, windowHeight);
  widthPossible = windowWidth * 1.4 * 0.15;
  edgeOffset = windowWidth * 1.4 * 0.07;
}
function getRandom(min, max) {
 	return Math.floor(Math.random() * (max - min) ) + min;
}
// Jitter class
class Colorer {
  constructor() {
    this.targetSize = chooseWeighted(weightedSizes);
    this.currColor = random(1, 3);
    this.y = random(height);
    this.diameter = chooseWeighted(weightedSizes);
    this.location = counter;
    this.x = this.location < 5 ? 0 : windowWidth * 1.4;
    console.log(this.x);
    this.targetX = this.x + 5;
    this.targetY = random(height);
  }
  move() {
    this.diameter += this.diameter > this.targetSize ? -sizeSpeed : sizeSpeed;
    if(this.currColor + colorSpeed >= numColors) {
      this.currColor = 0;
    }
    this.currColor += colorSpeed;
    if(Math.abs(this.diameter - this.targetSize) < sizeSpeed) {
      this.targetSize = chooseWeighted(weightedSizes);
    }
    this.x += this.x > this.targetX ? -moveSpeed : moveSpeed;
    this.y += this.y > this.targetY ? -moveSpeed : moveSpeed;
    if(Math.abs(this.x - this.targetX) < moveSpeed) {
      this.targetX = random(this.location < numCircles/2 ? -edgeOffset : windowWidth * 1.4 - widthPossible + edgeOffset, this.location < numCircles/2 ? widthPossible - edgeOffset : windowWidth * 1.4 + edgeOffset);
    }
    if(Math.abs(this.y - this.targetY) < moveSpeed) {
      this.targetY = random(height);
    }
  }
  display() {
    fill(lerpColor(colors[Math.trunc(this.currColor)], colors[Math.trunc(this.currColor) + 1], this.currColor - Math.trunc(this.currColor)));
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}