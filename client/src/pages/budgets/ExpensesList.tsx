import { useEffect, createRef } from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { listExpenses, deleteExpenses } from '../../redux/actions/expenses';
import { StoreState } from '../../redux/reducers';
import { listIncomes } from '../../redux/actions/income';

export const Container = styled.div`
	width: 45%;
	margin-top: 30px;
	margin-right: 20px;

	h2 {
		color: var(--clr-red);
		font-size: 1.5rem;
		font-weight: 300;
	}
`;

export const ExpensesListItem = styled.ul`
	margin-top: 20px;
	li {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		flex-wrap: wrap;
		position: relative;
		box-shadow: 3px 3px 3px #d0d0d0, -3px -3px 3px #f8f8f8;
		color: var(--clr-dark);
		text-transform: capitalize;
		margin-bottom: 15px;
		font-size: 1.2rem;
		padding: 20px 10px;
		border-radius: 5px;
		font-weight: 600;
		:nth-of-type(even) {
			background-color: var(--clr-thick-gray);
		}
		:hover {
			opacity: 0.8;
		}
		

		@media (max-width: 900px) {
			flex-direction: column;
			height: 130px;
		}

		@media (max-width: 600px) {
			height: 140px;
		}

		@media (max-width: 360px) {
			height: 120px;
			font-size: 1rem;
			font-weight: bold;
		}
	}
`;

export const ExpensesListItemLeft = styled.div`
	width: 75%;
	display: flex;
	justify-content: space-between;

	span {
		color: var(--clr-red);
	}
	.expenses__percentage {
		font-size: 0.8rem;
		background-color: var(--clr-light-red);
		padding: 4px 10px;
		margin-left: 10px;
	}

	@media (max-width: 1290px) {
		p {
			width: 220px;
		}
	}

	@media (max-width: 1135px) {
		p {
			width: 150px;
		}
	}

	@media (max-width: 900px) {
		width: 100%;
		flex-direction: column;
		padding-bottom: 15px;
		p {
			width: 100%;
		}

		.span__container {
			display: flex;
			justify-content: center;
			align-items: flex-end;
			padding-top: 10px;
		}
	}

`;
export const ExpensesListItemRight = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 10px;
	top: 10px;

	.MuiButtonGroup-contained {
		box-shadow: none;
	}
	.MuiButton-root {
		padding: 5px;
		min-width: 0;
	}
	button {
		:nth-of-type(odd) {
			background-color: var(--clr-light);
		}

		color: var(--clr-red);
		.MuiSvgIcon-root {
			font-size: 20px;
		}
	}

	@media (max-width: 900px) {
		top: 90px;
	}

	@media (max-width: 600px) {
		top: 100px;
	}

	@media (max-width: 360px) {
		top: 80px;
	}
`;
export const ExpensesList = () => {
	const dispatch = useDispatch();
	let myRef = createRef<any>();

	useEffect(() => {
		dispatch(listExpenses());
		dispatch(listIncomes());
	}, [dispatch]);
	
	const { expenses } = useSelector((state: StoreState) => state.expenses);
	const { incomes } = useSelector((state: StoreState) => state.incomes);

	const incomeTransactions = incomes.map(income => income.value);
	const totalIncomesValues = incomeTransactions
		.reduce((val, results) => (val += results), 0)
		.toFixed(2);
	
	const totalIncomes = parseInt(totalIncomesValues);

	const handleDelete = (id: number | string) => {
		myRef.current.className = 'active';
		setTimeout(() => {
			dispatch(deleteExpenses(id))
		},200)
	}

	return (
		<Container>
			<h2>Expenses</h2>
			<ExpensesListItem>
				{expenses.length && expenses[0].value ? (
					expenses.map(expense => (
						<li ref={myRef} key={expense.expenses_id}>
							<ExpensesListItemLeft>
								<p>{expense.content}:</p>
								<div className="span__container">
									<span>
										-{' '}
										{expense.value && expense.value
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									</span>
									<span className='expenses__percentage'>
										{totalIncomes > 0 ? `${Math.round((expense.value / totalIncomes) * 100)}%` : '---'}
									</span>
								</div>
							</ExpensesListItemLeft>

							<ExpensesListItemRight>
								<ButtonGroup variant='contained'>
									<Link to={`/edit/${expense.expenses_id}`}>
										<Button>
											<Edit />
										</Button>
									</Link>
									<Button
										className="active"
										onClick={() => handleDelete(expense.expenses_id)}>
										<Delete />
									</Button>
								</ButtonGroup>
							</ExpensesListItemRight>
						</li>
					))
				) : (
					<h3>You have no expenses yet...</h3>
				)}
			</ExpensesListItem>
		</Container>
	);
};
