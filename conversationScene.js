const conversationBackgroundImage = new Image();
conversationBackgroundImage.src = "./images/battleBackground.png";

const conversationBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: conversationBackgroundImage,
});

let player;
let goobie;
let renderedSprites;
let queue;

let conversationAnimationId;

function initConversation() {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#wordBox").style.display = "none";
  document.querySelector("#enemyHealthBar").style.width = "20%";
  document.querySelector("#playerHealthBar").style.width = "20%";
  document.querySelector("#respectsBox").replaceChildren();

  goobie = new Npc(npcs.Goobie);
  player = new Npc(npcs.Player);
  renderedSprites = [goobie, player];
  queue = [];

  player.sentences.forEach((sentence) => {
    const button = document.createElement("button");
    button.innerHTML = sentence.name;
    document.querySelector("#respectsBox").append(button);
  });

  // listen fer that clickity clack
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedSentence = sentences[e.currentTarget.innerHTML];
      player.sentence({
        sentence: selectedSentence,
        renderedSprites,
      });
      if (goobie.health >= 100) {
        queue.push(() => {
          goobie.faint(); // actually might be able to use this to end the conversation? Make a "player faint" type method?
        });
        queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              window.conversationAnimationFrame(conversationAnimationId);
              animateBattle();
              document.querySelector("userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
              conversation.initiated = false;
              audio.map.play();
            },
          });
        });
      }

      const randomSentence =
        goobie.sentence[Math.floor(Math.random() * goobie.sentences.length)];

      queue.push(() => {
        goobie.sentence({
          sentence: randomSentence,
          renderedSprites,
        });

        if (player.health >= 100) {
          queue.push(() => {
            player.faint();
          });
          queue.push(() => {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              onComplete: () => {
                window.cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector("#userInterface").style.display = "none";
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });
                conversation.initiated = false;
                audio.map.play();
              },
            });
          });
        }
      });
    });
    button.addEventListener("mouseenter", (e) => {
      const selectedSentence = sentences[e.currentTarget.innerHTML];
      document.querySelector("#respectTypeBox").innerHTML =
        selectedSentence.text; // maybe this is a preview of what is said?? idk
    });
  });
}

function animateConversation() {
  conversationAnimationId = window.requestAnimationFrame(animateConversation);
  conversationBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

animate();

document.querySelector("#wordBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
