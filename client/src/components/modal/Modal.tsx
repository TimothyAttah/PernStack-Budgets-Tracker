import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface ModalProps {
	children: ReactNode;
};

const ModalContainer = styled.div`
	background: var(--clr-light);
	z-index: 999;
	margin: 0 auto;
	border-radius: 10px;
	position: absolute;
	top: 300px;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	box-sizing: border-box;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.7);
	-webkit-tap-highlight-color: transparent;
	padding: 10px 30px;

	@media (min-width: 700px) {
		top: 150px;
		max-width: none;
	}

	@media (max-width: 700px) {
		top: 210px;
		max-width: none;
	}
	
`;

export const Modal: FC<ModalProps> = ({ children }) => {
	return ReactDOM.createPortal(
		<>
			<ModalContainer>{children}</ModalContainer>
		</>,
		document.getElementById('modal') as HTMLElement
	);
};
