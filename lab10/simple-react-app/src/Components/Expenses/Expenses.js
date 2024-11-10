import React, { useState, useEffect } from 'react';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import Chart from '../Chart/Chart';
import ExpensesFilter from '../ExpensesFilter/ExpensesFilter';
import Loader from '../Loader/Loader';
import './Expenses.css';
import { updateExpense, deleteExpense } from '../../firebaseConfig';

const Expenses = ({ items, fetchExpenses }) => {
  const [filteredYear, setFilteredYear] = useState('2023');
  const [loading, setLoading] = useState(false);

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const handleUpdate = async (id, updatedExpense) => {
    setLoading(true);
    try {
      await updateExpense(id, updatedExpense);
      fetchExpenses(); // Call the function to refresh the list of expenses
    } catch (error) {
      console.error("Error updating expense:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteExpense(id);
      fetchExpenses(); // Call the function to refresh the list of expenses
    } catch (error) {
      console.error("Error deleting expense:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExpenses = items.filter(expense => {
    return new Date(expense.date).getFullYear().toString() === filteredYear;
  });

  return (
    <div className="expenses">
      <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
      {loading && <Loader />}
      <Chart expenses={filteredExpenses} />
      {filteredExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={new Date(expense.date)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Expenses;
