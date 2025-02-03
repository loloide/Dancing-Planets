//README
//After you hit play, press spacebar to start and pause
//set the two planets you want to see dancing by seting planetA and planet B
//if their orbits are out of view or too small you can change the value of `a`
//`skip` is made to skip lines when drawing, if the drawing is too dense you can increase the amout of skipped lines 
const planets = {
  mercury: {
    name: "mercury",
    radius: 0.39, 
    speed: 1/0.24,
    angle: 0     
  },
  venus: {
    name: "venus",
    radius: 0.7, 
    speed: 1/0.615,
    angle: 0     
  },
  earth: {
    name: "earth",
    radius: 1,
    speed: 1/1,
    angle: 0    
  },
  mars: {
    name: "mars",
    radius: 1.5, 
    speed: 1/1.88, 
    angle: 0    
  },
  jupiter: {
    name: "jupiter",
    radius: 5.2, 
    speed: 1/11.86, 
    angle: 0    
  },
  saturn: {
    name: "saturn",
    radius: 9.5, 
    speed: 1/29.4, 
    angle: 0    
  },
  uranus: {
    name: "uranus",
    radius: 19.2, 
    speed: 1/84,
    angle: 0     
  },
  neptune: {
    name: "neptune",
    radius: 30.1, 
    speed: 1/165,
    angle: 0     
  }
};

let selectA, selectB, skipInput;

let isMoving = false;
let skip = 2

let canvasSize = 600; // Adjust based on available space

function setup() {
  createCanvas(canvasSize, canvasSize);
  
  let p = createP('Select the planets and a skip value (in case you need less lines).');
  selectA = createSelect();
  selectB = createSelect();
  
  for (let planet in planets) {
    selectA.option(planet);
    selectB.option(planet);
  }
  selectA.selected('earth');
  selectB.selected('venus');
  selectA.changed(resetCanvas)
  selectB.changed(resetCanvas)
  
  skipInput = createInput("2", "number")
  
  let p2 = createP('after you selected the planets, press start');
  let pausePlayButton = createButton("start/stop");
  pausePlayButton.mousePressed(()=>{isMoving = !isMoving});
  let resetButton = createButton("Clear");
  resetButton.mousePressed(resetCanvas);

  let p3 = createP('if you like how it looks you can save it!');
  let saveButton = createButton("save");
  saveButton.mousePressed(savePlanets);
}

function draw() {
  let planetA = planets[selectA.selected()];
  let planetB = planets[selectB.selected()];
  skip = skipInput.value() 
  
  translate(width / 2, height / 2); // Center the canvas

  // **Find the largest radius among selected planets**
  let maxRadius = Math.max(planetA.radius, planetB.radius);
  let maxDisplaySize = canvasSize * 0.45; // Fixed max size on canvas
  let a = maxDisplaySize / maxRadius; // Scale everything relative to maxRadius

  let maxPeriod = Math.max(planetA.radius, planetB.radius);
  let speed = 25/maxPeriod

  noFill();
  stroke(0);

  // **Draw orbits** (scaled proportionally)
  ellipse(0, 0, planetA.radius * 2 * a);
  ellipse(0, 0, planetB.radius * 2 * a);

  // **Calculate planet positions**
  let planetAX = planetA.radius * a * cos(planetA.angle);
  let planetAY = planetA.radius * a * sin(planetA.angle);
  let planetBX = planetB.radius * a * cos(planetB.angle);
  let planetBY = planetB.radius * a * sin(planetB.angle);

  // **Draw planets**
  fill(50, 100, 200);
  noStroke();
  //ellipse(planetAX, planetAY, 10);

  fill(255, 165, 0);
  noStroke();
  //ellipse(planetBX, planetBY, 10);

  // **Update movement if enabled**
  if (isMoving) {
    planetA.angle -= planetA.speed / speed;
    planetB.angle -= planetB.speed / speed;

    if (frameCount % skip == 0) {
      stroke("#000000");
      line(planetAX, planetAY, planetBX, planetBY);
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    isMoving = !isMoving;
  }
  if (key === "s") {
    savePlanets()  
  }
}      

function savePlanets() {
  saveCanvas(planets[selectA.selected()].name + " - " + planets[selectB.selected()].name, "png")
  
}

function resetCanvas() {
  background("#ffffff")
  for (var planet of Object.values(planets)) {
  planet.angle = 0;
}
}
