import React from 'react';
import * as firebase from 'firebase';
import database from '../firebase/firebase';
import moment from 'moment';

import { startAddPosting, startSetPostings } from '../actions/postings';
import { getEntryOptions } from "./getEntryOptions";

const addSimulatedEntries = (props) => {
  return addAllPostingsInArray()
    .then(() => props.dispatch(startSetPostings()));
}

const getDate = () => {
  let date = moment().calendar(null, now
  );
  return date;
}

const addAllPostingsInArray = () => {

  var user = firebase.auth().currentUser;
  let entryOptions = getEntryOptions();
  let mon = ' - ' + moment().format('MMM.YY');
  let createD = moment() - 30 * 24 * 60 * 60 * 1000;
  let postingD = moment() - 1;
  console.log('createD='+createD);
  console.log('postingD='+postingD);
  //let momt = moment();
  return new Promise((resolve, reject) => {
    let count = 0;
    entryOptions.map(entry => {
      let posting = {
        linesData: entry.lines,
        note: 'to ' + entry.name.replace("\n\r", "") + mon,
        totalAmount: 0,
        createdAt: createD,
        postingDate: postingD,
        isUnPosted: false
      }

      database.ref(`users/${user.uid}/postings`).push(posting).then(() => {
          count++;
          // console.log('entryOptions done   count = ' + count);
          if (count == entryOptions.length) {
            console.log('entryOptions ALL done');
            resolve();
          }
        }
      );
    });
  });
}

export default addSimulatedEntries;