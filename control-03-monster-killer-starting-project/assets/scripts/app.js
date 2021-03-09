const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 21;
const HEAL_VALUE = 20;

const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

function getMaxLifeValues() {
  const enteredValue = prompt(
    "Enter the maximum life for you and the monster",
    "100"
  );
  const parsedValue = parseInt(enteredValue);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: "invalid user input , not a number " };
  }
  return parsedValue;
}
let chosenMaxLife;
try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert("you entered something wrong , default value of 100 was used!");
}
let currentMosnaterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = "MONSTER";
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = "MONSTER";
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = "PLAYER";
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = "PLAYER";
      break;
    case LOG_EVENT_GAME_OVER:
      break;
    default:
      logEntry = {};
  }

  // if (event === LOG_EVENT_PLAYER_ATTACK) {
  //   logEntry.target = "MONSTER";
  // } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //   logEntry.target = "MONSTER";
  // } else if (event === LOG_EVENT_MONSTER_ATTACK) {
  //   logEntry.target = "PLAYER";
  // } else if (event === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry.target = "PLAYER";
  // }
  battleLog.push(logEntry);
}

function reset() {
  currentPlayerHealth = chosenMaxLife;
  currentMosnaterHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMosnaterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("you would be dead but the bonus life saved you!!");
  }

  if (currentMosnaterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won!!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "player won",
      currentMosnaterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMosnaterHealth > 0) {
    alert("you lost!!!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "monster won",
      currentMosnaterHealth,
      currentPlayerHealth
    );
  } else if (currentMosnaterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("you have a draw!!!!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "a draw",
      currentMosnaterHealth,
      currentPlayerHealth
    );
  }

  if (currentMosnaterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(attackValue) {
  let logEvent =
    attackValue === ATTACK_VALUE
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;
  // if (attackValue === ATTACK_VALUE) {
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else if (attackValue === STRONG_ATTACK_VALUE) {
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }
  const damage = dealMonsterDamage(attackValue);
  currentMosnaterHealth -= damage;
  writeToLog(logEvent, damage, currentMosnaterHealth, currentPlayerHealth);

  endRound();
}

function attackHandler() {
  attackMonster(ATTACK_VALUE);
}
function strongAttackHandler() {
  attackMonster(STRONG_ATTACK_VALUE);
}
function healPLayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("you cant heal above your maximum chosen life");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;

  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMosnaterHealth,
    currentPlayerHealth
  );

  endRound();
}

function printLogHandler() {
  //normal for loop
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }
  //for of loop ,also used with arrays
  let i = 0;
  for (const element of battleLog) {
    console.log(`#${i}`);
    for (const key in element) {
      console.log(key);
      console.log(element[key]);
    }
    i++;
  }
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPLayerHandler);
logBtn.addEventListener("click", printLogHandler);
