import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Close, Check, Edit } from '@material-ui/icons';
import { Divider, IconButton, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../../components/modal/Modal';
import history from '../../history';
import { Budgets } from './Budgets';
import { StoreState } from '../../redux/reducers';
import { editIncome } from '../../redux/actions/income';
import { editExpenses } from '../../redux/actions/expenses';

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
  p{
    margin-left: 10px;
    font-style: italic;
    font-weight: 500;
  }
`;

const Content = styled.div`
	padding: 30px 0;
	text-align: center;
form {
  label: {
    font-weight: bold;
  }
}
`;

const Form = styled.form`
text-align: center;
label {
  font-weight: bold;
}
input{
  border-radius: 10px;
  margin: 0 auto;
  display: block;
  width: 70%;
  border: 1px solid gray;
padding:15px 10px;
outline: none;
}
`;


const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 30px;
	padding-bottom: 10px;
	button {
		margin-left: 15px;
	}
`;


export const EditBudget = () => {
  const dispatch = useDispatch();
  const { id } = useParams<any>();
  const incomes = useSelector((state: StoreState) =>
		id !== null ? state.incomes.incomes.find(income => income.incomes_id === id) : null
	);
  const expenses = useSelector((state: StoreState) =>
		id !== null ? state.expenses.expenses.find(income => income.expenses_id === id) : null
	);
  console.log(id);

  console.log('edit>>>>>', incomes);
  console.log('edit>>>>>', expenses);
  
  const [content, setContent] = useState(incomes?.content)
  const [value, setValue] = useState<any>(incomes?.value)

  useEffect(() => {
    
  }, [content, value])
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBudget = {
      id,
      content,
      value: parseInt(value)
    }

    if (incomes) {
      dispatch(editIncome(id, newBudget));
    } else {
      dispatch(editExpenses(id, newBudget))
    }
  }
  
  return (
		<div>
			{/* <Backdrop close={() => history.push('/')} /> */}
			<Budgets />
			<Modal>
				<Header className='header'>
					<Header className='header__primary'>
						<Edit />
            <p>{incomes ? 'Edit Incomes Budgets ' : 'Edit Expenses Budgets'}</p>
					</Header>
					<IconButton onClick={() => history.push('/')}>
						<Close />
					</IconButton>
				</Header>
				<Divider />
				<Content className='content'>
					{id ? (
						<Form onSubmit={handleSubmit}>
							<label htmlFor='income'>Contents:</label>
							<input
								type='text'
								placeholder='Enter contents...'
								className='expenses_text'
								value={content}
								onChange={e => setContent(e.target.value)}
							/>
							<label htmlFor='income'>Value:</label>
							<input
								type='number'
								placeholder='Enter values...'
								className='expenses_value'
								value={value}
								onChange={e => setValue(e.target.value)}
							/>
							<ButtonContainer>
								<Button
									variant='contained'
									size='small'
									color='secondary'
									startIcon={<Close />}
									onClick={() => history.push('/')}
								>
									Cancel
								</Button>
								<Button
									variant='contained'
                  size='small'
                  type="submit"
									style={{ backgroundColor: green[800], color: '#fff' }}
									startIcon={<Check />}
								>
									Edit
								</Button>
							</ButtonContainer>
						</Form>
					) : (
						<h3>Please select a budget to edit</h3>
					)}
				</Content>
			</Modal>
		</div>
	);
}
