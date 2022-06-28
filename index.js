console.log(
  "This project is based in part on a tutorial from ChrisCourses.com with artwork from itch.io. A full list of credits for the artwork can be found on the readme at https://github.com/jonellwood/Ellwood_City_Big/blob/main/README.md "
);

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
// console.log(conversationZonesData);

canvas.width = 1048;
canvas.height = 576;

const collisionsMap = [];
// 140 in for loop is based on the tile width of the map
for (let i = 0; i < collisions.length; i += 140) {
  collisionsMap.push(collisions.slice(i, 140 + i));
}

const battleZonesMap = [];
// 140 in for loop is based on the tile width of the map
for (let i = 0; i < battleZonesData.length; i += 140) {
  battleZonesMap.push(battleZonesData.slice(i, 140 + i));
}
// console.log(battleZonesMap);

const conversationZonesMap = [];
for (let i = 0; i < conversationZonesData.length; i += 140) {
  conversationZonesMap.push(conversationZonesData.slice(i, 140 + i));
}
// console.log(conversationZonesMap);

const charactersMap = [];
for (let i = 0; i < charactersMapData.length; i += 140) {
  charactersMap.push(charactersMapData.slice(i, 140 + i));
}

// console.log(charactersMap);

const boundaries = [];
// create const for offset to it can be called for player position and boundary position with the same constant offset
const offset = {
  x: -5795,
  y: -1550,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 4776)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

// console.log(boundaries);

const battleZones = [];

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 4776)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

// console.log(battleZones);

const conversationZones = [];

conversationZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 4776)
      conversationZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

// console.log(conversationZones);

const goobieImage = new Image();
goobieImage.src = "./images/goobie.png";

const shmooImage = new Image();
shmooImage.src = "./images/shmoo.png";

const spiritImage = new Image();
spiritImage.src = "./images/spirit.png";

const racoonImage = new Image();
racoonImage.src = "./images/racoon.png";

const princessImage = new Image();
princessImage.src = "./images/princess.png";

const characters = [];

charactersMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 17785) {
      characters.push(
        new Sprite({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: princessImage,
          frames: {
            max: 4,
            hold: 60,
          },
          scale: 3,
          // animate: true,
        })
      );
    } else if (symbol === 17791) {
      characters.push(
        new Sprite({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: shmooImage,
          frames: {
            max: 4,
            hold: 60,
          },
          scale: 3,
          // animate: true,
        })
      );
    } else if (symbol === 17781) {
      characters.push(
        new Sprite({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: goobieImage,
          frames: {
            max: 4,
            hold: 60,
          },
          scale: 3,
          // animate: true,
        })
      );
    } else if (symbol === 17777) {
      characters.push(
        new Sprite({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: spiritImage,
          frames: {
            max: 4,
            hold: 60,
          },
          scale: 3,
          animate: true,
        })
      );
    } else if (symbol === 17789) {
      characters.push(
        new Sprite({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          image: racoonImage,
          frames: {
            max: 2,
            hold: 60,
          },
          scale: 3,
          // animate: true,
        })
      );
    }
    if (symbol !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});
// console.log(charactersMap);

const image = new Image();
image.src = "./images/EllwoodCity.png";

const foregroundImage = new Image();
foregroundImage.src = "./images/foregroundObjects.png";

const playerDownImage = new Image();
playerDownImage.src = "./images/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./images/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./images/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./images/playerRight.png";

