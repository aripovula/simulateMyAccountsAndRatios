import React from 'react';
import * as firebase from 'firebase';
import database from '../firebase/firebase';
import moment from 'moment';
import uuid from 'uuid';

import { startAddPosting, startSetPostings } from '../actions/postings';
import { getEntryOptions } from "./getEntryOptions";

const addSimulatedEntries = (props) => {
  //console.log('props addDim');
  // console.log(props);
  var user = firebase.auth().currentUser;
  return addAllPostingsInArray()
    .then((postings) => { return database.ref(`users/${user.uid}/postings`).set(postings) })
    .then(() => props.dispatch(startSetPostings()))
}


const addAllPostingsInArray = () => {

  let entryOptions = getEntryOptions();
  let postings2 = [];
  let d = new Date();
  let cmonth = d.getMonth() + 1;
  let cyear = d.getFullYear();

  // may be Promise is not necessary here. Added as a precaution in case moment takes longer than usual
  return new Promise((resolve, reject) => {
    for (let x = 0; x < cmonth; x++) {
      let days = x == 0 ? d.getDate() : 30;
      let factor = days / 12

      entryOptions.map(entry => {
        let created = moment('' + cyear + '-' + (cmonth - x) + '-' + Math.round((entry.idu + 1) * factor));
        // console.log('entry.idu='+entry.idu);
        // console.log('created='+created);
        let createdAt = moment(created) + 1;
        let postingDate = createdAt;
        let mon = ' - ' + moment(createdAt).format('MMM-YYYY');

        // let newLines = [];
        // if (entry.idu == 0) {
        //   entry.lines.map(line => {
        //     let newLine;
        //     let newAmount = (line.amount * ((cmonth - x) ^ 1.01)) - (line.amount * (((cmonth - x) - 1 ) ^ 1.01));
        //     console.log('newAmount = '+newAmount);
        //     newLine = {
        //       idu: line.idu,
        //       isDr: line.isDr,
        //       lineItem: line.lineItem,
        //       amount: newAmount,
        //       lineItemID: line.lineItemID
        //     }
        //     newLines.push(newLine);
        //   });
        //   console.log('newLines posting = ' + mon);
        //   console.log(newLines);
        // }

        console.log(entry.idu+ '   note = '+entry.name);
        let posting = {
          linesData: entry.idu == 0 ? newLines : entry.lines,
          note: 'to ' + entry.name.replace("\n\r", "") + mon,
          totalAmount: entry.totalAmount,
          createdAt,
          postingDate,
          isUnPosted: false
        }

        postings2[uuid()] = posting;
      });
      if (x == cmonth - 1) resolve(postings2);
    }

  });
}

export default addSimulatedEntries;

// OLD VERSION WHICH STORES ONE BY ONE

// const addAllPostingsInArray = () => {

//   var user = firebase.auth().currentUser;
//   let entryOptions = getEntryOptions();

//   let createdAt = moment() - 30 * 24 * 60 * 60 * 1000;
//   let postingDate = moment() - 1;
//   let mon = ' - ' + moment(createdAt).format('MMM.YY');
//   let postings2 = [];

//   console.log('createD=' + createdAt);
//   console.log('postingD=' + postingDate);
//   //let momt = moment();
//   return new Promise((resolve, reject) => {
//     let count = 0;
//     entryOptions.map(entry => {
//       let posting = {
//         linesData: entry.lines,
//         note: 'to ' + entry.name.replace("\n\r", "") + mon,
//         totalAmount: 0,
//         createdAt,
//         postingDate,
//         isUnPosted: false
//       }

//       database.ref(`users/${user.uid}/postings`).push(posting).then(() => {
//         count++;
//         // console.log('entryOptions done   count = ' + count);
//         if (count == entryOptions.length) {
//           console.log('entryOptions ALL done');
//           resolve();
//         }
//       }
//       );
//     });
//   });
// }