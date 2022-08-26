import { createContext, ReactNode, useEffect, useState } from 'react';
// import { api } from '../services/axios';
// import { Item } from '../interfaces/ItemInterface';

// type TasksContextProps = {
// 	children: ReactNode;
// };

// export interface SubItem {
// 	name?: string;
// 	checked?: boolean;
// 	id?: number;
// 	itens?: Item;
// }

// type TasksContextType = {
// 	tasks: Item[];
// 	fetchTasks: (query?: string) => Promise<void>;
// 	onChecking: (item: Item, level: number) => void;
// 	onAddingNewList: (name: string) => void;
// 	onAddingNewTask: (name: string, item: Item) => void;
// 	onDeletingTask: (item: Item, level: number) => void;
// 	onAddingNewSubTask: (item: Item, newSubTask: string) => void;
// 	onEditingTask: () => void;
// };

// export const TasksContext = createContext({} as TasksContextType);

// export const TasksContextProvider = ({ children }: TasksContextProps) => {
// 	const [tasks, setTasks] = useState<Item[]>([]);
// 	const [nameList, setNameList] = useState('');

// 	useEffect(() => {
// 		fetchTasks();
// 	}, []);

// 	async function fetchTasks(query?: string) {
// 		const response = await api.get('/tasks', {
// 			params: {
// 				_sort: 'id',
// 				_order: 'desc',
// 				q: query,
// 			},
// 		});
// 		setTasks(response.data);
// 	}

// 	function onChecking(item: Item, level: number) {
// 		if (level === 1) {
// 			api
// 				.put(`tasks/${item.id}`, { ...item, checked: !item.checked })
// 				.then(response => {
// 					if (response) {
// 						fetchTasks();
// 					}
// 				});
// 		} else {
// 			tasks.map(task => {
// 				if (task.itens && task.itens?.length > 0) {
// 					if (level === 2) {
// 						const found = task.itens.find((it: Item) => {
// 							return it === item;
// 						});
// 						if (found) {
// 							let newItens = task.itens.map((i: Item, idx2) => {
// 								if (i.id === item.id) {
// 									i.checked = !i.checked;
// 									return i;
// 								} else {
// 									return i;
// 								}
// 							});
// 							api.put(`tasks/${task.id}`, {
// 								...task,
// 								itens: [newItens, ...task.itens],
// 							});
// 						}
// 					} else {
// 						if (level === 3) {
// 							// task.itens.map((i: Item[], idx3) => {
// 							// 	if (i.length > 1) {
// 							// 		i.map((obj, idx: number) => {
// 							// 			if (obj.itens) {
// 							// 				const found = obj.itens.map((a: Item, b) => {
// 							// 					if (a.id === item.id && a.item === item.item) {
// 							// 						a.checked = !a.checked;
// 							// 						return a;
// 							// 					} else {
// 							// 						return a;
// 							// 					}
// 							// 				});
// 							// 				if (found) {
// 							// 					console.log(obj);
// 							// 					api.put(`tasks/${task.id}`, {
// 							// 						...task,
// 							// 						itens: [],
// 							// 					});
// 							// 				}
// 							// 			}
// 							// 		});
// 							// 	}
// 							// });
// 							console.log(task);
// 							task.itens.map((ite: Item[]) => {
// 								if (ite.length > 0) {
// 									//ite.map();
// 								}
// 							});
// 						}
// 					}
// 				}
// 			});
// 		}
// 	}

// 	async function onDeletingTask(item: Item, level: number) {
// 		if (level == 3) {
// 			tasks.map((task, idx) => {});
// 		}
// 		await api.delete(`tasks/${item.id}`);
// 		const newTasksList = tasks.filter(task => {
// 			return task.id !== item.id;
// 		});
// 		setTasks(newTasksList);
// 	}
// 	function onEditingTask() {}

// 	function onAddingNewSubTask(item: Item, newSubTask: string) {
// 		//identificar qual lista é
// 		//identificar qual atividade é
// 		//inserir no array itens em atividade
// 		//criar um array de itens caso a atividade não tenha
// 		tasks.map(async (task, idx) => {
// 			if (task.itens) {
// 				const found = task.itens.find((it: Item) => {
// 					return it.id === item.id;
// 				});
// 				if (found) {
// 					task.itens.map(async (it: Item, idx4) => {
// 						if (it.id === item.id) {
// 							if (it.itens) {
// 								//inserir dentro do array itens a subtask
// 							} else {
// 								let newSubTaskArray: SubItem[] = [];

// 								newSubTaskArray.push({
// 									...it,
// 									itens: {
// 										name: newSubTask,
// 										checked: false,
// 										id: 1,
// 									},
// 								});

// 								const idxOfItemChanged: number | undefined =
// 									task?.itens?.indexOf(found);
// 								if (task.itens && typeof idxOfItemChanged === 'number') {
// 									debugger;
// 									task.itens.splice(idxOfItemChanged, 1, newSubTaskArray);
// 									console.log(task.itens);
// 								}
// 							}
// 						}
// 					});
// 				}
// 			}
// 		});
// 	}

// 	// Argument of type is not assignable to parameter of type 'never'.

// 	async function onAddingNewTask(newTask: string, item: Item) {
// 		const found: Item | undefined = tasks.find(task => task.id === item.id);
// 		if (found) {
// 			tasks.map(async (task, idx) => {
// 				if (task.id === item.id) {
// 					if (task.itens && task.itens.length > 0) {
// 						const auxArray: Item[] = [];
// 						auxArray.push(
// 							{
// 								name: newTask,
// 								checked: false,
// 								id: task.itens.length + 1,
// 							},
// 							...task.itens
// 						);
// 						await api.put(`tasks/${item.id}`, {
// 							...item,
// 							itens: auxArray,
// 						});
// 					} else {
// 						await api.put(`tasks/${item.id}`, {
// 							...item,
// 							itens: [{ name: newTask, checked: false, id: 1 }],
// 						});
// 					}
// 				} else return;
// 			});
// 		}
// 	}

// 	async function onAddingNewList(name: string) {
// 		await api.post('tasks', {
// 			name: name,
// 			order: tasks.length + 1,
// 			checked: false,
// 		});
// 		setNameList(name);
// 	}

// 	return (
// 		<TasksContext.Provider
// 			value={{
// 				tasks,
// 				fetchTasks,
// 				onChecking,
// 				onAddingNewTask,
// 				onDeletingTask,
// 				onEditingTask,
// 				onAddingNewList,
// 				onAddingNewSubTask,
// 			}}
// 		>
// 			{children}
// 		</TasksContext.Provider>
// 	);
// };
