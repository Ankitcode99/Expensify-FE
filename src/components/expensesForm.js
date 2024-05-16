import { Button, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { amountState, categoryState, dateState, descriptionState, editExpenseIdState, expenseFormButtonText, expenseTab, expenseViewOptionState } from '../state/expense';
import axios from 'axios';

function ExpensesForm() {
    const [amount, setAmount] = useRecoilState(amountState);
    const [category, setCategory] = useRecoilState(categoryState);
    const [description, setDescription] = useRecoilState(descriptionState);
    const [date, setDate] = useRecoilState(dateState)
    const [isDisabled, setIsDisabled] = useState(false)
    const [btnText, setBtnText] = useRecoilState(expenseFormButtonText)
    const [editExpenseId, setEditExpenseId] = useRecoilState(editExpenseIdState)
    const [_, setExpenseTabValue] = useRecoilState(expenseTab);
    const [viewClause, setViewClause] = useRecoilState(expenseViewOptionState);

    
    useEffect(()=>{
        console.log("inside-form useEffect!")
        
    },[])

    const resetStates = () =>{
        setAmount(0);
        setCategory('');
        setDate('2024-01-01')
        setDescription('')
        setEditExpenseId('')
        setIsDisabled(false)
        setBtnText('Add Expense')
        setViewClause('All Expenses')
    }

    const handleAddExpense = async (e) =>{
        e.preventDefault();

        setIsDisabled(true);
        const url = process.env.REACT_APP_BACKEND_BASE_URL+'/expenses'+ `${editExpenseId != '' ? `/${editExpenseId}`: '/' }`
        const requestConfig = {
            url: url,
            method: btnText == "Edit Expense" ? 'PUT': 'POST',
            data: {
                category: category,
                description: description,
                date: date,
                amount: parseInt(amount)
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userJWT')||''}`
            }
        }
        console.log(btnText,"  Request config - ", requestConfig)
        
        try {
            const response = await axios.request(requestConfig)
            console.log(response);

            resetStates();
            setExpenseTabValue(1);
        } catch (error) {
            console.log(error);
            alert('Some error occured!')
            setIsDisabled(false)
            return;
        }
    }

  return (
    <div className='expense-form-comp'>
        <div id="expense-form">
            <form className="expense-card" onSubmit={handleAddExpense}>
                <p>Add new expense here!!</p>
                
                <TextField 
                    id="amount" 
                    label="Amount" 
                    type='number'
                    required
                    fullWidth
                    value={amount} 
                    onChange={(e)=>setAmount(e.target.value)}/>
                
                <TextField 
                    id="category" 
                    label="Category" 
                    type='text' 
                    fullWidth
                    required
                    value={category} 
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={(e)=>setCategory(e.target.value)}/>
                <TextField
                    id="date"
                    label="Date"
                    fullWidth
                    type="date"
                    required
                    value={date}
                    className='date'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    className='description'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {!isDisabled ? <Button type="submit" fullWidth variant="contained" color="primary" >
                    {btnText}
                </Button> : <CircularProgress />}
            </form>
        </div>
    </div>
  )
}

export default ExpensesForm