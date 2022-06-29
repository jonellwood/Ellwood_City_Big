let goobie;
let me;
text = [];

let conversationAnimationId;

function initConversation() {
  const userInterface = (document.querySelector(
    "#userInterface"
  ).style.display = "block");

  goobie = new Npc(npcs.Goobie);
  me = new Npc(npcs.Player);
  renderedSprites = [goobie, me];
  queue = [];

  // remove the player and enemy health bars
  const topLeftDataBox = document.querySelector("#topLeftDataBox");
  topLeftDataBox.style.display = "none";
  const bottomRightDataBox = document.querySelector("#bottomRightDataBox");
  bottomRightDataBox.style.display = "none";

  //remove all the other div's as well so that only the conversation interface DOM element is left
  const bottomBoxForWords = document.querySelector("#wordBox");
  bottomBoxForWords.style.display = "none";

  const respectsBox = document.querySelector("#respectsBox");
  respectsBox.style.display = "none";

  const respectTypeBox = document.querySelector("#respectTypeBox");
  respectTypeBox.style.display = "none";

  const oneMoreDiv = document.querySelector("#oneMoreDiv");
  oneMoreDiv.style.display = "none";

  const respectsTypeBoxParent = document.querySelector(
    "#respectsTypeBoxParent"
  );
  respectsTypeBoxParent.style.display = "none";

  //create a new div taking up left of screen for the player text
  //   const dialogueInterface = document.createElement("div");
  //   dialogueInterface.style.display = "block";
  //   dialogueInterface.style.position = "absolute";
  //   dialogueInterface.style.bottom = "0";
  //   dialogueInterface.style.left = "0";
  //   dialogueInterface.style.width = "49%";
  //   dialogueInterface.style.height = "125px";
  //   dialogueInterface.style.backgroundColor = "white";
  //   dialogueInterface.style.border = "solid black 4px";
  //   dialogueInterface.style.zIndex = "2";

  //create a new div taking up the right of the screen for the reply text
  // const replyInterface = document.createElement("div");
  // replyInterface.style.display = "block";
  // replyInterface.style.position = "absolute";
  // replyInterface.style.bottom = "0";
  // replyInterface.style.right = "0";
  // replyInterface.style.width = "49%";
  // replyInterface.style.height = "125px";
  // replyInterface.style.backgroundColor = "white";
  // replyInterface.style.border = "solid black 4px";

  me.sentences.forEach((sentence) => {
    const dialogueInterface = document.createElement("div");
    dialogueInterface.innerHTML = sentence.text;
    document.querySelector("#userInterface").append(dialogueInterface);
    dialogueInterface.style.display = "block";
    dialogueInterface.style.position = "absolute";
    dialogueInterface.style.bottom = "0";
    dialogueInterface.style.left = "0";
    dialogueInterface.style.width = "99%";
    dialogueInterface.style.height = "125px";
    dialogueInterface.style.backgroundColor = "white";
    dialogueInterface.style.border = "solid black 4px";
    dialogueInterface.style.zIndex = "2";
    dialogueInterface.style.padding = "12px";
    dialogueInterface.style.cursor = "pointer";
    dialogueInterface.addEventListener("click", () => {
      dialogueInterface.remove();
    });
  });
  goobie.sentences.forEach((sentence) => {
    const replyInterface = document.createElement("div");
    replyInterface.innerHTML = sentence.text;
    document.querySelector("#userInterface").append(replyInterface);
    replyInterface.style.display = "block";
    replyInterface.style.position = "absolute";
    replyInterface.style.bottom = "0";
    replyInterface.style.left = "0";
    replyInterface.style.width = "99%";
    replyInterface.style.height = "125px";
    replyInterface.style.backgroundColor = "white";
    replyInterface.style.border = "solid black 4px";
    replyInterface.style.zIndex = "1";
    replyInterface.style.padding = "12px";
    replyInterface.style.cursor = "pointer";
    replyInterface.addEventListener("click", () => {
      replyInterface.remove();
    });
  });

  animate();
}
