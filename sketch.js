

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var treePos_y;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;


var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;
var lamppost;
var lamppostlight;

var game_score;
var flagpole; 
var lives;
var platforms;

var jumpSound;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.mp3');
    jumpSound.setVolume(0.05);


    dark = loadSound('assets/dark.mp3')
    skylevel = loadImage('assets/skylevel.jpg')

}


function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    lives = 4;
    dark.loop();
    dark.setVolume(0.4);
    startGame()

}


// Function to restart character 
function startGame()
{
angleMode(DEGREES);
gameChar_x = width/2;
gameChar_y = floorPos_y;

treePos_y = 460;
    
// Variable to control the background scrolling.
scrollPos = 0;

// Variable to store the real position of the gameChar in the game
// world. Needed for collision detection.
gameChar_world_x = gameChar_x - scrollPos;

// Boolean variables to control the movement of the game character.
isLeft = false;
isRight = false;
isFalling = false;
isPlummeting = false;

//lamppost

lamppost = 
[

{pos_x: 200,
pos_y: 520},


{pos_x: 200,
pos_y: 520},

{pos_x: -110,
pos_y: 420},



{pos_x: 2585,
pos_y: 450},

{pos_x: 3100,
pos_y : 500},


{pos_x: 3400,
pos_y : 450},

{pos_x: -3800,
    pos_y : 450},
]

lamppostlight = 
[

{pos_x: 2600,
    pos_y : 350},

    {pos_x: 3114,
        pos_y : 400},


        {pos_x: 3414,
            pos_y : 350},
            

            {pos_x: -3786,
                pos_y : 350},
    
]

// Initialise arrays of scenery objects.

trees_x = [-500,300,900,-1400, 1490,-3900];

clouds = 
[
{pos_x : 646, 
pos_y : 102,
width : 0,
height : 0},
         
{pos_x : 200, 
pos_y : 150,
width : 20,
height : 10},

{pos_x : 500, 
pos_y : 200,
width : 0,
height : 0},
    
{pos_x : 1100, 
pos_y : 90,
width : 0,
height : 0},

{pos_x : -1100, 
pos_y : 90,
width : 0,
height : 0},

{pos_x : 2000, 
pos_y : 90,
width : 0,
height : 0},

{pos_x : 2850, 
pos_y : 90,
width : 0,
height : 0},

{pos_x : 2500, 
pos_y : 90,
width : 0,
height : 10},

{pos_x : 3000, 
pos_y : 150,
width : 50,
height : 10},

{pos_x : 1800, 
pos_y : 180,
width : 0,
height : 0},
        
{pos_x : 1300, 
pos_y : 150,
width : 0,
height : 0},
    
    
{pos_x : -400, 
pos_y : 150,
width : 70,
height : 20},


{pos_x : -4200, 
    pos_y : 150,
    width : 70,
    height : 20},

    {pos_x : -4300, 
        pos_y : 200,
        width : 70,
        height : 20},

]

collectables =
[
{
x_pos : -500,
y_pos : 100,
width : 5,
height : 5,
isFound : false,
},
  
{
x_pos : -1400,
y_pos : 100,
width : 5,
height : 5,
isFound : false,
},

{
x_pos : 1600,
y_pos : 100,
width : 5,
height : 5,
isFound : false,
},    
]


mountains = 
[
{pos_x : 680,
width : 0,
height : 0},
    
{pos_x : 1300,
width : 200,
height : 50},

{pos_x : 3200,
width : 200,
height : 50},

{pos_x : 3500,
width : 10,
height : 0},

    

{pos_x : -700,
width : 50,
height : 10},    
    
    
{pos_x : -2500,
width : 800,
height : 50},    

{pos_x : -4500,
    width : 800,
    height : 50},
    
    {pos_x : -4800,
        width : 200,
        height : 50},  
        

]

canyons = 
[
{
pos_x : -900,
width : 150
},

{
pos_x : -2500,
width : 150
},
    
    
{
pos_x : 50,
width : 100
},

{
pos_x : 500,
width : 90,
},

{
pos_x : -1500,
width : 130,
},

{
pos_x : -1350,
width : 130,
},

{
pos_x : 630,
width : 130,
},


{
pos_x : 780,
width : 40,
},

{
pos_x : 1500,
width : 40,
},

{
pos_x : 1600,
width : 100,
},

{
pos_x : 1790,
width : 40,
},

{
pos_x : 1900,
width : 150,
},

{
pos_x :2100,
width : 160,
},

{
pos_x : 1100,
width : 90,
},

{
    pos_x:-6000,
    width : 1500
}
]

flagpole = { 
pos_x: 0 ,
isReached: false,}

flagpole = {
pos_x: -5700,
isReached: false,
}

game_score = 0;


lives -= 1;

platforms = [];



platforms.push(createPlatform(-4100,floorPos_y - 100,100));

platforms.push(createPlatform(-4230,floorPos_y - 120,80));

platforms.push(createPlatform(-4350,floorPos_y - 80,30));

platforms.push(createPlatform(-4420,floorPos_y - 100,40));

platforms.push(createPlatform(-4480,floorPos_y - 180,50));

platforms.push(createPlatform(-4510,floorPos_y - 200,20));

platforms.push(createPlatform(-4650,floorPos_y - 200,20));

platforms.push(createPlatform(-4800,floorPos_y - 240,40));

platforms.push(createPlatform(-5050,floorPos_y - 240,70));

platforms.push(createPlatform(-5200,floorPos_y - 260,20));

platforms.push(createPlatform(-5450,floorPos_y - 270,70));

}

