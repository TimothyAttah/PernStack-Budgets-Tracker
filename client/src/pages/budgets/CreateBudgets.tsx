import { FormEvent, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {  AddCircle, ArrowDropDown, Check,  RemoveCircle } from '@material-ui/icons';

import { createIncome } from '../../redux/actions/income';
import { createExpenses } from '../../redux/actions/expenses';
import {
	FormContainer,
	FormContainerLeft,
	FormContainerRight,
	FormContainerPrimary
} from './CreateBudgetStyle';


export const CreateBudgets = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [close, setClose] = useState(false);

	const [content, setContent] = useState('');
	const [value, setValue] = useState('');

	const handleOpen = () => {
		setOpen(true);
		setClose(false);
	};
	const handleClose = () => {
		setOpen(false);
		setClose(false);
	};
	const toggleOpen = () => {
		setClose(!close);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newBudget = {
			content,
			value: parseInt(value),
		};

		if (open) {
			if (content !== '' && value !== '') {
				dispatch(createExpenses(newBudget));
				setContent('');
				setValue('');
			}
		} else {
			if (content !== '' && value !== '') {
				dispatch(createIncome(newBudget));
				setContent('');
				setValue('');
			}
		}
	};

	return (
		<FormContainer>
			<FormContainerPrimary>
			<FormContainerLeft>
				<h4 onClick={toggleOpen}>
					<ArrowDropDown />
				</h4>
				{close ? (
					<>
						<AddCircle onClick={handleClose}/>
						<RemoveCircle	onClick={handleOpen}/>
					</>
				) : null}
			</FormContainerLeft>
			<FormContainerRight onSubmit={handleSubmit}>
				{open ? (
					<>
						<input
							type='text'
							placeholder='Add description'
							className='expenses_text'
							value={content}
							onChange={e => setContent(e.target.value)}
						/>
						<input
							type='number'
							placeholder='Value'
							className='expenses_value'
							value={value}
							onChange={e => setValue(e.target.value)}
						/>
					</>
				) : (
					<>
						<input
							type='text'
							placeholder='Add description'
							className='income_text'
							value={content}
							onChange={e => setContent(e.target.value)}
						/>
						<input
							type='number'
							placeholder='Value'
							className='income_value'
							value={value}
							onChange={e => setValue(e.target.value)}
						/>
					</>
				)}
				<Button type='submit' className={open ? 'btn_red' : 'btn_green'}>
					<Check />
				</Button>
			</FormContainerRight>
			</FormContainerPrimary>
		</FormContainer>
	);
};
