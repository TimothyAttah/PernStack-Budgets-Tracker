import styled from 'styled-components';

export const Container = styled.div`
	max-width: 500px;
	width: 100%;
	margin: 0 auto;
	margin-top: 50px;
	box-shadow: 3px 3px 3px #d0d0d0, -3px -3px 3px #f8f8f8;
	h2 {
		text-align: center;
		padding-top: 30px;
		color: var(--clr-accent);
		font-size: 2rem;
	}
	form {
		margin: auto;
		margin-top: 20px;
		padding: 20px 20px;
		border-radius: 5px;
		label {
			font-weight: var(--fw-bold);
			display: inline-block;
			margin-bottom: 5px;
			font-size: 1.2rem;
		}
		input {
			display: block;
			width: 100%;
			padding: 15px;
			margin-bottom: 15px;
			border: 1px solid var(--cream);
			border-radius: 5px;
		}
		button {
			display: block;
			width: 100%;
			padding: 15px;
			background: var(--clr-accent);
			color: var(--clr-light);
			border-radius: 5px;
			margin: 20px 0;
			font-size: 1.3rem;
			:hover {
				opacity: 0.8;
			}
		}
		small {
			font-size: 1rem;
			text-transform: capitalize;
			font-weight: var(--fw-bold);
			a {
				color: var(--clr-lightBlue);
				font-style: italic;
			}
		}
	}
`;
