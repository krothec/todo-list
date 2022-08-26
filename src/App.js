import { GlobalStyle } from './styles/global.ts';
import { TaskList } from './components/TaskList';
import { TasksContextProvider } from './context/TaskContext';

function App() {
	return (
		<>
			<TasksContextProvider>
				<TaskList />
				<GlobalStyle />
			</TasksContextProvider>
		</>
	);
}

export default App;
