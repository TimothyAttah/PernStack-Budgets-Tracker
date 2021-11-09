import { useEffect, createRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@material-ui/icons';
import { Button, ButtonGroup } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { deleteIncome, listIncomes } from '../../redux/actions/income';
import { StoreState } from '../../redux/reducers';
import history from '../../history';

export const Container = styled.div`
	width: 45%;
	margin-top: 30px;
	margin-left: 20px;

	h2 {
		color: var(--clr-green);
		font-size: 1.5rem;
		font-weight: 300;
	}
`;

export const IncomesListItem = styled.ul`
	width: 100%;
	margin-top: 20px;
	li {
		display: flex;
		align-items: flex-end;
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
		span {
			color: var(--clr-green);
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

export const IncomeListItemLeft = styled.div`
	width: 75%;
	display: flex;
	justify-content: space-between;

	span {
		color: var(--clr-green);
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
export const IncomeListItemRight = styled.div`
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
		color: var(--clr-green);
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

export const IncomeList = () => {
	const dispatch = useDispatch();
	const { incomes } = useSelector((state: StoreState) => state.incomes);
	let myRef = createRef<any>();
	useEffect(() => {
		dispatch(listIncomes());
	}, [dispatch]);

	const handleDelete = (id: number | string) => {
		myRef.current.className = 'active';
		setTimeout(() => {
			dispatch(deleteIncome(id));
		},200)
	};

	return (
		<Container>
			<h2>Incomes</h2>
			<IncomesListItem>
				{incomes.length && incomes[0].value ? (
					incomes.map(income => {
						return (
							<li ref={myRef} key={income.incomes_id}>
								<IncomeListItemLeft>
									<p>{income.content}</p>
									<div className='span__container'>
										<span>
											+ {' '}
											 {income.value > 0 ? income.value
												.toFixed(2)
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ','): null}
										</span>
									</div>
								</IncomeListItemLeft>
								<IncomeListItemRight>
									<ButtonGroup variant='contained'>
										<Link to={`/edit/${income.incomes_id}`}>
											<Button
												onClick={() =>
													history.push(`/edit/${income.incomes_id}`)
												}
											>
												<Edit />
											</Button>
										</Link>
										<Button
											className="active"
											onClick={() => handleDelete(income.incomes_id)}>
											<Delete />
										</Button>
									</ButtonGroup>
								</IncomeListItemRight>
							</li>
						);
					})
				) : (
					<h3>You have no incomes yet...</h3>
				)}
			</IncomesListItem>
		</Container>
	);
};
