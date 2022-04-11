const { assert, expect } = require("chai");
const { readTransactions, filterByCategoryAndDate, summateBudgetByCategory } = require("../src/budget");
const { login } = require("../src/client");

describe("Transaction Reading Unit Tests", function () {
    describe("CSV reading functionality", function () {
      it("should successfully read the test transactions file", function () {
        // this is undefined when from csv
        readTransactions('test/transactions.csv');
      });
      it("should contain five rows of data, not including the headers", function () {
        const transactions = readTransactions('test/transactions.csv');
        expect(transactions.length).to.equal(5);
      });
      
    });
    describe("Budget Summation Unit Tests", () => {
      it("should filter based on category and date", function () {
        const transactions = readTransactions('test/transactions.csv');
        const filteredTransactions = filterByCategoryAndDate("travel", "1999-01-01", "2001-01-01", transactions);
        expect(filteredTransactions.length).to.equal(1);
      });
      it("should summate by category accurately", () => {
        const sum = summateBudgetByCategory("travel", "1999-01-01", "2022-01-01");
        expect(sum).to.equal(989.25);
      })
    })
  });

describe("Client API Unit Tests", function () {
  describe("user stuff", function () {
    it("should return the correct user", async function () {
      const name = await login("elise@example.com", "elise");
      expect(name).to.equal("Elise");
    })
  })
})