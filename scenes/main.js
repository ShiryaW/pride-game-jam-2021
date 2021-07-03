// initialize kaboom context
const kaboomConfig = {
  width: 1024,
  height: 800,
  global: true,
  debug: true,
  clearColor: [ 0.56, 0.80, 1, 1 ]
}

const k = kaboom(kaboomConfig);

loadSprite("player", "./resources/player.png", {
  sliceX: 6,
  sliceY: 1,
  anims: {
    walk: {
      from: 0,
      to: 3,
    },
    idle: {
      from: 5,
      to: 5
    }
  }
});
loadSprite("ground", "./resources/ground.png");
loadSprite("ground_below", "./resources/ground_below.png");
loadSprite("ground_below2", "./resources/ground_below_2.png");
loadSprite("platform_left", "./resources/platform_left.png");
loadSprite("platform_right", "./resources/platform_right.png");
loadSprite("platform_center", "./resources/platform_center.png");
loadSprite("ladder", "./resources/ladder.png");
loadSprite("triangle", "./resources/triangle.png");
loadSprite("square", "./resources/square.png");

/* CONSTANTS */
const GRID = {
  WIDTH: 64,
  HEIGHT: 64,
};

const MOVESPEED = 300;
const JUMPFORCE = 630;
const KILLPLANE = 1600;
const GRAVITY = 1600;
const SPRITE_SIZE = 0.25;

const LAYERS = {
  BACKGROUND: "bg",
  OBJECTS: "obj",
  UI: "ui"
};

const SPRITES = {
  PLAYER: "player",
  ENTITY: {
    TRIANGLE: "triangle",
    SQUARE: "square"
  },
  GROUND: {
    TOP: "ground",
    BELOW: "ground_below",
    BELOW2: "ground_below2"
  },
  PLATFORM: {
    LEFT: "platform_left",
    RIGHT: "platform_right",
    CENTER: "platform_center"
  },
  LADDER: "ladder"
};

const ABILITIES = {
  JUMP: "jump",
  CLIMB: "climb"
}

const TAGS = {
  PLAYER: "player",
  ENTITY: {
    TRIANGLE: "triangle",
    SQUARE: "square"
  },
  CLIMBABLE: "climbable",
  TEXT: "text",
  UI: "ui"
}

const LEVELS = {
  ONE: [
    "                                                                                                                                                                         ",
    "                                                                                    S                                                                                    ",
    "                                                                                    [_]                   OO                                                             ",
    "                                                                        OO          |                   OOOOOO                                                           ",
    "                                                                       OOOO         | _                     OOOOOO                                                       ",
    "                                                                        OO          |                                                                                    ",
    "                                                                                    | [_]                                                                                ",
    "                                    OO                     []   GGGGG               |        [___]                                                                       ",
    "                 OO               OOOOO                         UUBUB               |                    [_____]                                                         ",
    "               OOO                 OOO                 []       BBUBBG|           []| []  []      []                                                                     ",
    "                                                           [_]  BBBUB |             |                                                                                    ",
    "                                                                UUBBB |      [___]  |                                                                                    ",
    "                                                               BBBUUB |             |                                                                                    ",
    "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG   T  GGGGGBUBBUBBGGGGGGGGG   GGGG   GGG                                                         GGGGGGGGGGGGGGGGGGGGG",
    "BUBBUBUUBUBBUBUBBBUBBBUUUBBUBUBBUUBUBUUBUBBUBUBBUBUGGGGGGUBBUBUUBUBUUUBBBUBUBU   UBUB GGUBUGGGG                                                    BUBBBUBUBUBBBUUUBUBUBU",
    "BUUBUBUUUBBBUBUBUBBBUBUBUUBUBUBUBUBUBBBUBUBUBBBUUUBUBUBBBUBUBBUUBBBUBBUBUUBUBB   UBBU  BUUUBBUBG                                                        BUBUUBUBBUBUBBUBU",
    "UBUBUUBUBUBUBUBUBBBUBUBUBBBUUUBUBUBBBUBUBBUUBBBUBBUBUUBUBBUBUBBBUBUBUBBBUBUB     BBUB  UBBBUBUB                                                                          ",
    "BBBUBUBBBUBBBUUUBBUBUBBUUBUBUUBUBBBUBBBUUUBBUBUBBUUBUBUUBUBBUBUBBUBUGGGGGGU      BBUB  UBBBUBU                                                                           ",
    "BBBBBBBBBBBBBBBBBUBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBUUUBBBBBBBBBGG    UBBB    BBBBB                                                                           ",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB        BBB     B                                                                              ",
    "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB                 BB                                                                                     "
  ],
}

