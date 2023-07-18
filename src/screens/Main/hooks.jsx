import { useEffect, useState } from 'react';
import axios from 'axios';

const mainUrl = "http://localhost:8080/api/main";

export function Calcs() {
  const [deposit, setDeposit] = useState('');
  const [profit, setProfit] = useState('');
  // const [totalWithProfit, setTotalWithProfit] = useState('');
  const [expense, setExpense] = useState('');
  const [currentDeposit, setCurrentDeposit] = useState('');

  useEffect(() => {
    axios.get(mainUrl).then(res => {

      const data = res.data;
      // console.log(data)

      setDeposit(data.deposits[0].total);
      setProfit(data.totalProfits[0].total_profit);
      // console.log(data.totalProfits[0].sum)
      // setTotalWithProfit(data.totalWithProfits[0].total_with_profit);
      setExpense(data.totalExpense[0].sum);
      setCurrentDeposit(data.currentDeposit[0].result);

    }).catch(error => {
      console.error(error)
    });

  });
  return (
    { deposit, profit, expense, currentDeposit }
  );
}