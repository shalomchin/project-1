var loopTimer = setInterval(loop, 50)
var numLoops = 0

var gameboard = document.querySelector('#gameboard')
var pacman = document.querySelector('#pacman')
var blueGhost = document.querySelector('#blueGhost')
var orangeGhost = document.querySelector('#orangeGhost')
var pinkGhost = document.querySelector('#pinkGhost')
var redGhost = document.querySelector('#redGhost')
var ghosts = [blueGhost, orangeGhost, pinkGhost, redGhost]

var pacmanSpeed = 10
var ghostSpeed = 6
var walls = []
var foodItems = []

var upKeyDown = false
var downKeyDown = false
var leftKeyDown = false
var rightKeyDown = false

blueGhost.direction = 'left'
orangeGhost.direction = 'right'
pinkGhost.direction = 'up'
redGhost.direction = 'down'

pacman.style.top = '440px'
pacman.style.left = '280px'
pacman.style.height = '40px'
pacman.style.width = '40px'

blueGhost.style.top = '40px'
blueGhost.style.left = '40px'
blueGhost.style.height = '40px'
blueGhost.style.width = '40px'

orangeGhost.style.top = '40px'
orangeGhost.style.left = '520px'
orangeGhost.style.height = '40px'
orangeGhost.style.width = '40px'

pinkGhost.style.top = '440px'
pinkGhost.style.left = '40px'
pinkGhost.style.height = '40px'
pinkGhost.style.width = '40px'

redGhost.style.top = '440px'
redGhost.style.left = '520px'
redGhost.style.height = '40px'
redGhost.style.width = '40px'



// border
createWall(0, 0, 600, 40)
createWall(0, 0, 40, 280)
createWall(0, 280, 40, 240)
createWall(0, 480, 600, 40)
createWall(560, 0, 40, 280)
createWall(560, 280, 40, 240)
// gameboard tiles
// W
createWall(80, 80, 40, 120)
createWall(160, 120, 40, 80)
createWall(240, 80, 40, 120)
createWall(80, 200, 200, 40)
// D
createWall(320, 80, 40, 160)
createWall(360, 80, 40, 40)
createWall(360, 200, 40, 40)
createWall(400, 120, 40, 80)
// I
createWall(480, 80, 40, 160)
// 11
createWall(240, 280, 40, 160)
createWall(320, 280, 40, 160)
// others
createWall(40, 280, 160, 40)
createWall(400, 280, 160, 40)
createWall(80, 360, 40, 80)
createWall(160, 360, 40, 80)
createWall(400, 360, 40, 80)
createWall(480, 360, 40, 80)

// create wall function
function createWall (left, top, width, height) {
  var wall = document.createElement('div')
  wall.className = 'wall'
  wall.style.left = left + 'px'
  wall.style.top = top + 'px'
  wall.style.width = width + 'px'
  wall.style.height = height + 'px'
  gameboard.appendChild(wall)
  walls.push(wall)
}

function createFood (left, top) {
  var food = document.createElement('div')
  food.className = 'food'
  food.style.left = left + 'px'
  food.style.top = top + 'px'
  food.style.width = 12 + 'px'
  food.style.height = 12 + 'px'
  food.style.borderRadius = 25 + 'px'
  gameboard.appendChild(food)
  foodItems.push(food)
}

for (var i = 40; i < 540; i += 40) {
  for (var j = 40; j < 480; j += 40) {
    // for (var k = 7; k < walls.length; k++) {
    //   if (j < parseInt(walls[k].style.left) + parseInt(walls[k].style.width) &&
    //   j + 40 > parseInt(walls[k].style.left) &&
    //     i < parseInt(walls[k].style.top) + parseInt(walls[k].style.height) &&
    //     i + 40 > parseInt(walls[k].style.top)) {
    //       var x = true
    //     } else {
    //     x = false
    //     }
    //   }
    //   if (!x) {
    createFood(i + 13, j + 13)
  }
}
// }

foodItems[76].style.display = 'none'
foodItems[90].style.display = 'none'
foodItems[91].style.display = 'none'

