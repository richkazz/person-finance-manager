import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { TRANSACTIONS } from "../../mockData"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import  styles from '../../../styles/dashboard.module.css';

const calculateCategoryTotals = (transactions) => {
  const categoryTotals = {
    Income: 0,
    Groceries: 0,
    Utilities: 0,
    Entertainment: 0,
    Travel: 0,
    Miscellaneous: 0,
  };

  transactions.forEach(transaction => {
    const category = transaction.category;
    if (categoryTotals.hasOwnProperty(category)) {
      categoryTotals[category] += Math.abs(transaction.amount);
    }
  });

  return categoryTotals;
};

const Progress = () => {
  const categoryTotals = calculateCategoryTotals(TRANSACTIONS);
  const totalAmount = Object.values(categoryTotals).reduce((acc, val) => acc + val, 0); 

  return (
    <div className={styles.progress}>
      <div style={{fontSize:"19px", fontWeight:"800"}}>Category Status</div>
      {Object.keys(categoryTotals).map((category, index) => {
        const percentage = totalAmount > 0 ? (categoryTotals[category] / totalAmount) * 100 : 0; 
        return (
          <div key={index} style={{ margin: '20px 0' } } className={styles.wrapper}>
            <div className={styles.category}> 
              <div>{category}</div>
              {`${percentage.toFixed(2)}%`}
            </div>
            <div className={styles.bar}>
            <ProgressBar
              now={percentage}
              style={{ height: '20px' }}
              className={styles.progressBar}
            />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Progress;

