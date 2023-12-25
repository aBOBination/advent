// https://adventofcode.com/2023/day/1

const fs = require('fs');

const filePath = '2023/12/1/data.txt';

const data = fs.readFileSync(filePath).toString().split("\n");

const arrayToNumber = (arr) => arr.length === 0 ? 0 : Number(arr[0].toString() + arr[arr.length - 1].toString())

const replaceWordWithNumber = (str) => {
  return str.replaceAll("one", "o1ne").replaceAll("two", "t2wo")
    .replaceAll("three", "t3hree").replaceAll("four", "f4our").replaceAll("five", "f5ive")
    .replaceAll("six", "s6ix").replaceAll("seven", "s7even").replaceAll("eight", "e8ight")
    .replaceAll("nine", "n9ine")

}

const reduceStringToArrayOfNumbers = (acc, char) => {
  if (!isNaN(Number(char)) && typeof Number(char) === 'number') {
    acc.push(Number(char))
  }
  return acc
}

const calibrateValues = (str) => {
  const reducedString = str.split('').reduce((acc, char) =>
    reduceStringToArrayOfNumbers(acc, char)
    , [])
  return arrayToNumber(reducedString)
}

const sumOfCalibrationData = (data, part) => {
  const res = data.reduce((acc, str) => {
    const value = part === 'part1' ? str : replaceWordWithNumber(str)
    return acc + calibrateValues(value)
  }
    , 0)
  console.log({ [part]: res })
}

sumOfCalibrationData(data, 'part1')
sumOfCalibrationData(data, 'part2')