const player = new Sprite({
  position: {
    // 192 and 68 come from size of sprite found in finder
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 20,
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const movables = [
  background,
  ...boundaries,
  foreground,
  ...battleZones,
  ...conversationZones,
  ...characters,
];
const renderables = [
  background,
  ...boundaries,
  ...battleZones,
  ...conversationZones,
  ...characters,
  player,
  foreground,
];

const battle = {
  initiated: false,
};

const conversation = {
  initiated: false,
};

function animate() {
  const animationId = window.requestAnimationFrame(animate);

  renderables.forEach((renderable) => {
    renderable.draw();
  });

  let moving = true;
  player.animate = false;

  if (conversation.initiated) return;
  if (battle.initiated) return;
  // this is where we activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      // overlappingArea calculated by cutting player area in half and then comparing if half of that half is in the battle zone or not. This is complicated shit! Thanks to Chris for doing all this math for us! The order of operations is crazy
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));

      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01
      ) {
        // console.log("battle sequence activated");
        // deactivate the current animation loop for perf?
        window.cancelAnimationFrame(animationId);

        audio.map.stop();
        audio.initBattle.play();
        audio.battle.play();

        battle.initiated = true;
        gsap.to("#overlappingDiv", {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // now we need to activate a new animation loop for battle scene
                initBattle();
                animateBattle();
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
          },
        });
        break;
      }
    }
    // this is where we initiate a conversation
    for (let i = 0; i < conversationZones.length; i++) {
      const conversation = conversationZones[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          conversation.position.x + conversation.width
        ) -
          Math.max(player.position.x, conversation.position.x)) *
        (Math.min(
          player.position.y + player.height,
          conversation.position.y + conversation.height
        ) -
          Math.max(player.position.y, conversation.position.y));
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: conversation,
        })
      ) {
        console.log("talk talk");
        if (
          rectangularCollision({
            rectangle1: player,
            rectangle2: conversation,
          }) &&
          overlappingArea > (player.width * player.height) / 2
        ) {
          window.cancelAnimationFrame(animationId);
          audio.map.stop();

          // console.log(rectangularCollision);
          conversation.initiated = true;

          gsap.to("#conversationDiv", {
            opacity: 1,
            duration: 0.2,
            onComplete() {
              initConversation();
              gsap.to("#conversationDiv", {
                opacity: 0.75,
                duration: 0.1,
              });
            },
          });
        }

        break;
      }
    }
  }

  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
    player.image = player.sprites.up;
    // monitor for character collision
    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: 3 },
    });

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        // console.log("crash");
        moving = false;
        break;
      }
    }
    // for (let i = 0; i < conversationZones.length; i++) {
    //   const conversation = conversationZones[i];
    //   if (
    //     rectangularCollision({
    //       rectangle1: player,
    //       rectangle2: conversation,
    //     })
    //   ) {
    //     console.log("talk talk");
    //     // moving = false;
    //     break;
    //   }
    // }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.a.pressed && lastKey === "a") {
    player.animate = true;
    player.image = player.sprites.left;

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 3, y: 0 },
    });

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        // console.log("crash");
        moving = false;
        break;
      }
    }
    // for (let i = 0; i < conversationZones.length; i++) {
    //   const conversation = conversationZones[i];
    //   if (
    //     rectangularCollision({
    //       rectangle1: player,
    //       rectangle2: conversation,
    //     })
    //   ) {
    //     console.log("talk talk");
    //     // moving = false;
    //     break;
    //   }
    // }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.s.pressed && lastKey === "s") {
    player.animate = true;
    player.image = player.sprites.down;

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: 0, y: -3 },
    });

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        // console.log("crash");
        moving = false;
        break;
      }
    }

    // for (let i = 0; i < conversationZones.length; i++) {
    //   const conversation = conversationZones[i];
    //   if (
    //     rectangularCollision({
    //       rectangle1: player,
    //       rectangle2: conversation,
    //     })
    //   ) {
    //     console.log("talk talk");
    //     // moving = false;
    //     break;
    //   }
    // }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  } else if (keys.d.pressed && lastKey === "d") {
    player.animate = true;
    player.image = player.sprites.right;

    checkForCharacterCollision({
      characters,
      player,
      characterOffset: { x: -3, y: 0 },
    });
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        // console.log("crash");
        moving = false;
        break;
      }
    }
    // for (let i = 0; i < conversationZones.length; i++) {
    //   const conversation = conversationZones[i];
    //   if (
    //     rectangularCollision({
    //       rectangle1: player,
    //       rectangle2: conversation,
    //     })
    //   ) {
    //     console.log("talk talk");
    //     // moving = false;
    //     break;
    //   }
    // }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}
// animate();

let lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;

    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;

    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

let clicked = false;
addEventListener("click", () => {
  if (!clicked) {
    audio.map.play();
    clicked = true;
  }
});