function draw()
{
        noStroke();
        background(69, 68, 87); //fill the sky
        
        noStroke();
        fill(125, 100, 134);
        rect(0, floorPos_y, width, height/4); //ground

        fill(0);
        text (mouseX + "," + mouseY, mouseX, mouseY); 

    
push();

        translate(scrollPos,0);

//    angleMode(RADIANS);
      //Background Decoration
        fill(214,165,148,30)
        arc(0, 0, 300, 300, 180,90);

        // fill(214,165,148,100)
        arc(0, 0, 300, 300, 90,180);
    
        // fill(199,144,136,30)
        arc(0, 0, 350, 400, 180,90);

        fill(199,144,136,30)
        arc(0, 0, 350, 400, 90,180);
    
        // fill(195,141,136,100)
        arc(0, 0, 450, 490, 180,90);

        // fill(195,141,136,100)
        arc(0, 0, 450, 490, 90,180);
    
        fill(187,136,132,30)
        arc(0, 0, 540, 580, 180,90);
    
        // fill(187,136,132,100)
        arc(0, 0, 540, 580, 90,180);
    
        // fill(170,126,112,100)
        arc(0, 0, 1000, 670, 180,90);

        // fill(170,126,112,100)
        arc(0, 0,1000, 670, 90,180);
    
        // fill(150,90,18,100)
        arc(0, 0, 1500, 900, 180,90);

        // fill(150,90,18,100)
        arc(0, 0, 1500, 900, 90,180);

        // fill(120,87,90,10)
        fill(120,87,90,35)
        arc(0, 0, 1700, 1200, 180,90);
        arc(0, 0, 1700, 1200, 90,180);
    
        // fill(120,87,90,10)
        fill(120,87,90,50)
        arc(0, 0, 2000, 1500, 180,90);
        arc(0, 0, 2000, 1500, 90,180);
    
        //purple background

        fill(11, 5, 18,10)
        arc(-2000, 0, 1400, 490, 180,90);
        arc(-2000, 0, 1400, 490, 90,180);

        fill(48, 25, 79,12)
        arc(-2000, 0, 1600, 700, 180,90);
        arc(-2000, 0, 1600, 700, 90,180);
        
        fill(63, 35, 102,20)
        arc(-2000, 0, 1800, 1000, 180,90);
        arc(-2000, 0, 1800, 1000, 90,180);

        fill(112, 72, 168,10)
        arc(-2000, 0, 2300, 1600, 180,90);
        arc(-2000, 0, 2300, 1600, 90,180);

        fill(112, 72, 168,15)
        arc(-2000, 0, 2100, 1400, 180,90);
        arc(-2000, 0, 2100, 1400, 90,180);

        fill(112, 72, 168,10)
        arc(-2000, 0, 3000, 1900, 180,90);
        arc(-2000, 0, 3000, 1900, 90,180);

        fill(112, 72, 168,5)
        arc(-2000, 0, 3500, 2400, 180,90);
        arc(-2000, 0, 3500, 2400, 90,180);


        // black background
        
        fill(0, 0, 0,255)
        arc(3000, 0, 1900, 400, 180,90);
        arc(3000, 0, 1900, 400, 90,180);

        fill(10, 10, 10,190)
        arc(3000, 0, 2300, 700, 180,90);
        arc(3000, 0, 2300, 700, 90,180);
        
        fill(15, 15, 15,70)
        arc(3000, 0, 2500, 1000, 180,90);
        arc(3000, 0, 2500, 1000, 90,180);

      
        fill(19, 19, 19,90)
        arc(3000, 0, 2700, 1600, 180,90);
        arc(3000, 0, 2700, 1600, 90,180);

        fill(19, 19, 19,90)
        arc(3000, 0, 3400, 1400, 180,90);
        arc(3000, 0, 3400, 1400, 90,180);

        fill(19, 19, 19,90)
        arc(3000, 0, 3900, 1900, 180,90);
        arc(3000, 0, 3900, 1900, 90,180);

        fill(19, 19, 19,90)
        arc(3000, 0, 4700, 2400, 180,90);
        arc(3000, 0, 4700, 2400, 90,180);


        //blue background

        
        fill(173, 216, 230,60)
        arc(-5000, 0, 1400, 490, 180,90);
        arc(-5000, 0, 1400, 490, 90,180);

        fill(173, 216, 230,40)
        arc(-5000, 0, 1600, 700, 180,90);
        arc(-5000, 0, 1600, 700, 90,180);
        
        fill(173, 216, 230,30)
        arc(-5000, 0, 1800, 1000, 180,90);
        arc(-5000, 0, 1800, 1000, 90,180);

        fill(173, 216, 230,21)
        arc(-5000, 0, 2300, 1600, 180,90);
        arc(-5000, 0, 2300, 1600, 90,180);

        fill(173, 216, 230,17)
        arc(-5000, 0, 2100, 1400, 180,90);
        arc(-5000, 0, 2100, 1400, 90,180);

        fill(173, 216, 230,14)
        arc(-5000, 0, 3000, 1900, 180,90);
        arc(-5000, 0, 3000, 1900, 90,180);

        fill(173, 216, 230,10)
        arc(-5000, 0, 3500, 2400, 180,90);
        arc(-5000, 0, 3500, 2400, 90,180);


        //extra shadows
        fill(0,0,0,190);
        quad(-3000,300, -3020,300, -3025,floorPos_y + 20, -3015,floorPos_y + 20);
        push();
        translate(0,210);
        rotate(4);
        noFill();
        fill(0,0,0,190);
        rect(-3120,210,190,90);

        quad(-3000, floorPos_y + 20, -2990, floorPos_y + 20,- 3100, floorPos_y + 90,-3150,floorPos_y + 90);
        image(skylevel, -3100,215,150,80);
        quad(-3200,floorPos_y + 90,-3000,floorPos_y + 90,-3100,floorPos_y + 150,-3300,floorPos_y + 130)
      
        pop();

	// Draw clouds.
    
        drawClouds();


    //Draw eclipse

        fill(255);  
        ellipse(170,108, 100,100);
        fill(219, 115, 59,50);
        ellipse(171,108, 97,100);
        
        fill(140, 75, 39,50);
        ellipse(175,108, 102,100);
        
        fill(140, 71, 34,50);
        ellipse(174,108, 97,100);
        
        fill(100,150);
        ellipse(177,108, 97,100);
        
        fill(70);
        ellipse(182,108, 80,100);
        
        fill(0,0,0,100)
        ellipse(175,108, 100,100);
        noStroke();
        
    // Draw mountains.

        drawMountains();

	// Draw trees.
    
        drawTrees();
   

	// Draw canyons.
    
    
        for(var c = 0; c < canyons.length; c++)
    {          
        drawCanyon(canyons[c]);
        checkCanyon(canyons[c]);
    }


    //Draw lamppost light
    for(var k = 0; k < lamppostlight.length; k++)
    {     

    fill(255, 117, 0,4);
    ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,700,500);


    fill(255, 117, 0,5);
    ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,450,400);


    fill(255, 117, 0,8);
    ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,270,290);


    fill(252, 117, 0,10);
    ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,190,200);


    fill(252, 147, 0,14);
    ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,130,90);


    fill (250, 152, 0,18);
ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,80,60);



    fill(255, 117, 0,22);
ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,30,50);



    fill(255, 117, 0,30);
ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,20,20);



    fill(255, 117, 0,50);
ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,10,10);


