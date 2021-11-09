import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signUpUser } from '../../redux/actions/auth';
import { Container } from './styles';


export const Signup = () => {
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (userData.confirmPassword !== userData.password) {
			// userData.confirmPassword.setCustomValidity( "Passwords don't match" );
			toast.error("passwords don't match. Try again.");
		} else {
			dispatch(signUpUser(userData));
		}
	};

	return (
		<Container>
			<h2>Budgetary</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor='first_name'>First Name:</label>
				<input
					type='text'
					name='first_name'
					value={userData.first_name}
					onChange={handleChange}
					placeholder='Enter first name'
				/>
				<label htmlFor='last_name'>Last Name:</label>
				<input
					type='text'
					name='last_name'
					placeholder='Enter last name'
					value={userData.last_name}
					onChange={handleChange}
				/>
				<label htmlFor='email'>Email:</label>
				<input
					type='email'
					name='email'
					placeholder='Enter email'
					value={userData.email}
					onChange={handleChange}
				/>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					name='password'
					placeholder='Enter your password'
					value={userData.password}
					onChange={handleChange}
				/>
				<label htmlFor='confirmPassword'>Confirm Password:</label>
				<input
					type='password'
					placeholder='Confirm your password'
					name='confirmPassword'
					value={userData.confirmPassword}
					onChange={handleChange}
				/>
				<button type='submit'>Sign up</button>
				<small>
					Already have an account? <Link to='/users/signin'>Sign in here</Link>
				</small>
			</form>
		</Container>
	);
};
