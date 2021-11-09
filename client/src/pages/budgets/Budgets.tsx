import styled from 'styled-components';
import { ExpensesList } from './ExpensesList';
import { IncomeList } from './IncomeList';
import BackgroundImage from '../../images/back.jpg';
import { BudgetsTransaction } from './BudgetsTransaction';
import { CreateBudgets } from './CreateBudgets';

const BudgetsContainer = styled.div``;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
`;

const BudgetsContainerTop = styled.div`
	height: 50vh;
	background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
		url(${BackgroundImage});
	background-size: cover;
	background-position: center;
	position: relative;

	@media (max-width: 1280px) {
		height: 40vh;
	}
	@media (max-width: 540px) {
		height: 40vh;
	}
	@media (max-width: 420px) {
		height: 35vh;
	}
`;

export const Budgets = () => {
	return (
		<BudgetsContainer>
			<BudgetsContainerTop>
				<BudgetsTransaction />
			</BudgetsContainerTop>
			<>
				<CreateBudgets />
			</>
			<Container>
				<IncomeList />
				<ExpensesList />
			</Container>
		</BudgetsContainer>
	);
};