fill( 252, 100, 0);
ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,6,6);

fill(255, 117, 0);
ellipse(lamppostlight[k].pos_x,lamppostlight[k].pos_y,3,2);


    }

    //shadow
    fill(10,10,10,80);
    quad(202,536,225,536,261,568,217,572);

    quad(-3773,460,-3800,460,-3900,500,-3800,500);

    quad(-108.5,437,-85,437,-140,479,-190,471);

    quad(2587,467,2610,467,2605,550,2589,550);

    quad(3102,515,3125,515,3135,550,3100,550);

    quad(3402,468,3425,468,3410,550,3400,550);

    

//lamppost

    for(var l = 0; l < lamppost.length; l++)
    {            
    
    fill(25);
    arc(lamppost[l].pos_x + 14,lamppost[l].pos_y + 18,23,50,180,0);

    rect(lamppost[l].pos_x + 9,lamppost[l].pos_y - 7,10,20);
    
    rect(lamppost[l].pos_x + 11,lamppost[l].pos_y - 92,5.5,90);

    ellipse(lamppost[l].pos_x + 14,lamppost[l].pos_y - 90,9,8);

    strokeWeight(1);
    stroke(20);
    noFill();
    beginShape();
    vertex(lamppost[l].pos_x + 6,lamppost[l].pos_y - 94);
    vertex(lamppost[l].pos_x,lamppost[l].pos_y - 110);
    vertex(lamppost[l].pos_x + 14,lamppost[l].pos_y - 117);
    vertex(lamppost[l].pos_x + 28,lamppost[l].pos_y - 110);
    vertex(lamppost[l].pos_x + 22,lamppost[l].pos_y - 94);
    vertex(lamppost[l].pos_x + 14,lamppost[l].pos_y - 90);
    vertex(lamppost[l].pos_x + 6,lamppost[l].pos_y - 94);
    endShape();

    strokeWeight(1);
    line(lamppost[l].pos_x + 9,lamppost[l].pos_y - 94,lamppost[l].pos_x + 6,lamppost[l].pos_y - 110);
    line(lamppost[l].pos_x + 19,lamppost[l].pos_y - 94,lamppost[l].pos_x + 22,lamppost[l].pos_y - 110);

    fill(20);
    triangle(lamppost[l].pos_x,lamppost[l].pos_y - 110,lamppost[l].pos_x + 14,lamppost[l].pos_y - 117,lamppost[l].pos_x + 28,lamppost[l].pos_y - 110);

    
    noStroke();
}


	// Draw collectable items.
        
        for(var l = 0; l < collectables.length; l++)
        
    {          
        if(!collectables[l].isFound)
        {
            drawCollectable(collectables[l]);
            checkCollectable(collectables[l]);
        }
        
    }

