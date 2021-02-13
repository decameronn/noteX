'use strict'

const days = ['mon', 'tues', 'wed'];

function findItemInArray() {
  let day = days.find(x => x === 'tues');
  return day ? true : false;
}

// for (const i of days) { console.log(i); }