/* MAIN */
scene("main", () => {
  layers([
    "bg",
    "obj",
    "ui"
  ], "obj");

  const levelConfig = {
    width: GRID.WIDTH,
    height: GRID.HEIGHT,
    "G": [sprite(SPRITES.GROUND.TOP), scale(SPRITE_SIZE), solid()],
    "B": [sprite(SPRITES.GROUND.BELOW), scale(SPRITE_SIZE), solid()],
    "U": [sprite(SPRITES.GROUND.BELOW2), scale(SPRITE_SIZE), solid()],
    "T": [sprite(SPRITES.ENTITY.TRIANGLE), scale(SPRITE_SIZE), body({ jumpForce: JUMPFORCE, maxVel: 2400 }), TAGS.ENTITY.TRIANGLE, { timer: 0 }],
    "S": [sprite(SPRITES.ENTITY.SQUARE), scale(SPRITE_SIZE), body(), TAGS.ENTITY.SQUARE],
    "O": [rect(64, 64), color(1, 1, 1, 0.5), layer(LAYERS.BACKGROUND)],
    "|": [sprite(SPRITES.LADDER), scale(SPRITE_SIZE), TAGS.CLIMBABLE],
    "[": [sprite(SPRITES.PLATFORM.LEFT), scale(SPRITE_SIZE), solid()],
    "]": [sprite(SPRITES.PLATFORM.RIGHT), scale(SPRITE_SIZE), solid()],
    "_": [sprite(SPRITES.PLATFORM.CENTER), scale(SPRITE_SIZE), solid()]
  }

  addLevel(LEVELS.ONE, levelConfig);
  gravity(GRAVITY);

  const player = add([
    sprite(SPRITES.PLAYER),
    scale(0.25),
    TAGS.PLAYER,
    pos(530,600),
    area(vec2(-120, -20), vec2(120, 120)),
    body({
      jumpForce: JUMPFORCE,
      maxVel: 1800
    }),
    origin("center"),
    {
      unlockedAbilities: [],
      isClimbing: false
    }
  ]);

  /* UI */
  const skillBar = add([rect(), pos(0, 0), TAGS.UI, 
    { 
      text: add([text("Unlocked:", 18), pos(4, 4), layer(LAYERS.UI)]),
      children: {}
    }
  ]);

  /* CAMERA AND ACTIONS */
  camIgnore([LAYERS.UI]);

  player.action(() => {
    camPos(player.pos);

    if (player.pos.y > KILLPLANE) {
      go("gameOver");
    }
  });

  action(TAGS.ENTITY.TRIANGLE, (t) => {
    t.timer += dt();

    if (t.timer > 1.5) {
      t.jump();
      t.timer = 0;
    }
  });

  action(TAGS.TEXT, (t) => {
    t.timer -= dt();

    if (t.timer <= 0) {
      destroy(t);
    }
  })

  /* COLLISION */
  collides(TAGS.PLAYER, TAGS.ENTITY.TRIANGLE, (p, _) => {
    if (!p.unlockedAbilities.includes(ABILITIES.JUMP)) {
      camShake(6);
      p.unlockedAbilities.push(ABILITIES.JUMP);

      add([
        text("You've learned how to jump! (press UP)", 18, {
          width: 400,
          noArea: true
        }),
        pos(player.pos.x, player.pos.y - 200),
        origin("center"),
        TAGS.TEXT,
        { timer: 5 }
      ]);

      skillBar.children.triangleIcon = add([
        sprite(SPRITES.ENTITY.TRIANGLE),
        layer(LAYERS.UI),
        scale(0.20),
        TAGS.UI,
        pos(20, 20)
      ]);
    }
  });

  collides(TAGS.PLAYER, TAGS.ENTITY.SQUARE, (p, _) => {
    if (!p.unlockedAbilities.includes(ABILITIES.CLIMB)) {
      camShake(6);
      p.unlockedAbilities.push(ABILITIES.CLIMB);

      add([
        text("You've learned how to climb! (press UP or DOWN on a ladder)", 18, {
          width: 400,
          noArea: true
        }),
        pos(player.pos.x, player.pos.y - 200),
        origin("center"),
        TAGS.TEXT,
        { timer: 5 }
      ]);

      skillBar.children.squareIcon = add([
        sprite(SPRITES.ENTITY.SQUARE),
        layer(LAYERS.UI),
        scale(0.20),
        TAGS.UI,
        pos(80, 20)
      ]);
    }
  });

  overlaps(TAGS.PLAYER, TAGS.CLIMBABLE, (p, _) => {
    if (p.unlockedAbilities.includes(ABILITIES.CLIMB)) {
      keyDown("up", () => {
        p.move(0, -20);
      });

      keyDown("down", () => {
        p.move(0, 20);
      })
    }
  });

  /* CONTROLS */
  keyPress("right", () => {
    player.play("walk");
  });

  keyDown("right", () => {
    player.resolve();
    player.move(MOVESPEED, 0);
  });

  keyRelease("right", () => {
    player.stop();
  });

  keyPress("left", () => {
    console.log(player);
    player.play("walk");
  });

  keyDown("left", () => {
    player.resolve();
    if (player.pos.x > 520) {
      player.move(-MOVESPEED, 0);
    }
  });

  keyRelease("left", () => {
    player.stop();
  });

  keyPress("up", () => {
    if (player.grounded() && player.unlockedAbilities.includes(ABILITIES.JUMP)) {
      player.jump();
    }
  })
});

/* GAME OVER */
scene("gameOver", () => {
  add([
    text("Game over", 64),
    pos(width() / 2, height() / 2),
    origin("center")
  ]);

  add([
    text("Your journey ended too soon. Try again?", 18),
    pos(width() / 2, height() / 2 + 60),
    origin("center")
  ]);

  const button = add([
    rect(200,50),
    pos(width() / 2, height() / 2 + 150), {
      color: rgba(0, 0, 0, 0.5),
      origin: "center",
      text: add([
        text("OK", 18),
        pos(width() / 2, height() / 2 + 150),
        origin("center")
      ])
    }
  ]);

  mouseClick(() => {
    const mPos = mousePos();
    if (mPos.x > button.pos.x - button.width / 2 
      && mPos.x < button.pos.x + button.width / 2 
      && mPos.y > button.pos.y - button.height / 2
      && mPos.y < button.pos.y + button.height / 2) {
      go("main");
    }
  });
});

// start the game
start("main");