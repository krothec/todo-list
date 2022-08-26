import { createContext, useEffect, useState } from 'react';
import { api } from '../services/axios';

export const TasksContext = createContext();

export const TasksContextProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);
	const [nameList, setNameList] = useState('');
	const [userLogged, setUserLogged] = useState('você');

	useEffect(() => {
		fetchTasks();
	}, []);

	async function fetchTasks(query) {
		const response = await api.get('/tasks', {
			params: {
				_sort: 'id',
				_order: 'desc',
				q: query,
			},
		});
		setTasks(response.data);
	}

	async function onDeletingList(item) {
		await api.delete(`/tasks/${item.id}`);
		fetchTasks();
	}

	function onDeletingItem(item) {
		tasks.map(async task => {
			if (task.itens) {
				const found = task.itens.find(it => it.id === item.id);
				if (found) {
					const idx = task.itens.indexOf(found);
					task.itens.splice(idx, 1);
					const response = await api.put(`/tasks/${task.id}`, {
						...task,
					});
					response && fetchTasks();
				}
			}
		});
	}

	function onEditingNameList(item, newNameList) {
		const found = tasks.find(task => task.id === item.id);
		if (found) {
			tasks.map(async task => {
				if (task.id === item.id) {
					task.name = newNameList;
					const response = await api.put(`tasks/${task.id}`, {
						...task,
					});
					if (response) {
						fetchTasks();
					}
				}
			});
		}
	}

	function onCheckingItem(item) {
		tasks.map(async task => {
			if (task.itens) {
				task.itens.map(async it => {
					if (it.itens) {
						const found = it.itens.find(it => it.id === item.id);
						if (found) {
							it.itens.map(itt => {
								if (itt.id === item.id) {
									return (itt.checked = !itt.checked);
								}
							});
							return it;
						}
					}
				});
				const response = await api.put(`/tasks/${task.id}`, {
					...task,
				});
				response && fetchTasks();
			}
		});
	}

	async function onDeletingTask(item, level) {}

	function onAddingNewSubTask(item, newSubTask) {
		tasks.map(async (task, idx) => {
			if (task.itens) {
				const found = task.itens.find(itt => {
					return itt.id === item.id;
				});
				if (found) {
					task.itens.map(async (it, idx4) => {
						if (it.id === item.id) {
							let newSubTaskArray = [];
							if (it.itens) {
								const auxiliarArray = it.itens;
								auxiliarArray.push({
									name: newSubTask,
									id: it.itens.length + 1,
									checked: false,
								});
								it.itens = auxiliarArray;
								task.itens.map(async tt => {
									if (tt.id === item.id) {
										const response = await api.put(`tasks/${task.id}`, {
											...task,
											itens: task.itens,
										});
										response && fetchTasks();
									}
								});
							} else {
								newSubTaskArray = [];
								newSubTaskArray.push({
									...it,
									itens: [
										{
											name: newSubTask,
											checked: false,
											id: 1,
										},
									],
								});
								const idxOfItemChanged = task.itens.indexOf(found);
								task.itens.splice(idxOfItemChanged, 1, newSubTaskArray[0]);
								const response = await api.put(`tasks/${task.id}`, {
									...task,
									itens: task.itens,
								});
								if (response) {
									fetchTasks();
								}
							}
						}
					});
				}
			}
		});
	}

	async function onAddingNewTask(newTask, item) {
		const found = tasks.find(task => task.id === item.id);
		if (found) {
			tasks.map(async (task, idx) => {
				if (task.id === item.id) {
					if (task.itens && task.itens.length > 0) {
						const auxArray = [];
						auxArray.push(
							{
								name: newTask,
								checked: false,
								id: task.itens.length + 1,
							},
							...task.itens
						);
						const response = await api.put(`tasks/${item.id}`, {
							...item,
							itens: auxArray,
						});
						if (response) {
							fetchTasks();
						}
					} else {
						const response = await api.put(`tasks/${item.id}`, {
							...item,
							itens: [{ name: newTask, checked: false, id: 1 }],
						});
						if (response) {
							fetchTasks();
						}
					}
				} else return;
			});
		}
	}

	async function onAddingNewList(name) {
		await api.post('tasks', {
			name: name,
			order: tasks.length + 1,
			checked: false,
			user: userLogged,
		});
		setNameList(name);
		fetchTasks();
	}

	return (
		<TasksContext.Provider
			value={{
				tasks,
				fetchTasks,
				onCheckingItem,
				onAddingNewTask,
				onDeletingTask,
				onAddingNewList,
				onAddingNewSubTask,
				onDeletingList,
				onDeletingItem,
				userLogged,
				onEditingNameList,
			}}
		>
			{children}
		</TasksContext.Provider>
	);
};
