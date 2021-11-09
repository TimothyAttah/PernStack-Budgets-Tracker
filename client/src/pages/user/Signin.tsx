import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signInUser } from '../../redux/actions/auth';
import { Container } from './styles';

export const Signin = () => {
		const dispatch = useDispatch();
		const [userData, setUserData] = useState({
			email: '',
			password: '',
		});
	
		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			setUserData({ ...userData, [e.target.name]: e.target.value });
		};
	
		const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			dispatch(signInUser(userData));
		};
	
	return (
		<Container>
			<h2>Budgetary</h2>
			<form onSubmit={handleSubmit}>
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
				<button>Sign in</button>
				<small>
					Don't have an account? <Link to='/users/signup'>Sign up here</Link>
				</small>
			</form>
		</Container>
	);
};
