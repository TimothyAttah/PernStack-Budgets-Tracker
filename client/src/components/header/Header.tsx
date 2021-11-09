import { Link } from 'react-router-dom';
import { UserButton, UserButtons } from '../Button';
import styled from 'styled-components';

import { user, fullName } from '../NameInitial';
import history from '../../history';

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
	background: var(--clr-accent);
	color: var(--clr-light);
	padding: 20px;
	z-index: 999;

	a {
		color: var(--clr-light);
	}
`;

export const HeaderLeft = styled.div`
	border-radius: 50%;
	border: 2px solid var(--clr-light);
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;

	a {
		font-size: 1.5rem;
		font-weight: bold;
		font-style: italic;
	}

	@media (max-width: 450px) {
		margin-top: -30px;
		a {
			font-size: 1.3rem;
		}
	}

	@media (max-width: 320px) {
		a {
			font-size: 1.3rem;
		}
	}
`;
export const HeaderLeftPrimary = styled.div`
	border-radius: 50%;
	border: 2px solid var(--clr-light);
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;

	a {
		font-size: 1.4rem;
		font-weight: bold;
		font-style: italic;
	}

	@media (max-width: 450px) {
		a {
			font-size: 1.4rem;
		}
	}
	@media (max-width: 320px) {
		a {
			font-size: 1rem;
		}
	}
`;

export const HeaderRight = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	h4 {
		margin-right: 30px;
		font-size: 1.4rem;
	}

	button {
		padding: 10px;
		border-radius: 10px;
		text-transform: capitalize;
		font-weight: bold;
	}

	@media (max-width: 450px) {
		flex-direction: column;
		h4 {
			margin-right: 0px;
			padding-bottom: 10px;
			font-size: 1.3rem;
		}
	}
	
	@media (max-width: 320px) {
		h4 {
			font-size: 1.2rem;
		}
	}

`;

export const Header = () => {
	const handleLogout = () => {
		localStorage.clear();
		history.push('/users/signin');
		window.location.reload();
	}
	return (
		<HeaderContainer>
			{user ? (
				<>
					<HeaderLeft>
						<Link to='/'>Budgetary</Link>
					</HeaderLeft>
					<HeaderRight>
						<h4>{fullName}</h4>
						<button onClick={handleLogout}>Sign out</button>
					</HeaderRight>
				</>
			) : (
				<>
					<HeaderLeftPrimary>
						<Link to='/'>Budgetary</Link>
					</HeaderLeftPrimary>
					<UserButtons>
						<Link to='/users/signup'>
							<UserButton>Sign Up</UserButton>
						</Link>
						<Link to='/users/signin'>
							<UserButton>Sign in</UserButton>
						</Link>
					</UserButtons>
				</>
			)}
		</HeaderContainer>
	);
};
