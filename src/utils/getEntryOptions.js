import React from "react";
//import numeral from 'numeral';

export const getEntryOptions = () => {
    return [
      {
        idu: 0, name: 'book Revenue\n\r and CoGS', totalAmount: 4104074,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Accounts receivable', amount: 40002300, lineItemID: 2 },
          { idu: 1, isDr: true, lineItem: 'Cash and cash equivalents', amount: 75200000, lineItemID: 1 },
          { idu: 2, isDr: false, lineItem: 'Revenue', amount: 115202300, lineItemID: 18 },
          { idu: 3, isDr: true, lineItem: 'Cost of goods sold', amount: 90001400, lineItemID: 19 },
          { idu: 4, isDr: false, lineItem: 'Inventory', amount: 90001400, lineItemID: 3 }
        ]
      },
      {
        idu: 1, name: 'book SGnA\n\r expenses', totalAmount: 300008,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Selling, general and admin expenses', amount: 15000400, lineItemID: 20 },
          { idu: 1, isDr: false, lineItem: 'Trade payables', amount: 1167400, lineItemID: 9 },
          { idu: 2, isDr: false, lineItem: 'Cash and cash equivalents', amount: 8804000, lineItemID: 1 },
          { idu: 3, isDr: false, lineItem: 'Accumulated depreciation', amount: 4024500, lineItemID: 8 },
          { idu: 4, isDr: false, lineItem: 'Prepaid charges', amount: 1004500, lineItemID: 4 }
        ]
      },
      {
        idu: 2, name: 'book accrued\n\r interest expense', totalAmount: 30650,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Interest expense', amount: 1532500, lineItemID: 23 },
          { idu: 1, isDr: false, lineItem: 'Borrowings - current portion', amount: 1532500, lineItemID: 10 }
        ]
      },
      {
        idu: 3, name: 'book income tax\n\r expense & payable', totalAmount: 116852,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Income tax expense', amount: 5842600, lineItemID: 24 },
          { idu: 1, isDr: false, lineItem: 'Cash and cash equivalents', amount: 3400000, lineItemID: 1 },
          { idu: 2, isDr: false, lineItem: 'Other current liabilities', amount: 1432400, lineItemID: 13 },
          { idu: 3, isDr: false, lineItem: 'Long-term accrued liabilities', amount: 1010200, lineItemID: 15 }
        ]
      },      
      {
        idu: 4, name: 'book Earnings from\n\r joint venture', totalAmount: 2000,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Cash and cash equivalents', amount: 100000, lineItemID: 1 },
          { idu: 1, isDr: false, lineItem: 'Earnings from share in joint venture', amount: 100000, lineItemID: 21 }
        ]
      },
      {
        idu: 5, name: 'book Inventory\n\r purchase', totalAmount: 1820000,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Inventory', amount: 91000000, lineItemID: 3 },
          { idu: 1, isDr: false, lineItem: 'Cash and cash equivalents', amount: 91000000, lineItemID: 1 },
        ]
      },
      {
        idu: 6, name: 'book Repayment\n\r of borrowings', totalAmount: 400000,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Borrowings - current portion', amount: 20000000, lineItemID: 10 },
          { idu: 1, isDr: false, lineItem: 'Cash and cash equivalents', amount: 20000000, lineItemID: 1 }
        ]
      },
      {
        idu: 7, name: 'book Advances\n\r received', totalAmount: 16000,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Cash and cash equivalents', amount: 800000, lineItemID: 1 },
          { idu: 1, isDr: false, lineItem: 'Advances received', amount: 800000, lineItemID: 11 }
        ]
      },
      {
        idu: 8, name: 'book receipt of\n\r receivables', totalAmount: 930000,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Cash and cash equivalents', amount: 46500000, lineItemID: 1 },
          { idu: 1, isDr: false, lineItem: 'Accounts receivable', amount: 46500000, lineItemID: 2 }
        ]
      },
      {
        idu: 9, name: 'book Sale of\n\r unused property', totalAmount: 28200,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Cash and cash equivalents', amount: 1010000, lineItemID: 1 },
          { idu: 1, isDr: true, lineItem: 'Accumulated depreciation', amount: 400000, lineItemID: 8 },
          { idu: 2, isDr: false, lineItem: 'Property and equipment, gbv', amount: 1400000, lineItemID: 7 },
          { idu: 3, isDr: false, lineItem: 'Gain on sale of equipment', amount: 10000, lineItemID: 22 }
        ]
      },
      {
        idu: 10, name: 'book Investment\n\r in joint venture', totalAmount: 2000,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Equity in joint venture', amount: 100000, lineItemID: 5 },
          { idu: 1, isDr: false, lineItem: 'Cash and cash equivalents', amount: 100000, lineItemID: 1 }
        ]
      },
      {
        idu: 11, name: 'book Transfer of\n\r debt as current', totalAmount: 46000,
        lines: [
          { idu: 0, isDr: true, lineItem: 'Borrowings - non-current portion', amount: 2300000, lineItemID: 14 },
          { idu: 1, isDr: false, lineItem: 'Borrowings - current portion', amount: 2300000, lineItemID: 10 }
        ]
      }
    ];
  }