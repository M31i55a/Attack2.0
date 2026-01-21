# Attack 2.0 - A Thrilling Underwater Battle Game

A dynamic action game where you battle underwater enemies and dragons while managing ammunition and trying to survive!

## Game Rules

### Objective

Eliminate enemies and defeat dragons to reach a winning score of **1000 points** before the time limit of **100 seconds** runs out. Protect yourself from enemy attacks to stay alive!

### Controls

**Desktop:**

- **Arrow Keys (↑↓)** - Move up and down
- **Click/Spacebar** - Shoot projectiles

**Mobile:**

- **Up/Down Buttons** - Move vertically
- **Tap** - Shoot projectiles

### Gameplay Mechanics

- **Player Lives**: You start with 100 lives. Take damage from enemy collisions and lose all lives to trigger game over!
- **Ammo System**: You have limited ammunition (max 50 bullets). Ammo regenerates over time as you play.
- **Enemy Variety**: Face different types of enemies:
  - **Angler 1**: Basic enemy (3 HP, 3 points)
  - **Angler 2**: Stronger variant (5 HP, 5 points)
  - **Hive Whale**: Large enemy that spawns 5 drones when defeated (20 HP, 20 points)
  - **Drone**: Fast-moving enemies often spawned by Hive Whales (3 HP, 3 points)
  - **Lucky Fish**: Special power-up enemy (5 HP, 0 points) - Grants weapon boost and triggers dragon summoning!

- **Lucky Fish & Dragon System**:
  - Collect **3 Lucky Fish** to summon a **Dragon** companion!
  - Each Lucky Fish grants you a temporary **weapon power-up** that increases your ammunition regeneration rate
  - The **Dragon** automatically attacks and eliminates regular enemies for you, dealing damage to them on contact
  - This is a strategic advantage to help you survive and accumulate points faster

- **Score System**:
  - Earn points by defeating enemies (except Lucky Fish)
  - Lose points if an enemy touches you
  - Score cannot go below 0 or the game ends immediately
  - Reach 1000 points to win!

- **Explosions**: Defeated enemies create dynamic explosions - both smoke and fire effects.
- **Particle Effects**: Experience visual feedback with particle effects throughout the game.

### Winning Conditions

- **Win**: Reach 1000 points OR eliminate enough enemies within the 100-second time limit
- **Lose**: Run out of lives OR time expires before reaching the winning score

## How to Launch

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Steps to Run

1. **Open the game in your browser:**
   - Navigate to the project directory
   - Open `index.html` in your web browser
   - Alternatively, double-click `index.html` to launch it

2. **Or use a local server (recommended):**
   - If you have Python installed:
     ```bash
     python -m http.server 8000
     ```
     Then visit `http://localhost:8000` in your browser
   - If you have Node.js installed:
     ```bash
     npx http-server
     ```
     Then visit the provided localhost URL

3. **Start Playing:**
   - The game will automatically begin when the page loads
   - Use the controls listed above to move and shoot
   - Survive as long as you can and rack up points!

## Project Structure

```
Attack2.0/
├── index.html          # Main HTML file
├── main.js             # Game initialization
├── style.css           # Styling and layout
├── assets/             # Game images and sprites
└── components/         # Game logic modules
    ├── Game.js         # Main game engine
    ├── Player.js       # Player character
    ├── Enemy.js        # Enemy base class
    ├── EnemyTypes.js   # Different enemy types
    ├── Dragon.js       # Dragon boss enemy
    ├── Projectile.js   # Bullet mechanics
    ├── Explosion.js    # Explosion base class
    ├── ExplosionTypes.js # Explosion effects
    ├── Particle.js     # Particle effects
    ├── Background.js   # Scrolling background
    ├── InputHandler.js # Keyboard/touch input
    ├── UserInterface.js # Score and UI display
    └── Layer.js        # Background layer system
```

## Tips for Playing

- **Collect Lucky Fish**: They're your key to summoning Dragons! Every 3 Lucky Fish you collect triggers a Dragon ally.
- **Leverage Dragon Power**: Once a Dragon appears, focus on getting enemies to collide with it - let your ally do the work!
- **Power-Up Timing**: Each Lucky Fish grants a temporary weapon boost. Use this time to stock up on ammo.
- **Manage Your Score**: Avoid getting hit by enemies - damage reduces your score. Watch out for touching regular enemies!
- **Prioritize Hive Whales Carefully**: They drop drones when defeated, so eliminate them strategically to control the screen.
- **Stay Mobile**: Constantly move to avoid enemy projectiles and set up collision opportunities with your Dragon.
- **Watch the Timer**: You need to reach 1000 points in 100 seconds - plan your battles accordingly!
- **Learn Enemy Patterns**: Each enemy type has different behaviors and movement speeds.

Enjoy the game and good luck defeating the underwater invaders! 🎮
