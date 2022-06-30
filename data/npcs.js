const npcs = {
  Goobie: {
    position: {
      x: 800,
      y: 200,
    },
    image: {
      src: "./images/goobieFace.png",
    },
    frames: {
      max: 1,
      hold: 30,
    },
    scale: 4,
    animate: false,
    name: "Goobie",
    sentences: [
      sentences.Introduction,
      sentences.Projects,
      sentences.Contact,
      sentences.Resume,
    ],
  },
  Shmoo: {
    position: {
      x: 800,
      y: 315,
    },
    image: {
      src: "./images/shmooFace.png",
    },
    frames: {
      max: 1,
      hold: 30,
    },
    scale: 3,
    animate: false,
    name: "Shmoo",
    sentences: [sentences.Projects],
  },
  Christina: {
    position: {
      x: 800,
      y: 1000,
    },
    image: {
      src: "./images/christinaFace.png",
    },
    frames: {
      max: 1,
      hold: 30,
    },
    scale: 3,
    animate: false,
    name: "Christina",
    sentences: [sentences.Resume],
  },
  Racoon: {
    position: {
      x: 800,
      y: 1000,
    },
    image: {
      src: "./images/racoonFace.png",
    },
    frames: {
      max: 1,
      hold: 30,
    },
    scale: 3,
    animate: false,
    name: "Racoon",
    sentences: [sentences.Racoon],
  },
  Spirit: {
    position: {
      x: 800,
      y: 1000,
    },
    image: {
      src: "./images/spiritFace.png",
    },
    frames: {
      max: 1,
      hold: 30,
    },
    scale: 3,
    animate: false,
    name: "Spirit",
    sentences: [sentences.Projects],
  },
  Player: {
    position: {
      x: 75,
      y: 20,
    },
    image: {
      src: "./images/playerFace.png",
    },
    frames: {
      max: 1,
      hold: 30,
    },
    scale: 4,
    animate: false,
    name: "Player",
    sentences: [sentences.First_Ask],
  },
};
