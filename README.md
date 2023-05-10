# Supergirl's Heroic Quest

![Tux, the Linux mascot](/images/supergirl.jpg)

## Description

### Brief description of the project
"Supergirl's Heroic Quest" is an exciting and action-packed city-themed game where you get to step into the shoes of the powerful superhero Supergirl. Using the arrow keys on your keyboard, you'll be able to move Supergirl around the city as she flies through the air in pursuit of justice.

As you fly through the city, buildings will appear randomly on the screen. You'll need to navigate carefully to avoid colliding with them, as each time you touch a building, it will increase the damage to the city. Be sure to keep an eye on the screen, as a maximum of two buildings will be visible at any given time.

But that's not all you need to watch out for. Kryptonite meteors will also occasionally appear on the screen, and if Supergirl touches one, her health will decrease by a whopping 50%. If she touches a second kryptonite, it's game over.

Your goal in "Supergirl's Heroic Quest" is to help Supergirl save the city by avoiding the buildings and kryptonite meteors as much as possible. You'll have a limited number of chances to touch the buildings, as touching more than three will cause the game to end. With quick reflexes and careful maneuvering, you'll be able to help Supergirl protect the city and emerge as a true hero!
### MVP
Get the player movements to appear  and move through the game
- Get the buildings to appear randomly on loop
- Display the player health and damage to the city on Canvas
- If collision between buildings and player, increase damage by 1
- If damage is equal to 3 then stop the game

### Backlog
- Set up the game with a landing page, start button, game description, and background image using HTML and the Canvas element:
- when the game starts the canvas  displayed should have the heath, damage and score buttons
- Create a myGameArea object, and store in properties everything related to it.
- Schedule updates and Clear the canvas
- Add logic to move player by adding component class, to move according to keyboard arrows so we need to add a keydown function attached to the document and add -to or subtract from our x or y positions.
- Add update game area functions
- Add horizontal image looping method to move the building obstacle from right to left
- Create  buildings as Obstacles and write functions such as update game area and update obstacles
- falling meteors should be accomplished by moving elements on the speed we want to set to the elements.
- As the game is supposed to end when we crash,create function to detect this crashes.
- write functions to reduce health and damage 

### Game Flow Diagram

<img src="https://user-images.githubusercontent.com/43141343/236056008-e6e51a51-5fd4-490c-8b6c-2a2911ef7c1c.png" width="700"/>

### Technologies Used
- HTML
- CSS
- JavaScript
- DOM Manipulation
- JS Canvas
- JS Classes
- Local Storage
- JS Audio() and JS Image()

### index.js
- start: function ()
- clear: function ()
- stop: function ()
- score: function ()
- Component class is for manupilating supergirl, building and meteors
- update()
- newPos()
- restartPos()
- left()
- right()
- top()
- bottom()
- crashWith(obstacle)
- Creating meteor class that extends component class
- function updateMeteors()
- function updateGameArea()
- myGameArea.clear()
- player.newPos()
- player.update()
- updateObstacles()
- checkGameOver()

### States 
- Start Screen
- Game Screen
- Game Over Screen

### Links
- Trello https://trello.com/b/1aXujsfw/supergirls-heroic-quest
- Slides
- Deploy
