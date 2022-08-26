import { useContext } from 'react';
import { TasksContext } from '../../context/TaskContext';
import NewList from './newList';
import List from './List';
import { Item } from '../../interfaces/ItemInterface';
import { Board } from './styles';

export function TaskList() {
	const context = useContext(TasksContext);

	return (
		<>
			<NewList />
			<Board>
				{context.tasks.length > 0 &&
					context.tasks.map((task: Item, idx: string) => {
						return <List item={task} key={idx.toString()} />;
					})}
			</Board>
		</>
	);
}
