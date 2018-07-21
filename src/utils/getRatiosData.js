import React from "react";
import numeral from 'numeral';

import { getPYbalances } from './getFinData';

export const getRatiosData = (postings) => {

  let accounts = getPYbalances();
  let data = [];

  postings.map(posting => {
    if (!posting.isUnPosted) {
      posting.linesData.map(lineData => {
        let x = lineData.lineItemID - 1;
        if (accounts[x].lineItem == lineData.lineItem) {
          let amt = parseFloat(lineData.amount, 10);
          if (lineData.isDr) { accounts[x].amount = accounts[x].amount + amt; }
          if (!lineData.isDr) { accounts[x].amount = accounts[x].amount - amt; }
        }
      });
    }
  });

  let assets = 0, assetsOp = 0;
  let equity = 0, equityOp = 0;
  let earnings = 0, earningsOp = 0;
  let currentAssets = 0, currentAssetsOp = 0;
  let currentLiabs = 0, currentLiabsOp = 0;

  let inventory = 0, inventoryOp = 0;
  let debt = 0, debtOp = 0;
  let adminEx = 0, adminExOp = 0;
  let interest = 0, interestOp = 0;
  let tax = 0, taxOp = 0;
  

  accounts.map(account => {

    if (account.type.includes(',a,')) {
      assets += account.amount; assetsOp += account.amountOpening;
    }
    if (account.type.includes(',c,')) {
      equity += account.amount; equityOp += account.amountOpening;
    }
    if (account.type.includes(',p,')) {
      earnings += account.amount; earningsOp += account.amountOpening;
    }

    if (account.type.includes('STA,')) {
      currentAssets += account.amount; currentAssetsOp += account.amountOpening;
    }

    if (account.type.includes('STL,')) {
      currentLiabs += account.amount; currentLiabsOp += account.amountOpening;
    }

    if (account.type.includes(',Inventory')) {
      inventory += account.amount; inventoryOp += account.amountOpening;
    }

    if (account.type.includes(',debt')) {
      debt += account.amount; debtOp += account.amountOpening;
    }

    if (account.type.includes(',debt')) {
      debt += account.amount; debtOp += account.amountOpening;
    }
    if (account.type.includes('Adm,')) {
      adminEx += account.amount; adminExOp += account.amountOpening;
    }
    if (account.type.includes('FinEx,')) {
      interest += account.amount; interestOp += account.amountOpening;
    }
    if (account.type.includes('IncTax,')) {
      tax += account.amount; taxOp += account.amountOpening;
    }

  });

  equity = equity + earnings;
  equityOp = equityOp + earningsOp;


  let ebitda = earnings - adminEx * 0.27 - interest - tax;
  let ebitdaOp = earningsOp - adminExOp * 0.27 - interestOp - taxOp;
  let ratioMin = 1;
  let ratio = currentAssets / currentLiabs * -1;
  let ratioOp = currentAssetsOp / currentLiabsOp * -1;
  let isCompliant = ratio > ratioMin;
  let isCompliantOp = ratioOp > ratioMin;


  data.push({
    ratioID: 1,
    ratioDesc: {title: 'Current Ratio', isCompliant },
    ratio_current: { ratio, isCompliant },
    ratio_comparatives: { ratioOp, isCompliantOp },
    ratioMin: ratioMin + " <",
    ratioMinN: ratioMin
  });

  ratioMin = 0.6;
  ratio = (currentAssets - inventory) / currentLiabs * -1;
  ratioOp = (currentAssetsOp - inventoryOp) / currentLiabsOp * -1;
  isCompliant = ratio > ratioMin;
  isCompliantOp = ratioOp > ratioMin;

  data.push({
    ratioID: 2,
    ratioDesc: {title: 'Quick Ratio', isCompliant },
    ratio_current: { ratio, isCompliant },
    ratio_comparatives: { ratioOp, isCompliantOp },
    ratioMin: ratioMin + " <",
    ratioMinN: ratioMin
  });

  ratioMin = 1;
  ratio = debt / assets * -1;
  ratioOp = debtOp / assetsOp * -1;
  isCompliant = ratio < ratioMin;
  isCompliantOp = ratioOp < ratioMin;

  data.push({
    ratioID: 3,
    ratioDesc: {title: 'Leverage Ratio (debt / assets)', isCompliant },
    ratio_current: { ratio, isCompliant },
    ratio_comparatives: { ratioOp, isCompliantOp },
    ratioMin: "< " + ratioMin,
    ratioMinN: ratioMin
  });

  ratioMin = 3;
  ratio = debt / equity;
  ratioOp = debtOp / equityOp;
  isCompliant = ratio < ratioMin;
  isCompliantOp = ratioOp < ratioMin;

  data.push({
    ratioID: 4,
    ratioDesc: {title: 'Debt-to-Equity Ratio', isCompliant },
    ratio_current: { ratio, isCompliant },
    ratio_comparatives: { ratioOp, isCompliantOp },
    ratioMin: "< " + ratioMin,
    ratioMinN: ratioMin
  });

  ratioMin = 3;
  ratio = debt / ebitda;
  ratioOp = debtOp / ebitdaOp;
  isCompliant = ratio < ratioMin;
  isCompliantOp = ratioOp < ratioMin;

  data.push({
    ratioID: 5,
    ratioDesc: {title: 'Debt to EBITDA', isCompliant },
    ratio_current: { ratio, isCompliant },
    ratio_comparatives: { ratioOp, isCompliantOp },
    ratioMin: "< " + ratioMin,
    ratioMinN: ratioMin
  });

  ratioMin = 15;
  ratio = ebitda / interest * -1;
  ratioOp = ebitdaOp / interestOp * -1;
  isCompliant = ratio > ratioMin;
  isCompliantOp = ratioOp > ratioMin;

  data.push({
    ratioID: 6,
    ratioDesc: {title: 'Interest Coverage (EBITDA / Interest)', isCompliant },
    ratio_current: { ratio, isCompliant },
    ratio_comparatives: { ratioOp, isCompliantOp },
    ratioMin: ratioMin + " <",
    ratioMinN: ratioMin
  });
  
  return data;
}

