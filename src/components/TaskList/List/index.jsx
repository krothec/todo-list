import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../../../context/TaskContext';
import {
	Inline,
	Container,
	InlineCheckBox,
	TextBar,
	InlineAddSubtask,
	DivSubItens,
} from '../styles';
import { Checkbox, TextField, IconButton, Tooltip } from '@material-ui/core';
import {
	AddBoxOutlined,
	Remove,
	Add,
	DeleteOutline,
	Close,
	Edit,
	Check,
} from '@material-ui/icons/';

const List = task => {
	const context = useContext(TasksContext);
	const [newTask, setNewTask] = useState('');
	const [newSubTask, setNewSubTask] = useState('');
	const [error, setError] = useState(false);
	const [numberInputSubItem, setNumberInputSubItem] = useState(0);
	const [newNameList, setNewNameList] = useState('');
	const [showTextEditNameList, setShowTextEditNameList] = useState(false);
	let item = task.item;

	function handleAddTask() {
		if (newTask === '') {
			setError(true);
		} else {
			setError(false);
			context.onAddingNewTask(newTask, task.item);
		}
	}

	function handleDeleteList(item) {
		if (context.userLogged !== item.user) {
			alert(`Você não tem permissão para editar a ${item.name}`);
		} else context.onDeletingList(item);
	}

	function handleEditNameList(item) {
		setShowTextEditNameList(true);
	}

	useEffect(() => {
		setNewTask('');
		setNewSubTask('');
		setError(false);
		setNumberInputSubItem(0);
		setShowTextEditNameList(false);
		setNewNameList('');
	}, [context.tasks]);

	function handleAddNewSubTask(item) {
		context.onAddingNewSubTask(task, item, newSubTask);
	}

	function handleShowNewSubtask(id) {
		if (id === numberInputSubItem) {
			setNumberInputSubItem(0);
		} else setNumberInputSubItem(id);
	}

	return (
		<Container>
			<Inline>
				<div>
					{!showTextEditNameList && (
						<Inline>
							<h1>{item.name}</h1>
							<IconButton
								aria-label="Adicionar nova atividade"
								component="span"
								onClick={() => handleEditNameList(item)}
							>
								<Edit />
							</IconButton>
						</Inline>
					)}
					{showTextEditNameList && (
						<>
							<TextField
								style={{ minWidth: '250px' }}
								error={error}
								helperText={
									error
										? `Não é possível adicionar uma atividade sem nome.`
										: ''
								}
								id={item.id.toString()}
								label="Novo nome da lista"
								size="small"
								onChange={e => setNewNameList(e.target.value)}
								value={newNameList}
							/>
							<IconButton
								aria-label="Excluir"
								component="span"
								onClick={() => context.onEditingNameList(item, newNameList)}
							>
								<Check />
							</IconButton>
						</>
					)}
					<p>Responsável: {item.user}</p>
				</div>
				<IconButton
					aria-label="Excluir"
					component="span"
					onClick={() => handleDeleteList(item)}
				>
					<Close />
				</IconButton>
			</Inline>
			<TextBar style={{ marginTop: '20px' }}>
				<TextField
					style={{ minWidth: '300px' }}
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
			</TextBar>
			{item.itens &&
				item.itens.map((it, idx1) => {
					return (
						<div>
							<Inline>
								<InlineCheckBox>
									<Checkbox
										color="default"
										inputProps={{
											'aria-label': 'checkbox with default color',
										}}
										checked={it.checked}
										//onChange={() => context.onChecking(task, 1)}
									/>
									<h3 key={idx1.toString()}>{it.name}</h3>
								</InlineCheckBox>
								<div>
									<IconButton
										color="primary"
										aria-label="ícone de edição"
										component="span"
										onClick={() => handleShowNewSubtask(it.id)}
									>
										{numberInputSubItem === it.id ? <Remove /> : <Add />}
									</IconButton>
									<Tooltip
										title={`Apagar a atividade ${it.name} e seus subitens`}
									>
										<IconButton
											aria-label="Deletar atividade"
											component="span"
											onClick={() => context.onDeletingItem(it)}
										>
											<DeleteOutline />
										</IconButton>
									</Tooltip>
								</div>
							</Inline>
							{numberInputSubItem === it.id && (
								<InlineAddSubtask>
									<TextField
										style={{ minWidth: '250px' }}
										error={error}
										helperText={
											error
												? `Não é possível adicionar uma atividade sem nome.`
												: ''
										}
										id={item.id.toString()}
										label={`Adicionar atividade em ${it.name}`}
										size="small"
										onChange={e => setNewSubTask(e.target.value)}
										value={newSubTask}
									/>
									<IconButton
										aria-label="Adicionar nova atividade"
										component="span"
										onClick={() => handleAddNewSubTask(it)}
									>
										<AddBoxOutlined />
									</IconButton>
								</InlineAddSubtask>
							)}
							{it.itens &&
								it.itens.map((itt, idx2) => {
									return (
										<DivSubItens>
											<Inline>
												<InlineCheckBox>
													<Checkbox
														color="default"
														inputProps={{
															'aria-label': 'checkbox with default color',
														}}
														checked={itt.checked}
														onChange={() => context.onCheckingItem(itt, task)}
													/>
													<h4 key={idx2.toString()}>{itt.name}</h4>
												</InlineCheckBox>
											</Inline>
										</DivSubItens>
									);
								})}
						</div>
					);
				})}
		</Container>
	);
};

export default List;