// Draw Flagpole 
renderFlagpole(flagpole);
checkFlagpole(flagpole);  

// Logic to reset world if character falls into the void 





// if(lives == 0 && keyCode = 32)
// {
//     startGame
// }

for(var i = 0; i < platforms.length; i++)
{
    platforms[i].draw();
}
pop();

	// Draw game character.
	
	drawGameChar();

    noStroke();
    fill(255);
    text("score: " + game_score, 20, 20);
    text("lives: " + lives, 20, 45);
  

    if(lives == 0)
    {
        fill(255);
        text("Game Over Press Space to Continue" ,width/2 - 100, height/2)
        return;
    
    }
    
    else if(flagpole.isReached)
    {
        fill(255);
        text("Level Complete Press Space to Continue" ,width/2 - 100, height/2)
        return;
    
    }

	// Logic to make the game character move or the background scroll.

    if(isPlummeting)
    {
        gameChar_y += 100;
    }



    if(gameChar_y >= 450 )
    {
        startGame()
    }

        if(isLeft)
        {
            if(gameChar_x > width * 0.2)
            {
                gameChar_x -= 5;
            }
            else
            {
                scrollPos += 5;
            }
        }

        if(isRight)
        {
            if(gameChar_x < width * 0.8)
            {
                gameChar_x  += 5;
            }
            else
            {
                scrollPos -= 5; // negative for moving against the background
            }
        }
    
        //jumping
        if (gameChar_y < floorPos_y)
        {
            var isContact = false;

            for(var i = 0; i < platforms.length; i++)
            {
                if(
                    platforms[i].checkContact(gameChar_world_x, gameChar_y) 
                    )
                {
                    isContact = true;
                    break;
                }
            }
            if(isContact == false)
            {   
            gameChar_y +=5;
            isFalling = true;
            }
            else
            {
                isFalling = false;
            }
        }
        else
            {
            isFalling = false;
            }

  


        
    
	// Logic to make the game character rise and fall.

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    

    if(keyCode == 65) // the 'a' key
{

    isLeft = true;
}

    if(keyCode == 68) // the 'd' key
    {
    isRight = true;
    }
    
    if(keyCode == 87 ) // W key

    {

        if(!isFalling)
        {
            gameChar_y -= 200;
            jumpSound.play();
        }
 
       
    }
 
    if(lives == 0 && keyCode == 32)
    {
    startGame();  
    lives = 3;         
    }     
    if(flagpole.isReached == true && keyCode == 32)         
    { 
startGame();         
    } 
    
}


 



function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    
    if(keyCode == 65)
    {
        isLeft = false;
    }
    

    if(keyCode == 68)
        
    {
        isRight = false;
    }
    
        
}
    

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
 
//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        
        fill(0);    
    strokeWeight(3);
    //head
ellipse(gameChar_x,
        gameChar_y - 35,15,11);
    
        stroke(2);
    line(gameChar_x + 6, 
         gameChar_y - 36, 
         gameChar_x + 8, 
         gameChar_y - 50);
 
    //chest
    
    rect(gameChar_x - 5 , 
         gameChar_y - 28.2, 10,20);
    
    //left arm
    strokeWeight(2)
    line(gameChar_x - 6.2, 
         gameChar_y - 25, 
         gameChar_x + 10, 
         gameChar_y - 14);

    
    push();
    translate(gameChar_x + 15,
              gameChar_y - 20);
        
        rotate(10);
        ellipseMode(CENTER);
        ellipse(0,0,3.5,2);
    
