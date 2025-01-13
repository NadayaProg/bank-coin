/* eslint-disable max-len */
const monthNames = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

function getStartDate(monthesToSubtract) {
  const nowDate = new Date();
  let startMonth = nowDate.getMonth() - monthesToSubtract;
  let startYear = nowDate.getFullYear();
  if (startMonth < 0) {
    const yearToSubtract = Math.ceil(Math.abs(startMonth) / 12);
    startYear -= yearToSubtract;
    startMonth += yearToSubtract * 12;
  }
  return new Date(startYear, startMonth);
}

function divideTransPerMonth(transArray, startDate) {
  const transByMonths = [];
  const beginFrom = new Date(startDate);
  const nowDate = new Date();
  while (beginFrom < nowDate) {
    const monthNum = beginFrom.getMonth();
    const monthName = monthNames[monthNum];
    const year = beginFrom.getFullYear();
    const checkArray = transByMonths.find(
      (item) => item.month === monthName && item.year === year,
    );
    if (!checkArray) {
      transByMonths.push({
        month: monthName,
        year,
        transactions: [],
      });
    }
    beginFrom.setMonth(monthNum + 1);
  }
  const searchIndex = transArray.findIndex(
    (el) => new Date(el.date) >= startDate,
  );
  const newTransArr = transArray.slice(searchIndex);
  for (const item of newTransArr) {
    const transDate = new Date(item.date);
    const transMonthName = monthNames[transDate.getMonth()];
    const transYear = transDate.getFullYear();
    const itemToChangeInd = transByMonths.findIndex(
      (item) => item.month === transMonthName && item.year === transYear,
    );
    transByMonths[itemToChangeInd].transactions.push(item);
  }
  return transByMonths;
}

function calculateBalancePerMonth(transactions, countId) {
  let incoming = 0;
  let outgoing = 0;
  if (transactions.length > 0) {
    for (const item of transactions) {
      if (item.to === countId) {
        incoming += item.amount;
      }
      if (item.from === countId) {
        outgoing += item.amount;
      }
    }
  }
  return { incoming, outgoing };
}

function arrangeBalanceData(response, monthesToSubtract) {
  const currentBalance = response.balance;
  const transArray = response.transactions;
  const countId = response.account;
  const startDate = getStartDate(monthesToSubtract);
  const transPerMonth = divideTransPerMonth(transArray, startDate);
  let startBalance = currentBalance;
  let toSubtractDifference = 0;
  const balancePerMonth = transPerMonth.reverse().map((item) => {
    const { incoming, outgoing } = calculateBalancePerMonth(
      item.transactions,
      countId,
    );
    const difference = incoming - outgoing;
    const commonTransSum = incoming + outgoing;
    startBalance -= toSubtractDifference;
    toSubtractDifference = difference;
    item.transactions = {
      incoming,
      outgoing,
      difference,
      commonTransSum,
      balance: startBalance,
    };
    return item;
  }).reverse();
  return balancePerMonth;
}
