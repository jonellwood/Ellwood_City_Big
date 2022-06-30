const conversationBackgroundImage = new Image();
conversationBackgroundImage.src = "./images/conversationBackground.png";

const conversationBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: conversationBackgroundImage,
});

let goobie;
let me;
let conversationAnimationId;

function initConversation() {
  document.querySelector("#banner").style.display = "none";
  document.querySelector("#conversationDiv").style.display = "block";
  document.querySelector("#overlappingDiv").style.opacity = "0";
  document.querySelector("#replyButtons").replaceChildren();
  document.querySelector("#staticText").replaceChildren();
  document.querySelector("#rightDiv").replaceChildren();

  // document.querySelector("#staticText").style.display = "block";

  goobie = new Npc(npcs.Goobie);
  me = new Npc(npcs.Player);
  renderedSprites = [goobie, me];
  queue = [];

  const staticTextP = document.createElement("p");
  staticTextP.innerHTML = "What can you tell me about this land?";
  document.querySelector("#staticText").append(staticTextP);

  goobie.sentences.forEach((sentence) => {
    const replyButtons = document.createElement("button");
    replyButtons.innerHTML = sentence.name;
    document.querySelector("#replyButtons").append(replyButtons);
  });

  // event listeners to place text of sentence in lower div
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedSentence = sentences[e.currentTarget.innerHTML];
      document.querySelector("#rightDiv").innerHTML = selectedSentence.text;
      // console.log(e.currentTarget.innerHTML);
      // console.log(selectedSentence);
      // console.log(sentences);
    });
  });
}

function animateConversation() {
  conversationAnimationId = window.requestAnimationFrame(animateConversation);
  conversationBackground.draw();
  // console.log(conversationAnimationId);

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
  // console.log(renderedSprites);
}

animate();

document.querySelector("#escapeHatch").addEventListener("click", (e) => {
  window.cancelAnimationFrame(conversationAnimationId);
  animate();
  document.querySelector("#conversationDiv").style.display = "none";
  conversation.initiated = false;
  audio.map.play();
});