pop();
    
    
    //right arm
    line(
        gameChar_x + 7, 
        gameChar_y - 25, 
        gameChar_x + 13, 
        gameChar_y - 20);
    
    push();
    translate(gameChar_x + 12,
              gameChar_y - 14);
    
        rotate(-20);
        ellipseMode(CENTER);
        ellipse(0,0,3.5,2);
    pop();

    //leg right
    strokeWeight(2.3);
    
    line(
        gameChar_x + 4, 
        gameChar_y - 5.5,
        gameChar_x + 14, 
        gameChar_y + 2);
    
    push();
    
    translate(
        gameChar_x + 15, 
        gameChar_y + 1);
    rotate(-20);
    ellipseMode(CENTER);
    ellipse(0,0,3.5, 1.8);
    rotate(-10);
    pop();
    
    
    //leg left
    line(
        gameChar_x - 4, 
        gameChar_y - 5.5,
        gameChar_x + 5 , 
        gameChar_y + 2);
    push();
    translate(
        gameChar_x + 7.5, 
        gameChar_y + 3);

    rotate(-20);
    ellipseMode(CENTER);
    ellipse(0,0,3.5, 1.8);

    ellipse(
        gameChar_x - 5.8, 
        gameChar_y + 6.2, 3.5, 1.8);
      pop();
    
    
            


	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        
        fill(0);
    strokeWeight(3);
    //head
    ellipse(
        gameChar_x,
        gameChar_y - 35,15,11);
    stroke(2);
    line(
        gameChar_x - 6, 
        gameChar_y - 36, 
        gameChar_x - 8, 
        gameChar_y - 50);
 
    //chest
    
    rect(
        gameChar_x - 5, 
        gameChar_y - 28.2, 10,20);
    
    //left arm
    strokeWeight(2)
    line(
        gameChar_x - 7, 
        gameChar_y - 25, 
        gameChar_x - 14, 
        gameChar_y - 20);

    
    push();
    translate(
        gameChar_x - 15, 
        gameChar_y - 20);
    rotate(10);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();
    
    
    //right arm
     line(
         gameChar_x + 7, 
         gameChar_y - 25, 
         gameChar_x - 10 , 
         gameChar_y - 14);
    push();
    translate(
        gameChar_x - 12, 
        gameChar_y - 14);
    rotate(-20);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();

    //leg right
    strokeWeight(2.3);
    line(
        gameChar_x + 4, 
        gameChar_y - 5.5, 
        gameChar_x - 10, 
        gameChar_y + 2);
    push();
    translate(
        gameChar_x - 13, 
        gameChar_y + 2);
    rotate(20);
    ellipseMode(CENTER);
    ellipse(0,0,3.5, 1.8);
    rotate(-10);
    pop();
    
    
    //leg left
    line(
        gameChar_x - 4, 
        gameChar_y - 5.5, 
        gameChar_x - 11 , 
        gameChar_y - 3);
    push();
    translate(
        gameChar_x - 12,
        gameChar_y - 3);
    rotate(20);
    ellipseMode(CENTER);
    ellipse(0,0,3.5, 1.8);
    ellipse(
        gameChar_x - 5.8, 
        gameChar_y + 6.2, 3.5, 1.8);
      pop();

        
	}
	else if(isLeft)
	{
		// add your walking left code
        
        fill(0);    
    strokeWeight(3);
    //head
    ellipse(
        gameChar_x,
        gameChar_y - 35,15,11);
    stroke(2);
    line(
        gameChar_x + 6, 
        gameChar_y - 36, 
        gameChar_x + 6, 
        gameChar_y - 50);
 
    //chest
        
    push();
    line(
        gameChar_x + 6, 
        gameChar_y - 36, 
        gameChar_x + 6, 
        gameChar_y - 50);
     push();
    translate(
        gameChar_x,
        gameChar_y - 18.1);
    rotate(-2);
    rectMode(CENTER);
    rect(0,0,13,20);
    pop();
    
    
    //left arm
    strokeWeight(2)
    line(
        gameChar_x - 9, 
        gameChar_y - 25, 
        gameChar_x - 10, 
        gameChar_y - 14);

    
    push();
    translate(
        gameChar_x - 11.5, 
        gameChar_y - 14);
    rotate(-30);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();
    
    
    //right arm
     line(
         gameChar_x + 9, 
         gameChar_y - 25, 
         gameChar_x + 13 , 
         gameChar_y - 20);
    line(
        gameChar_x + 13, 
        gameChar_y - 20, 
        gameChar_x + 12.5, 
        gameChar_y - 17 );
    push();
    translate(
        gameChar_x + 11, 
        gameChar_y - 14);
    rotate(-40);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();

    //leg right
    strokeWeight(2.3);
    line(
        gameChar_x + 4, 
        gameChar_y - 5.5, 
        gameChar_x + 3, 
        gameChar_y);
    line(
        gameChar_x + 3, 
        gameChar_y, 
        gameChar_x + 6, 
        gameChar_y + 6);
    push();
    translate(
        gameChar_x + 5, 
        gameChar_y + 9);
    rotate(-49);
    ellipseMode(CENTER);
    ellipse(0,0,3,1);
    pop();

    

    
    //leg left
    line(
        gameChar_x - 3, 
        gameChar_y - 5.5, 
        gameChar_x - 6,
        gameChar_y - 1);
    line (
        gameChar_x - 6, 
        gameChar_y - 1, 
        gameChar_x - 7.5, 
        gameChar_y + 6);
    push();
    translate(
        gameChar_x - 9, 
        gameChar_y + 9);
    rotate(-20);
    ellipseMode(CENTER);
    ellipse(0,0,3, 1);
    pop();
  
    
    
    
    
    
    strokeCap(ROUND);

strokeWeight(3);
        
        

	}
	else if(isRight)
	{
		// add your walking right code
        
        fill(0);
    strokeWeight(3);
    //head
    ellipse(
        gameChar_x,
        gameChar_y - 35,15,11);
    stroke(2);
    line(
        gameChar_x - 6, 
        gameChar_y - 36, 
        gameChar_x - 6, 
        gameChar_y - 50);
 
    //chest
        
     push();
    translate(
        gameChar_x,
        gameChar_y - 18.1);
    rotate(2);
    rectMode(CENTER);
    rect(0,0,13,20);
    pop();
    
    
    //right arm
    strokeWeight(2)
    line(
        gameChar_x + 9, 
        gameChar_y - 25, 
        gameChar_x + 10, 
        gameChar_y - 14);

    
    push();
    translate(
        gameChar_x + 11.5, 
        gameChar_y - 14);
    rotate(40);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();
    
    
    //left arm
     line(
         gameChar_x - 9, 
         gameChar_y - 25, 
         gameChar_x - 13 , 
         gameChar_y - 20);
    line(
        gameChar_x - 13, 
        gameChar_y - 20, 
        gameChar_x - 12.5, 
        gameChar_y - 17 );
    push();
    translate(
        gameChar_x - 11, 
        gameChar_y - 14);
    rotate(40);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();

    
    
    
    //leg right
    strokeWeight(2.3);
    line(
        gameChar_x + 4, 
        gameChar_y - 5.5, 
        gameChar_x + 6, 
        gameChar_y);
    line(
        gameChar_x + 6, 
        gameChar_y, 
        gameChar_x + 7, 
        gameChar_y + 8);
    push();
    translate(
        gameChar_x + 8.5, 
        gameChar_y + 10);
    rotate(20);
    ellipseMode(CENTER);
    ellipse(0,0,3,1);
    pop();

    

    
    //leg left
    line(
        gameChar_x - 3, 
        gameChar_y - 5.5, 
        gameChar_x - 1, 
        gameChar_y - 1);
    line (
        gameChar_x - 1, 
        gameChar_y - 1, 
        gameChar_x - 6, 
        gameChar_y + 8);
    push();
    translate(
        gameChar_x - 5, 
        gameChar_y + 9);
    rotate(55);
    ellipseMode(CENTER);
    ellipse(0,0,3, 1);
    pop();
  
    
    
    
    
    strokeCap(ROUND);

strokeWeight(3);


	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code

fill(0);
  strokeWeight(3);
    //head
    ellipse(
        gameChar_x,
        gameChar_y - 35,15,11);
    stroke(2);
 
    //chest
    line(
        gameChar_x + 6, 
        gameChar_y - 36, 
        gameChar_x + 6, 
        gameChar_y - 50);
    
    rect(
        gameChar_x - 6.5 , 
        gameChar_y - 28.2, 13,20);
    
    //left arm
    strokeWeight(2)
    line(
        gameChar_x - 9, 
        gameChar_y - 25, 
        gameChar_x - 17, 
        gameChar_y - 30);

    
    push();
    translate(
        gameChar_x - 18, 
        gameChar_y - 30);
    rotate(10);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();
    
    
    //right arm
     line(
         gameChar_x + 9, 
         gameChar_y - 25, 
         gameChar_x + 14 , 
         gameChar_y - 30);
    push();
    translate(
        gameChar_x + 16.1, 
        gameChar_y - 31);
    rotate(-20);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();

    //leg right
    strokeWeight(2.3);
    line(
        gameChar_x + 4, 
        gameChar_y - 5.5, 
        gameChar_x + 2, 
        gameChar_y);
    line (
        gameChar_x + 2, 
        gameChar_y, 
        gameChar_x - 2, 
        gameChar_y - 5);


    //leg left

        line(
            gameChar_x - 4, 
            gameChar_y - 5.5, 
            gameChar_x - 8, 
            gameChar_y);
    line (
        gameChar_x - 8, 
        gameChar_y, 
        gameChar_x - 10, 
        gameChar_y - 5);
    
     push();
    translate(
        gameChar_x - 12, 
        gameChar_y - 5);
    rotate(-10);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();
    
    
       push();
    translate(
        gameChar_x - 4, 
        gameChar_y - 5);
    rotate(20);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();

        

     }
	else
	{
		// add your standing front facing code
 fill(0); 
    strokeWeight(3);
    //head
    ellipse(
        gameChar_x,
        gameChar_y - 35,15,11);
    stroke(2);
 
    //chest
    line(
        gameChar_x + 6, 
        gameChar_y - 36, 
        gameChar_x + 6, 
        gameChar_y - 50);
    rect(
        gameChar_x - 6.5 , 
        gameChar_y - 28.2, 13,20);
    
    //left arm
    strokeWeight(2)
    line(
        gameChar_x - 9, 
        gameChar_y - 25, 
        gameChar_x - 10, 
        gameChar_y - 14);

    
    push();
    translate(
        gameChar_x - 11.5, 
        gameChar_y - 14);
    rotate(-30);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();
    
    
    //right arm
     line(
         gameChar_x + 9, 
         gameChar_y - 25, 
         gameChar_x + 11 , 
         gameChar_y - 14);
    push();
    translate(
        gameChar_x + 12, 
        gameChar_y - 14);
    rotate(50);
    ellipseMode(CENTER);
    ellipse(0,0,3.5,2);
    pop();

    //leg right
    strokeWeight(2.3);
    line(
        gameChar_x + 4, 
        gameChar_y - 5.5, 
        gameChar_x + 3, 
        gameChar_y);
    line(
        gameChar_x + 3, 
        gameChar_y, 
        gameChar_x + 2, 
        gameChar_y + 11);
    ellipse(
        gameChar_x, 
        gameChar_y + 11, 3,1.);

    
    //leg left
    line(
        gameChar_x - 4, 
        gameChar_y - 5.5, 
        gameChar_x - 4, 
        gameChar_y - 1);
    line (
        gameChar_x - 4, 
        gameChar_y - 1, 
        gameChar_x + 5.4, 
        gameChar_y + 6);
    
    push();
    translate(
        gameChar_x + 6, 
        gameChar_y + 7.5);

    rotate(80);
    ellipseMode(CENTER);
    ellipse(0,0,4,2);
    pop();
    ellipse(0,0,3, 1);
    
    strokeCap(ROUND);

strokeWeight(3);
        
    }
        
        
   
   
    
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

