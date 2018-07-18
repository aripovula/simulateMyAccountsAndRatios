import React from "react";
//import numeral from 'numeral';

export const getEntryOptions = () => {
    return [
      {
        idu: 0, name: 'book Revenue\n\r and CoGS',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Accounts receivable', amount: 40002300 },
          { idu: 1, isDr: true, lineItem: 'Cash and cash equivalents', amount: 75200000 },
          { idu: 2, isDr: false, lineItem: 'Revenue', amount: 115202300 },
          { idu: 3, isDr: true, lineItem: 'Cost of goods sold', amount: 90001400 },
          { idu: 4, isDr: false, lineItem: 'Inventory', amount: 90001400 }
        ]
      },
      {
        idu: 1, name: 'book SGnA\n\r expenses',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Selling, general and admin expenses', amount: 15000400 },
          { idu: 1, isDr: false, lineItem: 'Trade payables', amount: 1167400 },
          { idu: 2, isDr: false, lineItem: 'Cash and cash equivalents', amount: 8804000 },
          { idu: 3, isDr: false, lineItem: 'Accumulated depreciation', amount: 4024500 },
          { idu: 4, isDr: false, lineItem: 'Prepaid charges', amount: 1004500 }
        ]
      },
      {
        idu: 2, name: 'book accrued\n\r interest expense',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Interest expense', amount: 1532500 },
          { idu: 1, isDr: false, lineItem: 'Borrowings - current portion', amount: 1532500 }
        ]
      },
      {
        idu: 3, name: 'book income tax\n\r expense & payable',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Income tax expense', amount: 5842600 },
          { idu: 1, isDr: false, lineItem: 'Cash and cash equivalents', amount: 3400000 },
          { idu: 1, isDr: false, lineItem: 'Other current liabilities', amount: 1432400 },
          { idu: 2, isDr: false, lineItem: 'Long-term accrued liabilities', amount: 1010200 }
        ]
      },
      {
        idu: 4, name: 'book Inventory\n\r purchase',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Inventory', amount: 91000000 },
          { idu: 1, isDr: false, lineItem: 'Cash and cash equivalents', amount: 91000000 },
        ]
      },
      {
        idu: 5, name: 'book Prepaid\n\r charges',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Cash and cash equivalents', amount: 100000 },
          { idu: 1, isDr: false, lineItem: 'Earnings from share in joint venture', amount: 100000 }
        ]
      },
      {
        idu: 6, name: 'repay part of\n\r borrowings',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Borrowings - current portion', amount: 20000000 },
          { idu: 1, isDr: false, lineItem: 'Cash and cash equivalents', amount: 20000000 }
        ]
      },
      {
        idu: 7, name: 'book Advances\n\r received',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Cash and cash equivalents', amount: 800000 },
          { idu: 1, isDr: false, lineItem: 'Advances received', amount: 800000 }
        ]
      },
      {
        idu: 8, name: 'book receipt of\n\r receivables',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Cash and cash equivalents', amount: 44500000 },
          { idu: 1, isDr: false, lineItem: 'Accounts receivable', amount: 44500000 }
        ]
      },
      {
        idu: 9, name: 'book Sale of\n\r unused property',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Cash and cash equivalents', amount: 1010000 },
          { idu: 1, isDr: true, lineItem: 'Accumulated depreciation', amount: 400000 },
          { idu: 2, isDr: false, lineItem: 'Property and equipment, gbv', amount: 1400000 },
          { idu: 3, isDr: false, lineItem: 'Gain on sale of equipment', amount: 10000 }
        ]
      },
      {
        idu: 10, name: 'book Investment\n\r in joint venture',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Equity in joint venture', amount: 100000 },
          { idu: 1, isDr: false, lineItem: 'Cash and cash equivalents', amount: 100000 }
        ]
      },
      {
        idu: 11, name: 'book Transfer of\n\r debt as current',
        lines: [
          { idu: 0, isDr: true, lineItem: 'Borrowings - non-current portion', amount: 2300000 },
          { idu: 1, isDr: false, lineItem: 'Borrowings - current portion', amount: 2300000 }
        ]
      }
    ];
  }