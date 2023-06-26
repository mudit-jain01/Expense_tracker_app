import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);//array of objects
  const [newExpense, setNewExpense] = useState(''); //string
  const [newCategory, setNewCategory] = useState(''); //string
  const [editingExpense, setEditingExpense] = useState(null); //number
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => { //runs only once when the component is mounted
    const storedExpenses = localStorage.getItem('expenses');  //get the expenses from local storage
    if (storedExpenses) { //if there are expenses in local storage
      setExpenses(JSON.parse(storedExpenses));  //set the expenses to the stored expenses
    }
  }, []);

  
  useEffect(() => { //runs every time expenses changes
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]); //only run this effect when expenses changes

  const handleAddExpense = () => {  //add expense to the expenses array
    if (newExpense.trim() !== '' && newCategory.trim() !== '') {  //if the expense and category are not empty
      const newExpenseObj = { expense: newExpense, category: newCategory }; //create a new expense object
      setExpenses([...expenses, newExpenseObj]);  //add the new expense object to the expenses array
      setNewExpense('');  //reset the new expense
      setNewCategory(''); //reset the new category
    }
  };

  const handleEditExpense = (index) => {  //edit expense in the expenses array
    setEditingExpense(index); //set the editing expense to the index of the expense being edited
    setNewExpense(expenses[index].expense);//set the new expense and category to the expense being edited
    setNewCategory(expenses[index].category);//set the new expense and category to the expense being edited
  };

  const handleUpdateExpense = () => {//update expense in the expenses array
    if (newExpense.trim() !== '' && newCategory.trim() !== '') {  //if the expense and category are not empty
      const updatedExpenses = [...expenses];  //copy the expenses array
      updatedExpenses[editingExpense] = { expense: newExpense, category: newCategory }; //update the expense being edited
      setExpenses(updatedExpenses); //set the expenses array to the updated expenses
      setNewExpense('');  //reset the new expense
      setNewCategory(''); //reset the new category
      setEditingExpense(null);  //reset the editing expense
    }
  };

  const handleDeleteExpense = (index) => {  //delete expense from the expenses array
    const updatedExpenses = [...expenses];  //copy the expenses array
    updatedExpenses.splice(index, 1); //remove the expense at the index
    setExpenses(updatedExpenses); //set the expenses array to the updated expenses
  };

  return (
    <div className="container">
      {loggedIn ? (
        // Main App component
        <>
          <h1>Welcome to the Expense Tracker App</h1>
          <div className="input-container">
            <input //input for the expense and category

              type="text"
              value={newExpense}
              onChange={(e) => setNewExpense(e.target.value)}
              placeholder="Enter an expense" />
            <input //input for the expense and category

              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter a category" />
            <button onClick={editingExpense !== null ? handleUpdateExpense : handleAddExpense}>
              {editingExpense !== null ? 'Update Expense' : 'Add Expense'}
            </button>
          </div><ul>
            {expenses.map((expense, index) => ( //map through the expenses array
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
          </ul></>
      ) : (
        // Login page
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
