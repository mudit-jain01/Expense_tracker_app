import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);//array of objects
  const [newExpense, setNewExpense] = useState(''); //string
  const [newCategory, setNewCategory] = useState(''); //string
  const [editingExpense, setEditingExpense] = useState(null); //number

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
      <h1>Expense Tracker</h1>
      <div className="input-container">
        <input  //input for the expense and category
          type="text"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
          placeholder="Enter an expense"
        />
        <input  //input for the expense and category
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter a category"
        />
        <button onClick={editingExpense !== null ? handleUpdateExpense : handleAddExpense}> //if editing expense is not null, show update expense, else show add expense
          {editingExpense !== null ? 'Update Expense' : 'Add Expense'}  //if editing expense is not null, show update expense, else show add expense
        </button>
      </div>
      <ul>  //list of expenses
        {expenses.map((expense, index) => ( //map through the expenses array
          <li key={index}>  //list item for each expense
            <span className="expense">{expense.expense}</span>  //expense and category
            <span className="category">{expense.category}</span>  //expense and category
            <button className="edit" onClick={() => handleEditExpense(index)}>  //edit and delete buttons
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
