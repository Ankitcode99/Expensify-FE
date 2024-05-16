import { Paper, Tab, Tabs } from '@mui/material';
import React from 'react';
import ExpensesView from '../components/expensesView';
import ExpensesForm from '../components/expensesForm';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import { expenseTab, expenseTableData } from '../state/expense';

export default function DisabledTabs() {
  const [expenseTabValue, setExpenseTabValue] = useRecoilState(expenseTab);
  const handleChange = (event, newValue) => {
    // console.log(newValue)
    setExpenseTabValue(newValue);
    
  };

  return (
    <div className='expense-page'>
        <Paper square>
            <Tabs
                value={expenseTabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example">
                    <Tab label="Add Expense" ></Tab>
                    <Tab label="View Expenses"></Tab>
            </Tabs>
        </Paper>
    {expenseTabValue === 0 ? <ExpensesForm /> : <ExpensesView />}
    </div>
  );
}