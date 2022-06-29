let goobie;
let me;
let text = [];

let conversationAnimationId;

function initConversation() {
  console.log("Holy 💩 it worked ");

  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#wordBox").style.display = "none";
  document.querySelector("#enemyHealthBar").style.width = "20%";
  document.querySelector("#playerHealthBar").style.width = "20%";
  document.querySelector("#respectsBox").replaceChildren();

  goobie = new Npc(npcs.Goobie);
  me = new Npc(npcs.Player);
  renderedSprites = [goobie, me];
  queue = [];

  const buttonBox = document.querySelector("#respectsTypeBoxParent");
  const textBox = document.querySelector("#respectsBox");
  textBox.style.color = "white";
  const replyBox = document.querySelector("#replyBox");

  const topLeftDataBox = document.querySelector("#topLeftDataBox");
  topLeftDataBox.style.display = "none";
  const bottomRightDataBox = document.querySelector("#bottomRightDataBox");
  bottomRightDataBox.style.display = "none";

  const removeMe = document.querySelector("#respectTypeBox");
  removeMe.style.display = "none";

  const dialogueInterface = document.querySelector("#userInterface");

  me.sentences.forEach((sentence) => {
    textBox.innerHTML = sentence.text;
  });

  goobie.sentences.forEach((sentence) => {
    replyBox.innerHTML = sentence.text;
  });

  me.sentences.forEach((sentence) => {
    const button = document.createElement("button");
    button.innerHTML = sentence.name;
    buttonBox.append(button);
    button.addEventListener("click", (e) => {
      textBox.style.color = "black";
      textBox.style.padding = "12px";
      textBox.style.cursor = "pointer";
      textBox.addEventListener("click", (e) => {
        textBox.style.color = "white";
        replyBox.style.display = "block";
        replyBox.style.width = "100%";
        replyBox.style.cursor = "pointer";
        buttonBox.remove();
        replyBox.addEventListener("click", (e) => {
          dialogueInterface.remove();
          conversation.initiated = false;
        });
      });
    });
  });

  animate();
}
