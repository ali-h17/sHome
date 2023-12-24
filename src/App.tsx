import { useEffect, useMemo, useState } from 'react';
import Model from './components/Model';
import Controls from './components/Controls';
import ESPConnector from './classes/ESPConnector';
import Spinner from './components/Spinner';


import './styles/App.css';
import IState from './interfaces/IState';

const init: IState = {
	isGarageOpen: false,
	isLivingRoomLight: false,
	isBedRoomLight: false,
	manual: false,
	isLocked: true,
};

function App(): JSX.Element {
	const [state, setState] = useState<IState>(init);
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	const espConnector = useMemo(
		() => new ESPConnector('ws://192.168.130.85:80/ws', setState),
		[]
	);

	useEffect(() => {
		espConnector.connect(setIsLoading);
	}, []);


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

				<Controls state={state} setState={setState} espConnector={espConnector}/>
				
			</div>
		</>
	);
}

export default App;
