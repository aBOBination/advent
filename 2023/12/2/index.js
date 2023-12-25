const fs = require('fs');

const filePath = '2023/12/2/data.txt';

const data = fs.readFileSync(filePath).toString().split("\n");

// const data = [
// 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
// 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
// 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
// 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
// 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
// ]

const gameRules = {
  'red': 12,
  'green': 13,
  'blue': 14,
}

const getGameData = (gameData) => gameData.split(';').map((round) => {
  const roundData = round.trim().split(',').map((color) => {
    const colorData = color.trim().split(' ');
    return {
      color: colorData[1],
      number: Number(colorData[0]),
    }
  });
  return roundData;
}
)

const processRound = (round, gameRules) => {
  const roundArrayResponse = round.map((round) => {
    const roundColor = round.color
    const roundNumber = round.number
    if (roundNumber > gameRules[roundColor]) return false
    return true
  })
  return roundArrayResponse.every((item) => item === true)
}

const processGame = (gameData, gameRules) => {
  const gameArrayResponse = gameData.map((round) => processRound(round, gameRules))
  return gameArrayResponse.every((item) => item === true)
}

const getMinNumberPerColor = (gameData) => {
  const flatArray = gameData.map((round) => round.map((item) => item)).flat().reduce((acc, cur) => {
    const color = cur.color
    const number = cur.number
    if (acc[color]) {
      if (acc[color] <= number) {
        acc[color] = number
      }
    } else {
      acc[color] = number
    }
    return acc
  }
    , {})
    const power = Object.values(flatArray).reduce((acc, cur) => acc * cur, 1)
  return power
}

const isGamePossible = (game, gameRules) => {
  const regex = /^Game (\d+): (.+)$/;
  const match = regex.exec(game);
  const gameId = Number(match[1]);
  const gameData = getGameData(match[2])
  const power = getMinNumberPerColor(gameData)
  const isGamePossible = processGame(gameData, gameRules)
  if (isGamePossible) {
    return { gameId, power }
  }
  return {gameId:0, power}
}
const processGames = (data, gameRules) => {
  const sum = data.reduce((acc, cur) => {
    const { gameId } = isGamePossible(cur, gameRules)
    return acc + gameId
  }, 0)
  const power = data.reduce((acc, cur) => {
    const { power } = isGamePossible(cur, gameRules)
    return acc + power
  }, 0)
  console.log({ part1:  sum, part2: power  })
}

processGames(data, gameRules, 'part1')
