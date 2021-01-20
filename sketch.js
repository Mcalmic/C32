const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;
var lastPositionX, lastPositionY;

var birdsArray = [];

var gameState = "notLaunched"

var score = 0;

function preload() {
    
    getBackgroundImage();

}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig2 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird1 = new Bird(100, 30);
    bird2 = new Bird(80, 180);
    bird3 = new Bird(30, 180);
    birdsArray.push(bird3);
    birdsArray.push(bird2);
    birdsArray.push(bird1);

    log6 = new Log(230,180,80, PI/2);
    slingshot = new Slingshot(bird1.body, {x: 200, y: 50});
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    Engine.update(engine);
    noStroke();
    fill("White")
    textSize(25);
    text(score, 1000, 50);
    strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird1.display();
    bird2.display();
    bird3.display();
    platform.display();
    slingshot.display();    
}

function mouseDragged(){
    if(gameState === "notLaunched"){

        Matter.Body.setPosition(birdsArray[birdsArray.length - 1].body, {x:mouseX, y:mouseY})
        //Matter.Body.applyForce(birdsArray[birdsArray.length - 1].body,
         //    birdsArray[birdsArray.length - 1].body.position, {x:5, y:5});

    }

}

function mouseReleased(){

    slingshot.fly();
    birdsArray.pop();
    gameState = "launched"

}

function keyPressed(){

    if(keyCode === 32){

        Matter.Body.setPosition(birdsArray[birdsArray.length - 1].body, {x: 150, y:30})
        slingshot.attach(birdsArray[birdsArray.length - 1].body);
        gameState = "notLaunched"
        birdsArray[birdsArray.length - 1].body.trajectory = [];

    }

}

async function getBackgroundImage(){

    var response = await fetch("https://worldtimeapi.org/api/timezone/America/Los_Angeles");
    var responseJson = await response.json();

    var dateTime = responseJson.datetime;

    var hour = dateTime.slice(11, 13);

    console.log(hour);

    if(hour >= 8 && hour <= 20){

        backgroundImg = loadImage("sprites/bg.png");

    } else {

        backgroundImg = loadImage("sprites/bg2.jpg");
    }
}