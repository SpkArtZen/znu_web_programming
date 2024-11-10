import React, { useState, useEffect } from 'react';
import Expenses from './Components/Expenses/Expenses';
import AddField from './Components/AddField/AddField';
import { getExpenses } from './firebaseConfig';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const expensesData = await getExpenses();
    console.log("Fetched expenses:", expensesData); // Debugging log
    setExpenses(expensesData);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="App">
      <AddField onAdd={fetchExpenses} /> {/* AddField component with fetchExpenses */}
      <Expenses items={expenses} fetchExpenses={fetchExpenses} />
    </div>
  );
};

export default App;