// key down event listener
document.addEventListener('keydown', function () {
  // up key
  if (event.keyCode === 38) {
    upKeyDown = true
    downKeyDown = false
    leftKeyDown = false
    rightKeyDown = false
  }
  // down key
  if (event.keyCode === 40) {
    upKeyDown = false
    downKeyDown = true
    leftKeyDown = false
    rightKeyDown = false
  }
  // left key
  if (event.keyCode === 37) {
    upKeyDown = false
    downKeyDown = false
    leftKeyDown = true
    rightKeyDown = false
  }
  // right key
  if (event.keyCode === 39) {
    upKeyDown = false
    downKeyDown = false
    leftKeyDown = false
    rightKeyDown = true
  }
})

// collision condition
function collision (a, b) {
  var ax = parseInt(a.style.left)
  var ay = parseInt(a.style.top)
  var bx = parseInt(b.style.left)
  var by = parseInt(b.style.top)

  if (ax < bx + parseInt(b.style.width) &&
  ax + parseInt(a.style.width) > bx &&
  ay < by + parseInt(b.style.height) &&
  ay + parseInt(a.style.height) > by) {
    return true
  }
}

// check for collision between the wall and the character
function hitWall (character) {
  for (var i = 0; i < walls.length; i++) {
    if (collision(walls[i], character)) {
      return true
    }
  }
}

// check for collision between the character and the ghost
function hitGhost (character) {
  for (var i = 0; i < ghosts.length; i++) {
    if (collision(ghosts[i], character) && character !== ghosts[i]) {
      return true
    }
  }
}

// pacman's movement
function pacmanMovement () {
  var originalLeft = pacman.style.left
  var originalTop = pacman.style.top
  var pacmanX = parseInt(pacman.style.left)
  var pacmanY = parseInt(pacman.style.top)

  if (upKeyDown) {
    pacman.className = 'rotate270'
    pacman.style.top = pacmanY - pacmanSpeed + 'px'
  }
  if (downKeyDown) {
    pacman.className = 'rotate90'
    pacman.style.top = pacmanY + pacmanSpeed + 'px'
  }
  if (leftKeyDown) {
    pacman.className = 'mirrorImage'
    if (pacmanX < 0) pacmanX = 560
    pacman.style.left = pacmanX - pacmanSpeed + 'px'
  }
  if (rightKeyDown) {
    pacman.className = ''
    if (pacmanX > 560) pacmanX = 0
    pacman.style.left = pacmanX + pacmanSpeed + 'px'
  }
  // check for collision between pacman and walls
  if (hitWall(pacman)) {
    pacman.style.left = originalLeft
    pacman.style.top = originalTop
  }
  // check for collision between pacman and ghosts
  if (hitGhost(pacman)) {
    clearInterval(loopTimer)
  }
}

// ghost's movement
function ghostMovement (character) {
  var charOriginalLeft = character.style.left
  var charOriginalTop = character.style.top
  var characterX = parseInt(character.style.left)
  var characterY = parseInt(character.style.top)

  if (character.direction === 'up') {
    character.className = 'rotate270'
    character.style.top = characterY - ghostSpeed + 'px'
  }
  if (character.direction === 'down') {
    character.className = 'rotate90'
    character.style.top = characterY + ghostSpeed + 'px'
  }
  if (character.direction === 'left') {
    character.className = 'mirrorImage'
    if (characterX < 0) characterX = 560
    character.style.left = characterX - ghostSpeed + 'px'
  }
  if (character.direction === 'right') {
    character.className = ''
    if (characterX > 560) characterX = 0
    character.style.left = characterX + ghostSpeed + 'px'
  }
  if (hitWall(character)) {
    character.style.left = charOriginalLeft
    character.style.top = charOriginalTop
    ghostHitWallNewDir(character)
  }
}

// find new direction when ghost hit wall
function ghostHitWallNewDir (character) {
  var oppDirection
  var newDirection

  if (character.direction === 'up') oppDirection = 'down'
  if (character.direction === 'down') oppDirection = 'up'
  if (character.direction === 'left') oppDirection = 'right'
  if (character.direction === 'right') oppDirection = 'left'

  do {
    newDirection = randomGhostDirection()
  } while (newDirection === oppDirection)

  character.direction = newDirection
}

// random ghost direction
function randomGhostDirection () {
  var ghostDirection = ['up', 'down', 'left', 'right']
  var direction = ghostDirection[Math.floor(Math.random() * (4))]
  return direction
}

// game loop
function loop () {
  numLoops++
  pacmanMovement()
  ghostMovement(blueGhost)
  ghostMovement(orangeGhost)
  ghostMovement(pinkGhost)
  ghostMovement(redGhost)
}
