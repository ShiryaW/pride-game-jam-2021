// initialize kaboom context
const kaboomConfig = {
  width: 1024,
  height: 800,
  global: true,
  clearColor: [ 0.56, 0.80, 1, 1 ]
}

const k = kaboom(kaboomConfig);

loadSprite("player", "./resources/player.png", {
  sliceX: 13,
  sliceY: 2,
  anims: {
    walkRight: {
      from: 0,
      to: 3,
    },
    walkLeft: {
      from: 6,
      to: 9
    },
    idle: {
      from: 5,
      to: 5
    },
    climb: {
      from: 4,
      to: 4
    },
    jumpRight: {
      from: 10,
      to: 10
    },
    jump: {
      from: 11,
      to: 11
    },
    jumpLeft: {
      from: 12,
      to: 12
    },
    walkRightHappy: {
      from: 13,
      to: 16
    },
    walkLeftHappy: {
      from: 19,
      to: 22
    },
    idleHappy: {
      from: 18,
      to: 18
    }
  }
});
loadSprite("ground", "./resources/ground.png");
loadSprite("ground2", "./resources/ground2.png");
loadSprite("ground_below", "./resources/ground_below.png");
loadSprite("ground_below2", "./resources/ground_below_2.png");
loadSprite("platform_left", "./resources/platform_left.png");
loadSprite("platform_right", "./resources/platform_right.png");
loadSprite("platform_center", "./resources/platform_center.png");
loadSprite("ladder", "./resources/ladder.png");
loadSprite("triangle", "./resources/triangle.png");
loadSprite("square", "./resources/square.png");

//tree
loadSprite("tree1", "./resources/tree/tree_1.png");
loadSprite("tree2", "./resources/tree/tree_2.png");
loadSprite("tree3", "./resources/tree/tree_3.png");
loadSprite("tree4", "./resources/tree/tree_4.png");
loadSprite("tree5", "./resources/tree/tree_5.png");
loadSprite("tree6", "./resources/tree/tree_6.png");
loadSprite("tree7", "./resources/tree/tree_7.png");
loadSprite("tree8", "./resources/tree/tree_8.png");

//door
loadSprite("door1", "./resources/door/door_1.png");
loadSprite("door2", "./resources/door/door_2.png");
loadSprite("door3", "./resources/door/door_3.png");
loadSprite("door4", "./resources/door/door_4.png");
loadSprite("door5", "./resources/door/door_5.png");
loadSprite("door6", "./resources/door/door_6.png");

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
  TREE: {
    1: "tree1",
    2: "tree2", 
    3: "tree3", 
    4: "tree4", 
    5: "tree5", 
    6: "tree6", 
    7: "tree7", 
    8: "tree8"
  },
  DOOR: {
    1: "door1",
    2: "door2", 
    3: "door3", 
    4: "door4", 
    5: "door5", 
    6: "door6"
  },
  LADDER: "ladder"
};

const ABILITIES = {
  JUMP: "jump",
  CLIMB: "climb",
  SELF: "self"
}

const TAGS = {
  PLAYER: "player",
  ENTITY: {
    TRIANGLE: "triangle",
    SQUARE: "square",
    SELF: "self"
  },
  CLIMBABLE: "climbable",
  DOOR: "door",
  TEXT: "text",
  UI: "ui"
}

const DIRECTION = {
  LEFT: "left",
  RIGHT: "right",
  NONE: "none"
}

