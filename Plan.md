The Plan
=============

The Game
-------------

Top level class for handling game state. Contains things like:
* Lives
* Score
* A function to get the current direction
* Callbacks for notifications (inc. score, lives, death etc.)
* The board

The Board
-------------

Holds information about the locations of the characters, the walls and the food.

On each timestep an `update()` method will be called and the board is responsible for calling `move()` on each of the characters.
On all the characters `move()` will require an array of allowed directions.
Enemies will also require the current position of the player so they can decide where to go.

The board should handle any collisions, removing the losing party and handling updates to lives and scores.

The Characters
-------------

Every character is responsible for drawing it's own image. Position properties should be wrappers around the image position,
so as to ensure synchronisation.

The Player
-------------

Needs to handle changes in direction when keys are pressed. If current direction is not valid continue in the last
direction or stop.

The Enemies
-------------

Need to decide on their direction based on location of The Player and the game state. Can only change direction at intersections.

Each should be able to have it's own strategy. To start with let's just have 4 Blinkies.