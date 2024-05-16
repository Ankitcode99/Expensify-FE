import { Button, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ExpensesTable from './expensesTable';
import { useRecoilState } from 'recoil';
import { expenseTab, expenseTableData, expenseViewOptionState } from '../state/expense';
import axios from 'axios';

function ExpensesView() {

    const [viewClause, setViewClause] = useRecoilState(expenseViewOptionState);
    const [year, setYear] = useState('2024')
    const [_, setExpenseTabValue] = useRecoilState(expenseTab);
    const [tableData, setTableData] = useRecoilState(expenseTableData)
    const handleChange = (event) => {
        setViewClause(event.target.value);
        setTableData([])
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const url = process.env.REACT_APP_BACKEND_BASE_URL+'/expenses/'
        const requestConfig = {
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userJWT')||''}`
            }
        }

        if(viewClause !== 'All Expenses') {
            switch(viewClause.split(' ')[2]) {
                case "Month":
                    requestConfig['params'] = {groupBy: "MONTH", year:year}
                    break;
                case "Year":
                    requestConfig['params'] = {groupBy: "YEAR"}
                    break;
                case "Category":
                    requestConfig['params'] = {groupBy: "CATEGORY"}
                    break;
            }
        }

        try {
            const response = await axios.request(requestConfig);
            console.log(response.data.expenses);
            setTableData(response.data.expenses)
        } catch (error) {
            console.log(error);
            alert('Some error occurred while fetching expenses!')
            return
        }
    }

    const menuOptions = [
        'All Expenses', 'Group By Year', 'Group By Month', 'Group By Category'
    ]

    const maxLabelWidth = Math.max(...menuOptions.map((option) => option.length+2)) * 10;
    
    useEffect(()=>{
        console.log("inside-table useEffect!")
    },[])
    


    return (
        <div id="expense-table-comp">
            <div style={{marginBottom:"30px"}}>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={viewClause}
                    label="Age"
                    style={{ width: maxLabelWidth, marginRight:'15px'}}
                    onChange={handleChange}
                >
                    {menuOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                        ))}
                </Select>
                {viewClause === 'Group By Month' ?
                    <TextField 
                            id="year" 
                            label="Year"
                            required
                            type='text' 
                            value={year} 
                            style={{ width: maxLabelWidth, marginRight:'15px'}}
                            onChange={(e)=>setYear(e.target.value)}/> : null }
                <Button type='submit' variant="contained" color="primary" onClick={handleSubmit}>Get Expenses</Button>
            </div>
            <ExpensesTable data={tableData}/>
        </div>
    );
}

export default ExpensesView