function drawClouds()
{
    
    
    for(var j = 0; j < clouds.length; j++)
        {            
    
 fill(255,100);
ellipse(
    clouds[j].pos_x - 10,
    clouds[j].pos_y - 1,80 + 
    clouds[j].width,40 + 
    clouds[j].height);
    
    fill(255,180);
   ellipse(
       clouds[j].pos_x + 20,
       clouds[j].pos_y - 1,80 + 
       clouds[j].width,40 + 
       clouds[j].height);
     
       fill(255,180);
    ellipse(
        clouds[j].pos_x,
        clouds[j].pos_y - 11,80 + 
        clouds[j].width,40 + 
        clouds[j].height);
    
    
    
     fill(255,120);
ellipse(clouds[j].pos_x + 79,clouds[j].pos_y - 1,30 + clouds[j].width,15 + clouds[j].height);
       fill(255,100);
ellipse(clouds[j].pos_x + 89,clouds[j].pos_y - 7,30 + clouds[j].width,15 + clouds[j].height);
       fill(255,100);
ellipse(clouds[j].pos_x + 93,clouds[j].pos_y,20 + clouds[j].width,10 + clouds[j].height);
        }

    
    
}
// Function to draw mountains objects.

function drawMountains()
{
    
         for(var h = 0; h < mountains.length; h++)
            {
    fill(255);
noStroke();
    beginShape();
    vertex(mountains[h].pos_x - 80 ,floorPos_y + 1);
    vertex(mountains[h].pos_x - 19 + mountains[h].width,floorPos_y - 36 - mountains[h].height);
    vertex(mountains[h].pos_x + 25 + mountains[h].width,floorPos_y - 60 - mountains[h].height); 
    vertex(mountains[h].pos_x + 75 + mountains[h].width,floorPos_y - 117 - mountains[h].height);
    vertex(mountains[h].pos_x + 94 + mountains[h].width, floorPos_y - 173 -mountains[h].height);
    vertex(mountains[h].pos_x + 115 + mountains[h].width ,floorPos_y - 222 - mountains[h].height);
        endShape();
    
    
   //shade2//
        fill(255);
noStroke();
    beginShape();
    vertex(mountains[h].pos_x - 200 ,floorPos_y + 1);
    vertex(mountains[h].pos_x - 120 + mountains[h].width,floorPos_y - 44 - mountains[h].height);
    vertex(mountains[h].pos_x - 86 + mountains[h].width,floorPos_y - 122 - mountains[h].height);
    vertex(mountains[h].pos_x - 35 + mountains[h].width,floorPos_y - 161 - mountains[h].height);
    vertex(mountains[h].pos_x - 30 + mountains[h].width, floorPos_y - 204 - mountains[h].height);
    vertex(mountains[h].pos_x + 8 + mountains[h].width,floorPos_y - 234 - mountains[h].height);
    vertex(mountains[h].pos_x + 20 + mountains[h].width,floorPos_y - 282 - mountains[h].height);
    endShape();

          fill(255,50);
noStroke();
    beginShape();
    vertex(mountains[h].pos_x - 200 ,floorPos_y + 1);
    vertex(mountains[h].pos_x - 150 + mountains[h].width,floorPos_y + 1);
    vertex(mountains[h].pos_x - 90 + mountains[h].width,floorPos_y - 42 - mountains[h].height);
    vertex(mountains[h].pos_x - 64 + mountains[h].width,floorPos_y - 109 - mountains[h].height);
    vertex(mountains[h].pos_x + 11 + mountains[h].width,floorPos_y - 153 - mountains[h].height);
    vertex(mountains[h].pos_x + 4 + mountains[h].width,floorPos_y - 194 - mountains[h].height);
    vertex(mountains[h].pos_x + 19 + mountains[h].width,floorPos_y - 235 - mountains[h].height);
    vertex(mountains[h].pos_x + 20 + mountains[h].width,floorPos_y - 282 - mountains[h].height);
    endShape();
    //shadeover//
    
    //mountainstructure//
    fill(0,150)
    triangle(
        mountains[h].pos_x - 200 ,
        floorPos_y + 1,
        mountains[h].pos_x + 20 + 
        mountains[h].width,floorPos_y - 282 - 
        mountains[h].height ,mountains[h].pos_x + 220 + 
        mountains[h].width,floorPos_y + 1);
    fill(0,225)
////    
    triangle(mountains[h].pos_x - 80 ,floorPos_y + 1,mountains[h].pos_x + 115 + mountains[h].width,floorPos_y - 222 - mountains[h].height,mountains[h].pos_x + 290 + mountains[h].width,floorPos_y + 1);
            }

    
}

