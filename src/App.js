import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    if (newExpense.trim() !== '' && newCategory.trim() !== '') {
      const newExpenseObj = { expense: newExpense, category: newCategory };
      setExpenses([...expenses, newExpenseObj]);
      setNewExpense('');
      setNewCategory('');
    }
  };

  const handleEditExpense = (index) => {
    setEditingExpense(index);
    setNewExpense(expenses[index].expense);
    setNewCategory(expenses[index].category);
  };

  const handleUpdateExpense = () => {
    if (newExpense.trim() !== '' && newCategory.trim() !== '') {
      const updatedExpenses = [...expenses];
      updatedExpenses[editingExpense] = { expense: newExpense, category: newCategory };
      setExpenses(updatedExpenses);
      setNewExpense('');
      setNewCategory('');
      setEditingExpense(null);
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="input-container">
        <input
          type="text"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
          placeholder="Enter an expense"
        />
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter a category"
        />
        <button onClick={editingExpense !== null ? handleUpdateExpense : handleAddExpense}>
          {editingExpense !== null ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <span className="expense">{expense.expense}</span>
            <span className="category">{expense.category}</span>
            <button className="edit" onClick={() => handleEditExpense(index)}>
              Edit
            </button>
            <button className="delete" onClick={() => handleDeleteExpense(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
