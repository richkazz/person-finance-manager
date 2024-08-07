import React, { useState } from 'react';
import styles from '../../styles/ExpenseModal.module.css';

const ExpenseModal = ({ isOpen, onClose, onAdd }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('expense');

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ amount, date, description, category });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Add Transaction</h2>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className={styles.input}
            />
            <div className={styles.amountButtons}>
              {[5000, 10000, 20000, 50000, 100000].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAmountChange(value)}
                  className={styles.amountButton}
                >
                  ₦{value.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <div cassName={styles.row}>
            <div className={`${styles.formGroup} ${styles.rowChild}`}>
              <label className={styles.label} htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={`${styles.formGroup} ${styles.rowChild}`}>
              <label className={styles.label} htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <div className={styles.categoryButtons}>
              <button
                type="button"
                onClick={() => setCategory('income')}
                className={`${styles.categoryButtonIncome} ${category === 'income' ? styles.active : ''}`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setCategory('expense')}
                className={`${styles.categoryButtonExpense} ${category === 'expense' ? styles.active : ''}`}
              >
                Expense
              </button>
            </div>
          </div>
          <button type="submit" className={styles.addButton}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;