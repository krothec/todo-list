import { IconButton, TextField } from '@material-ui/core';
import { PlaylistAdd } from '@material-ui/icons';
import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../../../context/TaskContext';
import { Header } from './style';

export function NewList() {
	const context = useContext(TasksContext);
	const [newList, setNewList] = useState('');
	const [error, setError] = useState(false);

	useEffect(() => {
		setNewList('');
	}, [context.tasks]);

	function handleAddNewTask() {
		if (newList === '') {
			setError(true);
		} else {
			setError(false);
			context.onAddingNewList(newList);
		}
	}
	return (
		<Header>
			<TextField
				error={error}
				helperText={error ? `Não é possível adicionar uma lista sem nome.` : ''}
				id="outlined-basic"
				label="Criar nova lista"
				size="medium"
				onChange={e => setNewList(e.target.value)}
				value={newList}
			/>
			<IconButton
				aria-label="Criar nova lista"
				component="span"
				onClick={() => handleAddNewTask()}
			>
				<PlaylistAdd fontSize="large" />
			</IconButton>
		</Header>
	);
}

export default NewList;
