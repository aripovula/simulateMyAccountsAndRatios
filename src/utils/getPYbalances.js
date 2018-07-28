export const getPYbalances = () => {
    return [
      { lid: 1, isDr: true, lineItem: 'Cash and cash equivalents', amount: 42616000, amountOpening: 42616000, type: 'STA,a,' },
      { lid: 2, isDr: true, lineItem: 'Accounts receivable', amount: 230488000, amountOpening: 230488000, type: 'STA,a,' },
      { lid: 3, isDr: true, lineItem: 'Inventory', amount: 134524000, amountOpening: 134524000, type: 'STA,a,Inventory' },
      { lid: 4, isDr: true, lineItem: 'Prepaid charges', amount: 16576000, amountOpening: 16576000, type: 'STA,a,' },
      { lid: 5, isDr: true, lineItem: 'Equity in joint venture', amount: 28784000, amountOpening: 28784000, type: 'LTA,a,' },
      { lid: 6, isDr: true, lineItem: 'Long-term lendings', amount: 24500000, amountOpening: 24500000, type: 'LTA,a,' },
      { lid: 7, isDr: true, lineItem: 'Property and equipment, gbv', amount: 505044000, amountOpening: 505044000, type: 'LTA,a,' },
      { lid: 8, isDr: false, lineItem: 'Accumulated depreciation', amount: -168348000, amountOpening: -168348000, type: 'LTA,a,' },
      { lid: 9, isDr: false, lineItem: 'Trade payables', amount: -24157000, amountOpening: -24157000, type: 'STL,l,' },
      { lid: 10, isDr: false, lineItem: 'Borrowings - current portion', amount: -356034000, amountOpening: -356034000, type: 'STL,l,debt' },
      { lid: 11, isDr: false, lineItem: 'Advances received', amount: -33880000, amountOpening: -33880000, type: 'STL,l,' },
      { lid: 12, isDr: false, lineItem: 'Accrued loss on uncompleted contract', amount: -10738000, amountOpening: -10738000, type: 'STL,l,' },
      { lid: 13, isDr: false, lineItem: 'Other current liabilities', amount: -12404000, amountOpening: -12404000, type: 'STL,l,' },
      { lid: 14, isDr: false, lineItem: 'Borrowings - non-current portion', amount: -69041000, amountOpening: -69041000, type: 'LTL,l,debt' },
      { lid: 15, isDr: false, lineItem: 'Long-term accrued liabilities', amount: -21588000, amountOpening: -21588000, type: 'LTL,l,' },
      { lid: 16, isDr: false, lineItem: 'Share capital', amount: -42000000, amountOpening: -42000000, type: 'ShC,c,' },
      { lid: 17, isDr: false, lineItem: 'Retained earnings of prior periods', amount: -127050000, amountOpening: -127050000, type: 'ShC,c,' },
      { lid: 18, isDr: false, lineItem: 'Revenue', amount: -1348312000, amountOpening: -1348312000, type: 'GM,p,' },
      { lid: 19, isDr: true, lineItem: 'Cost of goods sold', amount: 1041054000, amountOpening: 1041054000, type: 'GM,p,' },
      { lid: 20, isDr: true, lineItem: 'Selling, general and admin expenses', amount: 116384000, amountOpening: 116384000, type: 'Adm,p,da' },
      { lid: 21, isDr: false, lineItem: 'Earnings from share in joint venture', amount: -6986000, amountOpening: -6986000, type: 'Other,p,' },
      { lid: 22, isDr: false, lineItem: 'Gain on sale of equipment', amount: -1400000, amountOpening: -1400000, type: 'Other,p,' },
      { lid: 23, isDr: true, lineItem: 'Interest expense', amount: 18730000, amountOpening: 18730000, type: 'FinEx,p,ebitda' },
      { lid: 24, isDr: true, lineItem: 'Income tax expense', amount: 63238000, amountOpening: 63238000, type: 'IncTax,p,ebitda' }
    ];
  }