import styled from 'styled-components';

export const Container = styled.div`
	max-width: 800px;
	min-width: 350px;
	margin: 0 auto;
	background: var(--light);
	margin-top: 4rem;
	margin-bottom: 4rem;
	border-radius: 25px;
	padding: 2rem;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

export const Body = styled.div`
	margin-top: 1rem;
`;

export const Inline = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const InlineCheckBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Board = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: flex-start;
	flex-wrap: wrap;
`;

export const TextBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

export const InlineAddSubtask = styled.div`
	margin-left: 2rem;
	> input {
		width: 250px;
	}
`;

export const DivSubItens = styled.div`
	margin-left: 2rem;
`;
