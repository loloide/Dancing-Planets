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
let showPlanets = false;
let skip = 1

let canvasSize = 600; // Adjust based on available space

function setup() {
  createCanvas(canvasSize, canvasSize);
  
  let div1 = createDiv().class("section");
  createP('Select the planets and a skip value (in case you need less lines).').parent(div1);
  
  selectA = createSelect().class("spaced-button").parent(div1);
  selectB = createSelect().class("spaced-button").parent(div1);
  
  for (let planet in planets) {
    selectA.option(planet);
    selectB.option(planet);
  }
  selectA.selected('earth');
  selectB.selected('venus');
  selectA.changed(resetCanvas);
  selectB.changed(resetCanvas);
  
  skipInput = createInput("1", "number").class("spaced-button").parent(div1);
  
  // Create buttons inside divs for spacing
  let showPlanetsButton = createButton("Toggle show planets").class("spaced-button").parent(div1);
  showPlanetsButton.mousePressed(() => { showPlanets = !showPlanets });

  let div2 = createDiv().class("section");
  createP('After you selected the planets, press start').parent(div2);
  
  let pausePlayButton = createButton("Start/Stop").class("spaced-button").parent(div2);
  pausePlayButton.mousePressed(() => { isMoving = !isMoving });

  let resetButton = createButton("Clear").class("spaced-button").parent(div2);
  resetButton.mousePressed(resetCanvas);

  let div3 = createDiv().class("section");
  createP('If you like how it looks, you can save it!').parent(div3);
  
  let saveButton = createButton("Save").parent(div3);
  saveButton.mousePressed(savePlanets);
}



function draw() {
  let planetA = planets[selectA.selected()];
  let planetB = planets[selectB.selected()];
  skip = skipInput.value() 
  
  translate(width / 2, height / 2); 

  let maxRadius = Math.max(planetA.radius, planetB.radius);
  let maxDisplaySize = canvasSize * 0.45; 
  let a = maxDisplaySize / maxRadius; 

  let maxPeriod = Math.max(planetA.radius, planetB.radius);
  let speed = 25/maxPeriod

  noFill();
  stroke(0);

  ellipse(0, 0, planetA.radius * 2 * a);
  ellipse(0, 0, planetB.radius * 2 * a);

  let planetAX = planetA.radius * a * cos(planetA.angle);
  let planetAY = planetA.radius * a * sin(planetA.angle);
  let planetBX = planetB.radius * a * cos(planetB.angle);
  let planetBY = planetB.radius * a * sin(planetB.angle);

  if (showPlanets) {
    fill("#ff5d00");
    noStroke();
    ellipse(planetAX, planetAY, 10);

    fill("#0065ff");
    noStroke();
    ellipse(planetBX, planetBY, 10);
  }
  

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
