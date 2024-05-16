import { atom } from "recoil";

export const expenseTab = atom({
    key: 'expenseTabIndex',
    default: 0
})

export const expenseFormButtonText = atom({
  key: 'expenseFormBtn',
  default: 'Add Expense'
})

export const editExpenseIdState = atom({
  key: 'editExpenseId',
  default: ''
})


export const expenseViewOptionState = atom({
  key: 'expenseViewOtion',
  default: 'All Expenses'
})

export const categoryState = atom({
  key: 'expenseFormCategory',
  default: ''
})

export const amountState = atom({
  key: 'expenseFormAmount',
  default: 0
})

export const dateState = atom({
  key: 'expenseFormDate',
  default: "2024-01-01"
})

export const descriptionState = atom({
  key: 'expenseFormDescription',
  default: ''
})

export const expenseTableData = atom({
  key: 'expenseTableData',
  default: []
})