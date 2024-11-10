import React, { useState } from 'react';
import './AddField.css';

const AddField = (props) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [showFields, setShowFields] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && amount && date) {
      props.onAdd(title, amount, date);
      setTitle('');
      setAmount('');
      setDate('');
      setShowFields(false);
    }
  };

  const toggleFieldsHandler = () => {
    setShowFields((prevShowFields) => !prevShowFields);
  };

  return (
    <div className="panel">
      <button onClick={toggleFieldsHandler}>
        {showFields ? 'Cancel' : 'Add Item'}
      </button>
      {showFields && (
        <form onSubmit={handleSubmit} className="add-field">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new item"
          />
          <input
            type="number"
            name="amount"
            className="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
};

export default AddField;