import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { amountState, categoryState, dateState, descriptionState, editExpenseIdState, expenseFormButtonText, expenseTab, expenseViewOptionState } from '../state/expense';
import axios from 'axios';

function AllExpensesTable({data}){

  const [amount, setAmount] = useRecoilState(amountState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [description, setDescription] = useRecoilState(descriptionState);
  const [date, setDate] = useRecoilState(dateState)
  const [btnText, setBtnText] = useRecoilState(expenseFormButtonText)
  const [editExpenseId, setEditExpenseId] = useRecoilState(editExpenseIdState)
  const [_, setExpenseTabValue] = useRecoilState(expenseTab);

  const columns = [
    {field: 'category', headerName: 'Category', width: 200},
    {field: 'amount', headerName: 'Amount', width: 200 },
    {field: 'date', headerName: 'Date', width: 100},
    {field: 'description', headerName: 'Description', width: 400},
    {field: 'action', headerName: '', width: 400}
  ];
  // const sampleData = [
  //   {
  //     id: '1',
  //     category: 'Groceries',
  //     amount: 50.75,
  //     date: '2024-05-01',
  //     description: 'Weekly grocery shopping'
  //   },
  //   {
  //     id: '2',
  //     category: 'Utilities',
  //     amount: 120.00,
  //     date: '2024-05-02',
  //     description: 'Electricity bill for April'
  //   },
  //   {
  //     id: '3',
  //     category: 'Transport',
  //     amount: 15.30,
  //     date: '2024-05-03',
  //     description: 'Bus pass recharge'
  //   },
  //   {
  //     id: '4',
  //     category: 'Entertainment',
  //     amount: 75.00,
  //     date: '2024-05-04',
  //     description: 'Concert tickets'
  //   },
  //   {
  //     id: '5',
  //     category: 'Dining',
  //     amount: 40.25,
  //     date: '2024-05-05',
  //     description: 'Dinner at a restaurant'
  //   },
  //   {
  //     id: '6',
  //     category: 'Shopping',
  //     amount: 100.50,
  //     date: '2024-05-06',
  //     description: 'New clothes'
  //   },
  //   {
  //     id: '7',
  //     category: 'Health',
  //     amount: 30.00,
  //     date: '2024-05-07',
  //     description: 'Pharmacy expenses'
  //   },
  //   {
  //     id: '8',
  //     category: 'Education',
  //     amount: 200.00,
  //     date: '2024-05-08',
  //     description: 'Online course fee'
  //   },
  //   {
  //     id: '9',
  //     category: 'Travel',
  //     amount: 300.00,
  //     date: '2024-05-09',
  //     description: 'Weekend trip expenses'
  //   },
  //   {
  //     id: '10',
  //     category: 'Fitness',
  //     amount: 50.00,
  //     date: '2024-05-10',
  //     description: 'Gym membership renewal'
  //   }
  // ];
  const handleEditOnClick = (e)=>{
    e.preventDefault();
    const expenseId = e.target.id;
    let expenseObj = {};
    data.forEach((row)=>{
      if(row.id == expenseId ){
        expenseObj = row;
      }
    })
    
    setAmount(expenseObj.amount);
    setCategory(expenseObj.category);
    setDate(expenseObj.date);
    setDescription(expenseObj.description);
    setEditExpenseId(expenseObj.id);
    setExpenseTabValue(0);
    setBtnText("Edit Expense")
  }

  const handleDelete = async(e)=> {
    e.preventDefault();
    const url = process.env.REACT_APP_BACKEND_BASE_URL+'/expenses/'+ `${e.target.id}`
    const requestConfig = {
        url: url,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('userJWT')||''}`
        }
    }
    console.log("handleDelete  Request config - ", requestConfig)
    alert('By deleting record you will be losing permanent entry!')
    try {
      const deleteResponse = await axios.request(requestConfig);
      console.log(deleteResponse)
    } catch (error) {
      alert('Some error occured while deleting expense!');
      return
    }
  }

  console.log("AllExpensesTable - ",data,columns)
  return (
    <div>
      <table id="group-expense-table">
        <thead>
          <tr>
            {/* Use map to return an array of table headers */}
            {columns.map((column) => (

              <th key={column.field}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.category}</td>
              <td>{row.amount || '0'}</td>
              <td>{row.date}</td>
              <td>{row.description}</td>
              <td>
                <button className="edit-btn" id={row.id} style={{marginRight:'5px'}} onClick={handleEditOnClick}>EDIT</button>  
                <button className="delete-btn" id={row.id}style={{marginRight:'15px'}} onClick={handleDelete}>DELETE</button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GroupedExpensesTable({data}) {
  const [viewClause, setViewClause] = useRecoilState(expenseViewOptionState);

  const columns = [
    // { field: 'id', headerName: 'ID', width: 70, sortable: false },
    { field: 'amount', headerName: 'Amount', width: 200 },
  ];

  let newField = {}
  switch(viewClause.split(' ')[2]) {
    case "Month":
      newField = {field: 'month', headerName: 'Month', width: 400}
      break;
    case "Year":
      newField = {field: 'year', headerName: 'Year', width: 400}
      break;
    case "Category":
      newField = {field: 'category', headerName: 'Category', width: 400}
      break;
  }

  columns.splice(0, 0, newField)


  console.log("GroupedExpensesTable - ",data,columns)
  return (
    <div>
      <table id="group-expense-table">
        <thead>
          <tr>
            {/* Use map to return an array of table headers */}
            {columns.map((column) => (

              <th key={column.field}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {/* <td>{row.id}</td> */}
              <td>{viewClause.split(' ')[2] == 'Month' ? row.month : (viewClause.split(' ')[2]=='Year' ? row.year : row.category)}</td>
              <td>{row.amount || '0'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ExpensesTable(props) {
    useEffect(()=>{
        console.log('inside ExpensesTable')
        console.log(props.data)
    },[])

    const [viewClause, setViewClause] = useRecoilState(expenseViewOptionState);
  return (
    <div>
      {viewClause === 'All Expenses' ? <AllExpensesTable data={props.data}/> : <GroupedExpensesTable data={props.data}/>}
    </div>
  )
}

export default ExpensesTable