// Function to draw trees objects.

function drawTrees()
{
       for(var i = 0; i < trees_x.length; i++)
            {            
//trunk   
	noStroke();
	fill(0);
    fill(50);
    noStroke();
    
    beginShape();
    vertex(trees_x[i] - 26,treePos_y);
    vertex(trees_x[i] - 19,treePos_y - 16);
    vertex(trees_x[i] - 13,treePos_y - 46);
    vertex(trees_x[i] - 8,treePos_y - 66);
    vertex(trees_x[i] - 3,treePos_y - 88); 
    vertex(trees_x[i] + 7,treePos_y - 98);
    vertex(trees_x[i] + 11,treePos_y - 46);
    vertex(trees_x[i] + 22,treePos_y - 26);
    vertex(trees_x[i] + 32,treePos_y - 6);
    vertex(trees_x[i] + 37,treePos_y + 4);
    vertex(trees_x[i] + 12,treePos_y - 16);
    endShape();

    //leaves//
    
    fill(81, 133, 101,210);
    ellipse(
       trees_x[i] - 27,
       treePos_y - 96,90,60);
    
    fill(81, 133, 101,150);  
    ellipse(
        trees_x[i] - 7,
        treePos_y - 116,70,50);
    
    fill(50,150);  
    ellipse(
        trees_x[i] - 7,
        treePos_y - 116,70,50);
    
    fill(50,200);
    ellipse(
        trees_x[i] + 27,
        treePos_y - 96,80,50);
    
    //treeshadow//
    fill(50,100);
    ellipse(
        trees_x[i] + 6, 
        treePos_y + 3,100,50);
 
            }   
    
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(c_canyon)
{
      //structure//
    fill(0,250);
    rect(
        c_canyon.pos_x + 526,432,
        c_canyon.width,144);
    
    //gradient//
    fill(40,100);
    
    triangle((
        c_canyon.pos_x + 526),432,
        c_canyon.pos_x + 526 + 
        c_canyon.width,432,
        c_canyon.pos_x + 526,483);
    
    fill(25,100);
    
    triangle(
        c_canyon.pos_x + 526,483,
        c_canyon.pos_x + 526,522,
        c_canyon.pos_x + 526 + 
        c_canyon.width,432);
    fill(15,100);
    triangle(
        c_canyon.pos_x + 526,522,
        c_canyon.pos_x + 526,573,
        c_canyon.pos_x + 526 + 
        c_canyon.width,432);
    
}



// Function to check character is over a canyon.

//falling mechanics
function checkCanyon(c_canyon)
{
    if(gameChar_world_x > c_canyon.pos_x + 526 && gameChar_world_x < c_canyon.pos_x + 526 + c_canyon.width && gameChar_y >= floorPos_y)
    {
        isPlummeting = true;
        isFalling = false;
        gameChar_y += 7;
        gameChar_world_x = 526;
        isLeft = false;
        isRight = false;
        
    }
else
    {
        isPlummeting = false;
    }
}




// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
        noStroke();  
    fill(0);
    ellipse(t_collectable.x_pos + 333.5,
            t_collectable.y_pos + 340, 25 + 
            t_collectable.width, 20 + 
            t_collectable.height);



    rect(t_collectable.x_pos + 343.5, 
         t_collectable.y_pos + 305, 0 + 
         t_collectable.width, 30 + 
         t_collectable.height, 30);



        //shadow
    fill(0,100);
    noStroke(0);
    ellipse(t_collectable.x_pos + 333.2,
            t_collectable.y_pos + 350,
            t_collectable.width + 30,
            t_collectable.height + 10);
    noStroke(); 

}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{

//distance between character and item
var d = dist(gameChar_world_x, gameChar_y, t_collectable.x_pos + 335.5, t_collectable.y_pos + 340);
    

if(d < 25)
    {
    t_collectable.isFound = true;
    game_score += 1;
    }
}



function checkFlagpole(flagpole){
    if (dist(gameChar_world_x, gameChar_y, flagpole.pos_x, floorPos_y)
    <=20 )
    
            {
                flagpole.isReached = true;
            }
    else
        {
            flagpole.isReached == false;
        }
    }
    


function renderFlagpole()
{
fill(50);
rect(flagpole.pos_x, floorPos_y - 200, 10, 200);
if(flagpole.isReached == false)
{
    fill(255,0,0);
    rect(flagpole.pos_x, floorPos_y - 100, 60, 40);
}

else
{
    fill(0,150,0);
    rect(flagpole.pos_x, floorPos_y - 200, 60, 40);
}

}

function createPlatform(x,y,length)
{
    var p = {
        x: x,
        y: y, 
        length: length,
        draw: function()
        {
fill(255);
stroke(0);
rect(this.x,this.y,this.length,20);

        },
    
        checkContact: function(gc_x, gc_y)
        {
        
            //checks whether game char is in contact
        if (gc_x > this.x && gc_x < this.x + this.length)
        {
            
            var d =  gc_y - this.y ;
            if(d >= 0 && d < 5)
            {
                return true;
            }
        } 

        return false;
    }  
}    

    return p;

}



