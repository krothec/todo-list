import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../../context/TasksContext';
import { Container, Body, Inline } from './styles';
import { Checkbox, TextField, IconButton } from '@material-ui/core';
import { AddBoxOutlined } from '@material-ui/icons/';
import ActionIconBar from '../ActionIconBarTask';

export function TaskList() {
	const context = useContext(TasksContext);
	const [newTask, setNewTask] = useState('');
	const [error, setError] = useState(false);

	function handleAddTask() {
		if (newTask === '') {
			setError(true);
		} else {
			setError(false);
			context.onAddingTask(newTask);
		}
	}

	useEffect(() => {
		setNewTask('');
	}, [context.tasks]);

	function helper(items) {
		let array = [];
		if (typeof items.forEach === 'function') {
			items.forEach(value => {
				if (Array.isArray(value)) {
					array = [...value];
				} else {
					array.push(value);
				}
			});
		} else array.push(items);
		return array;
	}

	return (
		<Container>
			<h1>TODO List</h1>
			<TextField
				error={error}
				helperText={
					error ? `Não é possível adicionar uma atividade sem nome.` : ''
				}
				id="outlined-basic"
				label="Adicionar nova atividade"
				size="small"
				onChange={e => setNewTask(e.target.value)}
				value={newTask}
			/>
			<IconButton
				aria-label="Adicionar nova atividade"
				component="span"
				onClick={() => handleAddTask()}
			>
				<AddBoxOutlined />
			</IconButton>
			{context.tasks.map(task => {
				return (
					<Body>
						<Inline>
							<Checkbox
								color="default"
								inputProps={{ 'aria-label': 'checkbox with default color' }}
								checked={task.checked}
								onChange={() => context.onChecking(task, 1)}
							/>
							<h2>{task.name}</h2>
							<ActionIconBar props={task} level={1} />
						</Inline>
						{helper(task).map((item, idx) => {
							if (item.itens) {
								return helper(item.itens).map((it, idx2) => {
									if (it.itens) {
										return helper(it.itens).map((i, idx3) => {
											return (
												<Inline style={{ paddingLeft: '4rem' }}>
													<Checkbox
														color="default"
														size="small"
														checked={item.checked}
														onChange={() => context.onChecking(item, 2)}
														inputProps={{
															'aria-label': 'checkbox with default color',
														}}
													/>
													<h4 key={idx3}>{i.item}</h4>
													<ActionIconBar props={item} level={2} />
												</Inline>
											);
										});
									} else {
										return (
											<Inline style={{ paddingLeft: '2rem' }}>
												<Checkbox
													color="default"
													inputProps={{
														'aria-label': 'checkbox with default color',
													}}
													checked={task.checked}
													onChange={() => context.onChecking(task, 1)}
												/>
												<h3 key={idx}>{it.item}</h3>
												<ActionIconBar props={item} level={2} />
											</Inline>
										);
									}
								});
							}
						})}
					</Body>
				);
			})}
		</Container>
	);
}
