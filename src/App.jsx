import './App.css';

import Model from './components/Model';
import Controls from './components/Controls';

import axios from 'axios';
import { useEffect, useContext } from 'react';
import { Context } from './components/StateContext';


function App() {

	const [state, setState] = useContext(Context);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://api.example.com/data');
				console.log('GET Request Response:', response.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {}, []);

	return (
		<>
			<div className="app">
				<div className="model-container">
					<Model />
				</div>
				<div className="controls">
					<Controls />
				</div>
			</div>
		</>
	);
}

export default App;
