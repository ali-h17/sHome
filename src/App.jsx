import React, { useEffect, useMemo, useState } from 'react';
import Model from './components/Model';
import Controls from './components/Controls';
import ESPConnector from './classes/ESPConnector';
import Button from './components/Button';
import Spinner from './components/Spinner';

import './styles/App.css';

function App() {
	const [state, setState] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const espConnector = useMemo(
		() => new ESPConnector('ws://192.168.130.85:80/ws', setState),
		[]
	);

	useEffect(() => {
		espConnector.connect(setIsLoading);
	}, []);


	function handleGarageClick() {
		const msg = {
			...state,
			isGarageOpen: !state.isGarageOpen,
		};
		espConnector.send(msg);
	}


	if (isLoading) {
		return (
			<div className="loading-screen">
				<p>Connecting...</p>
				<Spinner />
			</div>
		);
	}

	return (
		<>
			<div className="app">
				<div className="model-container">
					<Model state={state} />
				</div>
				<div className="controls">
					<Button onClick={handleGarageClick}>
						{state.garageOpen ? 'Close' : 'Open'} Garage
					</Button>
				</div>
			</div>
		</>
	);
}

export default App;
