import { IconButton } from '@material-ui/core';
import { DeleteOutline, Edit, MoreHoriz } from '@material-ui/icons/';
import { useContext, useState } from 'react';
import { TasksContext } from '../../context/TaskContext';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Item } from '../../interfaces/ItemInterface';

export interface ItemProps {
	props: Item;
	level: number;
}

const ActionIconBar: React.FC<ItemProps> = item => {
	const context = useContext(TasksContext);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const options = ['Tornar em nova atividade'];

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function handleDeleteTask() {
		context.onDeletingTask(item.props, item.level);
	}

	function handleEditTask() {
		context.onEditingTask();
	}

	return (
		<div>
			<IconButton
				color="primary"
				aria-label="ícone de edição"
				component="span"
				onClick={() => handleEditTask()}
			>
				<Edit />
			</IconButton>
			<IconButton
				aria-label="ícone de lixeira"
				component="span"
				onClick={() => handleDeleteTask()}
			>
				<DeleteOutline color="error" />
			</IconButton>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={e => handleClick(e)}
			>
				<MoreHoriz />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						width: '250px',
					},
				}}
			>
				{options.map(option => (
					<MenuItem
						key={option}
						selected={option === 'Pyxis'}
						onClick={handleClose}
					>
						{option}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
export default ActionIconBar;
