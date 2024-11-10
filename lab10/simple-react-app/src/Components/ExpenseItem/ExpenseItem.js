import React, { useState } from 'react';
import ExpenseDate from '../ExpenseDate/ExpenseDate';
import Card from '../Card/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [amount, setAmount] = useState(props.amount);
  const [date, setDate] = useState(props.date);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  };

  const handleUpdate = () => {
    const updatedExpense = { title, amount, date: formatDate(date) };
    props.onUpdate(props.id, updatedExpense);
    setIsEditing(false);
  };

  const handleDelete = () => {
    props.onDelete(props.id);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="date"
              value={formatDate(date)}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h2>{props.title}</h2>
            <div className="expense-item__price">${props.amount}</div>
            <button className='update' onClick={() => setIsEditing(true)}>Edit</button>
            <button className = 'delete' onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </Card>
  );
};

export default ExpenseItem;
