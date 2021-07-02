// initialize kaboom context
const kaboomConfig = {
  fullscreen: true,
  global: true,
  debug: true
}

const k = kaboom(kaboomConfig);

loadSprite("player", "./resources/player_placeholder.png");

/* MAIN */
scene("main", () => {
  add([
      text("ohhimark", 32),
      pos(100, 100),
  ]);

});

// start the game
start("main");