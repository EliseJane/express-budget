const { createReadStream } = require("fs");
const csv = require('csv-parser');
const { mocks } = require("../test/transactions.js");

/*
Transaction {
  id: int,
  timestamp: date,
  category: string,
  amount: decimal
}
*/

const readTransactions = filePath => {
  const transactions = [];
  createReadStream(filePath)
  .pipe(csv())
  .on('error', (error) => {
    throw error
  })
  .on('data', (row) => {
    const transaction = {
      id: row.ID,
      timestamp: row.TIMESTAMP,
      category: row.CATEGORY,
      amount: row.AMOUNT
    }
    transactions.push(transaction);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    // cannot figure out how to get this to actually return transactions here
    return transactions;
  })
  return mocks;
}

const summateBudgetByCategory = (category, startTime, endTime) => {
  const transactions = readTransactions('test/transactions.csv');
  const relevantTransactions = filterByCategoryAndDate(category, startTime, endTime, transactions);
  const sum = relevantTransactions.reduce((previous, current) => previous + Number(current.amount), 0);
  return sum;
}

const filterByCategoryAndDate = (category, startTime, endTime, transactions) => {
  const relevantTransactions = transactions.filter(transaction => {
    const tt = Date.parse(transaction.timestamp);
    const inDateRange = Date.parse(startTime) <= tt && tt <= Date.parse(endTime);
    const sameCategory = category.toLowerCase() === transaction.category.toLowerCase();
    return inDateRange && sameCategory;
  });
  return relevantTransactions;
}

module.exports = {
  readTransactions, 
  summateBudgetByCategory, 
  filterByCategoryAndDate, 
}