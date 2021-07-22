class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }


  start() {
    obstaclesGroup = new Group();
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(200, 350);
    car1.addImage(car1Img);

    car2 = createSprite(500, 350);
    car2.addImage(car2Img);

    cars = [car1, car2];
    obstaclesGroup = new Group();
  }


  







  play() {
    form.hide();

    
    
    Player.getPlayersInfo();


    if (allPlayers !== undefined) {

      background(rgb(198, 135, 103));
      image(raceTrack, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      var index = 0;

      var x = 300;
      var y;

      for (var plr in allPlayers) {
        index = index + 1;


       
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;


        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

 

        if (index === player.index) {

          fill("green");
          ellipse(x, y, 60, 60);
          console.log(player.y)

          camera.position.y = cars[index - 1].position.y;
        }
        
      }

       
      
      if (obstaclesGroup.isTouching(cars[0]) || obstaclesGroup.isTouching(cars[1])) {

        gameState = 2;
      }
      if (cars[0].y < -3000 || cars[1].y < -3000){
        gameState = 2;
      }
      drawSprites();



    }


  }

  spawnObstacles() {
    if (frameCount % 10 === 0) {
      obstacles = createSprite(1400, Math.round(random(0,-2900)));
      obstacles.velocityX = -6;
      obstacles.scale = 0.15;
      var rand = Math.round(random(1, 2));
      if (rand === 1) {
        obstacles.addImage(cone)
      } else
        if (rand === 2) {
          obstacles.addImage(barrior)
        }
      obstacles.lifetime = 200;
      obstaclesGroup.add(obstacles);
      //alert(obstaclesGroup);
    }
  }





  


end()
{
  textSize(70)
  fill("Red")
  text("Game Over", 550, 20);
  
  textSize(70)
  fill("Red")
  text("Game Over", 550, -550);
  text("You Lose!", 550, -450);

  textSize(70)
  fill("Red")
  text("Game Over", 550, -1100);
  text("You Lose!", 550, -1000);

  textSize(70)
  fill("Red")
  text("Game Over", 550, -1650);
  text("You Lose!", 550, -1550);

  textSize(70)
  fill("Red")
  text("Game Over", 550, -2100);
  text("You Lose!", 550, -2000);

  textSize(100)
  fill("Green")
  text("You Win!", 550, -3000);
  }



  handlePlayerControls(){

  if (keyIsDown(UP_ARROW)) {
    player.positionY += 10;
    player.update();
  }

  if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
    player.positionX -= 5;
    player.update();
  }

  if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
    player.positionX += 5;
    player.update();
  }

}}






