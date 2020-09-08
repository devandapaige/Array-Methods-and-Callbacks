import { fifaData } from "./fifa.js";
//console.log(fifaData);
//console.log(`it's working`);
// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final */

//(b) Away Team name for 2014 world cup final
//(c) Home Team goals for 2014 world cup final
//(d) Away Team goals for 2014 world cup final
//(e) Winner of 2014 world cup final

const finals2014 = fifaData.filter((item) => {
  return item.Year === 2014 && item.Stage === "Final";
});

console.log(`***Task 1: 2014 Finals Data`);
console.log(`   1.a: Home Team was: ${finals2014[0]["Home Team Name"]}`);
console.log(`   1.b: Away Team: ${finals2014[0]["Away Team Name"]}`);
console.log(`   1.c: Home Team Goals: ${finals2014[0]["Home Team Goals"]}`);
console.log(`   1.d: Away Team Goals: ${finals2014[0]["Away Team Goals"]}`);
let homeFinal2014 = finals2014[0]["Home Team Goals"];
let awayFinal2014 = finals2014[0]["Away Team Goals"];
function finalsWinner(home, away, dataset) {
  if (home > away) {
    console.log(`   1.e: Home Team Wins, Go ${dataset[0]["Home Team Name"]}!`);
  } else if (away > home) {
    console.log(`   1.e: Away Team Wins, Go ${dataset[0]["Away Team Name"]}!`);
  }
}
finalsWinner(homeFinal2014, awayFinal2014, finals2014);

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(stats) {
  return stats.filter((element) => element.Stage === "Final");
}
console.log(`***Task #2: Array of objects:`);
console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback, stats) {
  let years = callback(stats).map((item) => {
    return item.Year;
  });
  return years;
}

console.log(`***Task 3: Array of finals years:`);
console.log(getYears(getFinals, fifaData));

/* Task 4: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */

function getWinners(callback, stats) {
  let winners = [];
  callback(stats).map((item) => {
    if (item["Home Team Goals"] > item["Away Team Goals"]) {
      winners.push(`${item["Home Team Name"]}`);
    } else if (item["Home Team Goals"] < item["Away Team Goals"]) {
      winners.push(`${item["Away Team Name"]}`);
    } else {
      winners.push(item["Win conditions"].split(" ")[0]);
    }
  });
  return winners;
}

console.log(`***Task 4: All winners in array:`);
console.log(getWinners(getFinals, fifaData));

/* Task 5: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */
function getWinnersByYear(
  callbackWinners,
  callbackYears,
  callbackFinals,
  stats
) {
  let winners = callbackWinners(callbackFinals, stats);
  let years = callbackYears(callbackFinals, stats);
  winners.forEach((item, index) => {
    console.log(`   In ${years[index]}, ${item} won the world cup!`);
  });
}

console.log(`***Task #5: Strings about Final results:`);
getWinnersByYear(getWinners, getYears, getFinals, fifaData);

/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
  let avgHomeGoals = Math.round(
    data.reduce((acc, index) => {
      return acc + index["Home Team Goals"] / data.length;
    }, 0)
  );
  let avgAwayGoals = Math.round(
    data.reduce((acc, index) => {
      return acc + index["Away Team Goals"] / data.length;
    }, 0)
  );
  return `    Avg. Home Team Goals: ${avgHomeGoals}, Avg. Away Team Goals ${avgAwayGoals}`;
}

console.log(`***Task #6:`);
console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(callback, stats, initials) {
  const winnerinit = callback(stats).map((item) => {
    if (item["Home Team Goals"] > item["Away Team Goals"]) {
      return item["Home Team Initials"];
    } else if (item["Home Team Goals"] < item["Away Team Goals"]) {
      return item["Away Team Initials"];
    } else {
      return item["Win conditions"].split(" ")[0].slice(0, 3).toUpperCase();
    }
  });
  const initTotalWins = winnerinit.reduce((total, item) => {
    if (item === initials) {
      return (total += 1);
    } else {
      return total;
    }
  }, 0);

  return `${initials} has ${initTotalWins} World Cup Final Wins`;
}

console.log(`~~~STRETCH #1~~~`);
console.log(`ITA should be 4 / ESP should be 1 / FRG should be 3`);
console.log(getCountryWins(getFinals, fifaData, "ITA"));
console.log(getCountryWins(getFinals, fifaData, "ESP"));
console.log(getCountryWins(getFinals, fifaData, "FRG"));

/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
  /* code here */
}

getGoals();

/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {
  /* code here */
}

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