const LEVELS = {
  ONE: [
    "                                                                                           OOO                                                                           ",
    "                                                                                    S     OOO   OO                                                                       ",
    "                                                                                    [_]                   OO                                                             ",
    "     OOO                                                                OO          |              |[]  OOOOOO                   P                                       ",
    "                                                                       OOOO         |[]            |        OOOOOO             |[_]                                      ",
    "                                                                        OO          |              |                           |                                         ",
    "                       1 2 3            1 2 3                                       | [_]          |                |[___]     |                                         ",
    "                                    OO                     []   GGGGG               |        [___] |                |          |                                         ",
    "                 OO    4 5 6      OOOOO 4 5 6                   UUBUB               |              |     [_____]    |                                                    ",
    "               OOO                 OOO                 []       BBUBBG|           []| []  []      []                |                                                    ",
    "    OO                   7                7                [_]  BBBUB |             |                                                                       +ě           ",
    "  OOOOO                                                         UUBBB |      [___]  |                                                                       šč           ",
    "                         8  OO            8                    GBBUUB |             |                                                                       řž           ",
    "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG   T  GGGGGGUBBUBBGGGGGGGGG   GGGG   GGG                                                         GGGGGGGGGGGGGGGGGGGGG",
    "BUBBUBUUBUBBUBUBBBUBBBUUUBBUBUBBUUBUBUUBUBBUBUBBUBUGGGGGGUBBUBUUBUBUUUBBBUBUBU   UBUB GGUBUGGGG                                                    BUBBBUBUBUBBBUUUBUBUBU",
    "BUUBUBUUUBBBUBUBUBBBUBUBUUBUBUBUBUBUBBBUBUBUBBBUUUBUBUBBBUBUBBUUBBBUBBUBUUBUBB   UBBU  BUUUBBUBG                                                        BUBUUBUBBUBUBBUBU",
    "UBUBUUBUBUBUBUBUBBBUBUBUBBBUUUBUBUBBBUBUBBUUBBBUBBUBUUBUBBUBUBBBUBUBUBBBUBUB     BBUB  UBBBUBUB                                                                          ",
    "BBBUBUBBBUBBBUUUBBUBUBBUUBUBUUBUBBBUBBBUUUBBUBUBBUUBUBUUBUBBUBUBBUBUUBUBUBU      BBUB  UBBBUBU                                                                           ",
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
    "P": [sprite(SPRITES.PLAYER), scale(SPRITE_SIZE), body(), TAGS.ENTITY.SELF],
    "O": [rect(64, 64), color(1, 1, 1, 0.5), layer(LAYERS.BACKGROUND)],
    "|": [sprite(SPRITES.LADDER), scale(SPRITE_SIZE), TAGS.CLIMBABLE],
    "[": [sprite(SPRITES.PLATFORM.LEFT), scale(SPRITE_SIZE), solid()],
    "]": [sprite(SPRITES.PLATFORM.RIGHT), scale(SPRITE_SIZE), solid()],
    "_": [sprite(SPRITES.PLATFORM.CENTER), scale(SPRITE_SIZE), solid()],
    "1": [sprite(SPRITES.TREE[1]), scale(0.5), layer(LAYERS.BACKGROUND)],
    "2": [sprite(SPRITES.TREE[2]), scale(0.5), layer(LAYERS.BACKGROUND)],
    "3": [sprite(SPRITES.TREE[3]), scale(0.5), layer(LAYERS.BACKGROUND)],
    "4": [sprite(SPRITES.TREE[4]), scale(0.5), layer(LAYERS.BACKGROUND)],
    "5": [sprite(SPRITES.TREE[5]), scale(0.5), layer(LAYERS.BACKGROUND)],
    "6": [sprite(SPRITES.TREE[6]), scale(0.5), layer(LAYERS.BACKGROUND)],
    "7": [sprite(SPRITES.TREE[7]), scale(0.5), layer(LAYERS.BACKGROUND)],
    "8": [sprite(SPRITES.TREE[8]), scale(0.5), layer(LAYERS.BACKGROUND)],
    "+": [sprite(SPRITES.DOOR[1]), scale(SPRITE_SIZE), TAGS.DOOR],
    "ě": [sprite(SPRITES.DOOR[2]), scale(SPRITE_SIZE), TAGS.DOOR],
    "š": [sprite(SPRITES.DOOR[3]), scale(SPRITE_SIZE), TAGS.DOOR],
    "č": [sprite(SPRITES.DOOR[4]), scale(SPRITE_SIZE), TAGS.DOOR],
    "ř": [sprite(SPRITES.DOOR[5]), scale(SPRITE_SIZE), TAGS.DOOR],
    "ž": [sprite(SPRITES.DOOR[6]), scale(SPRITE_SIZE), TAGS.DOOR]
  }

  addLevel(LEVELS.ONE, levelConfig);
  gravity(GRAVITY);

  const player = add([
    sprite(SPRITES.PLAYER),
    scale(0.25),
    TAGS.PLAYER,
    pos(530,600),
    area(vec2(-120, -20), vec2(120, 120)),
    color([1, 1, 1, 1]),
    body({
      jumpForce: JUMPFORCE,
      maxVel: 500
    }),
    origin("center"),
    {
      unlockedAbilities: [],
      currentAbility: undefined,
      isClimbing: false
    }
  ]);

  /* UI */
  const skillBar = add([rect(), pos(0, 0), TAGS.UI, 
    { 
      text: add([text("Unlocked (q/w/e to activate):", 18), pos(4, 4), layer(LAYERS.UI)]),
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

    if (player.isClimbing) {
      if (player.pos.x < player.objectClimbed.pos.x - GRID.WIDTH / 2 
        || player.pos.x > player.objectClimbed.pos.x + GRID.WIDTH) {
        player.enablePhysics(false);
        player.objectClimbed = undefined;
        player.isClimbing = false;
      }
    }

    // this part is disgusting, if you're seeing it I am deeply sorry
    if (player.grounded()) {
      switch (player.curAnim()) {
        case "jumpLeft":
        case "jump":
        case "jumpRight":
          if (player.currentAbility === ABILITIES.SELF) {
            if (keyIsDown("left")) {
              player.play("walkLeftHappy");
            } else if (keyIsDown("right")) {
              player.play("walkRightHappy");
            } else {
              player.play("idleHappy");
            }
          } else {
            if (keyIsDown("left")) {
              player.play("walkLeft");
            } else if (keyIsDown("right")) {
              player.play("walkRight");
            } else {
              player.play("idle");
            }
          }
        default:
      }
    }
  });

  action(TAGS.ENTITY.TRIANGLE, (t) => {
    t.timer += dt();

    if (t.timer > 2) {
      t.jump();
      t.timer = 0;
    }
  });

  action(TAGS.ENTITY.SELF, (s) => {
    s.play("idleHappy");
  });

  action(TAGS.TEXT, (t) => {
    t.timer -= dt();

    if (t.timer <= 0) {
      destroy(t);
    }
  });

  /* COLLISION */
  collides(TAGS.PLAYER, TAGS.ENTITY.TRIANGLE, (p, _) => {
    if (!p.unlockedAbilities.includes(ABILITIES.JUMP)) {
      camShake(6);
      p.unlockedAbilities.push(ABILITIES.JUMP);

      add([
        text("You've learned how to jump!\n(activate and press UP)", 18, {
          width: 600,
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
        color([0.5, 0.5, 1, 1]),
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
        text("You've learned how to climb!\n(hold UP on a ladder)", 18, {
          width: 600,
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
        color([0.5, 0.5, 1, 1]),
        scale(0.20),
        TAGS.UI,
        pos(80, 20)
      ]);
    }
  });

  collides(TAGS.PLAYER, TAGS.ENTITY.SELF, (p, s) => {
    if (!p.unlockedAbilities.includes(ABILITIES.SELF)) {
      camShake(6);
      p.unlockedAbilities.push(ABILITIES.SELF);

      add([
        text("You've learned how to do it all!\n(activate with E)", 18, {
          width: 600,
          noArea: true
        }),
        pos(player.pos.x, player.pos.y - 200),
        origin("center"),
        TAGS.TEXT,
        { timer: 5 }
      ]);

      skillBar.children.selfIcon = add([
        sprite(SPRITES.PLAYER),
        layer(LAYERS.UI),
        color([0.5, 0.5, 1, 1]),
        scale(0.20),
        TAGS.UI,
        pos(140, 20)
      ]);

      skillBar.children.selfIcon.play("idleHappy");
    }
  });

  overlaps(TAGS.PLAYER, TAGS.CLIMBABLE, (p, c) => {
    if (p.currentAbility === ABILITIES.CLIMB || p.currentAbility === ABILITIES.SELF) {
      p.isClimbing = true;
      p.objectClimbed = c;
    }
  });

  overlaps(TAGS.PLAYER, TAGS.DOOR, (p, _) => {
    destroy(p);

    add([
      text("SELF", 256),
      origin("center"),
      pos(width() / 2, height() / 2),
      layer(LAYERS.UI)
    ]);
  });

  /* CONTROLS */
  keyPress("right", () => {
    player.dir = DIRECTION.RIGHT;
    if (player.grounded()) {
      if (player.currentAbility === ABILITIES.SELF) {
        player.play("walkRightHappy");
      } else {
        player.play("walkRight");
      }
    }
  });

  keyDown("right", () => {
    player.resolve();
    player.move(MOVESPEED, 0);
  });

  keyRelease(["right", "left"], () => {
    if (!keyIsDown("left") && !keyIsDown("right")) {
      player.dir = DIRECTION.NONE;
      if (player.grounded()) {
        if (player.currentAbility === ABILITIES.SELF) {
          player.play("idleHappy");
        } else {
          player.play("idle");
        }
      }
    }
  });

  keyPress("left", () => {
    player.dir = DIRECTION.LEFT;
    if (player.grounded()) {
      if (player.currentAbility === ABILITIES.SELF) {
        player.play("walkLeftHappy");
      } else {
        player.play("walkLeft");
      }
    }
  });

  keyDown("left", () => {
    player.resolve();
    if (player.pos.x > 520) {
      player.move(-MOVESPEED, 0);
    }
  });

  keyDown("up", () => {
    if (player.isClimbing && (player.currentAbility === ABILITIES.CLIMB || player.currentAbility === ABILITIES.SELF)) {
      player.play("climb");
      player.enablePhysics(true);
      player.move(0, -200);
    }
  });

  keyPress("up", () => {
    if (player.grounded() && !player.isClimbing && (player.currentAbility === ABILITIES.JUMP || player.currentAbility === ABILITIES.SELF)) {
      if (player.dir === DIRECTION.LEFT) {
        player.play("jumpLeft");
      } else if (player.dir === DIRECTION.RIGHT) {
        player.play("jumpRight");
      } else {
        player.play("jump");
      }
      player.resolve();
      player.jump();
    }
  });

  keyRelease("up", () => {
    player.enablePhysics(false);
  });

  keyDown("down", () => {
    if (player.isClimbing && (player.currentAbility === ABILITIES.CLIMB || player.currentAbility === ABILITIES.SELF)) {
      player.move(0, 10);
    }
  });

  keyPress("q", () => {
    if (player.unlockedAbilities.includes(ABILITIES.JUMP)) {
      player.currentAbility = ABILITIES.JUMP;
      player.color = rgba(0.92, 0.59, 0.20, 1);
      skillBar.children.triangleIcon.color = undefined;

      if (skillBar.children.squareIcon) {
        skillBar.children.squareIcon.color = color([0.5, 0.5, 1, 1]).color;
      }

      if (skillBar.children.selfIcon) {
        skillBar.children.selfIcon.color = color([0.5, 0.5, 1, 1]).color;
      }
    }
  });

  keyPress("w", () => {
    if (player.unlockedAbilities.includes(ABILITIES.CLIMB)) {
      player.currentAbility = ABILITIES.CLIMB;
      player.color = rgba(0.68, 0.30, 0.82, 1);
      skillBar.children.squareIcon.color = undefined;

      if (skillBar.children.triangleIcon) {
        skillBar.children.triangleIcon.color = color([0.5, 0.5, 1, 1]).color;
      }

      if (skillBar.children.selfIcon) {
        skillBar.children.selfIcon.color = color([0.5, 0.5, 1, 1]).color;
      }
    }
  });

  keyPress("e", () => {
    if (player.unlockedAbilities.includes(ABILITIES.SELF)) {
      player.currentAbility = ABILITIES.SELF;
      player.color = undefined;
      skillBar.children.selfIcon.color = undefined;

      if (skillBar.children.triangleIcon) {
        skillBar.children.triangleIcon.color = color([0.5, 0.5, 1, 1]).color;
      }

      if (skillBar.children.squareIcon) {
        skillBar.children.squareIcon.color = color([0.5, 0.5, 1, 1]).color;
      }
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
    text("You have lost yourself. Try again?", 18),
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