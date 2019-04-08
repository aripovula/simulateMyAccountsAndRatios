import React from 'react';
import * as firebase from 'firebase';
import database from '../firebase/firebase';
import moment from 'moment';
import uuid from 'uuid';
import numeral from 'numeral';

import { startAddPosting, startSetPostings } from '../actions/postings';
import { getEntryOptions } from "./getEntryOptions";

const addSimulatedEntries = (props) => {
  var user = firebase.auth().currentUser;
  // console.log('user');
  // console.log(user);
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
      let days = x == 0 ? d.getDate() : (cmonth - x) == 2 ? 28 : 30;
      let factor = (days - 1) / 12;
      // console.log('x='+x+'  days='+days);

      entryOptions.map(entry => {
        let created = moment('' + cyear + '-' + (cmonth - x) + '-' + (Math.round((entry.idu + 1) * factor) + 1) );
        //console.log('' + cyear + '-' + (cmonth - x) + '-' + (Math.round((entry.idu + 1) * factor) + 1));
        // console.log('cyear-'+cyear + ' month=' + cmonth + '  x-' +  x + '- idu =' + entry.idu  + ' factor=' +  factor);
        // console.log('entry.idu='+entry.idu);
        // console.log('created='+created);
        let createdAt = moment(created) + 1;
        let postingDate = createdAt;
        let mon = ' - ' + moment(createdAt).format('MMM-YYYY');
        // console.log('createdAt='+moment(createdAt).format('DD MMM YYYY'));
        let newLines = [];
        if (entry.idu == 0) {
          let index = cmonth - x;
          let power = 1.01;
          if (index == 4 || index == 7 || index == 10) power = 1.012;
          if (index == 2 || index == 9 || index == 11) power = 1.005;
          // console.log('power= i= '+index);
          // console.log('power= p= '+power);
          entry.lines.map(line => {
            let newAmountGr = (line.amount * Math.pow(index, power)).toFixed(0);
            let newAmountPr = (line.amount * Math.pow(index-1, power)).toFixed(0);
            let newAmount = newAmountGr - newAmountPr;
            // console.log('newAmount = index = '+index+ '  newAmountGr='+numeral(newAmountGr/100).format('0,0')+ '  newAmountPr='+numeral(newAmountPr/100).format('0,0'));
            // console.log('newAmount = '+numeral(newAmount/100).format('0,0')+' '+mon+' '+line.lineItem);
            newLines.push({
              idu: line.idu,
              isDr: line.isDr,
              lineItem: line.lineItem,
              amount: newAmount,
              lineItemID: line.lineItemID
            });
          });
          // console.log('newLines posting = ' + mon);
          // console.log(newLines);
        }

        // console.log(entry.idu+ '   note = '+entry.name);
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