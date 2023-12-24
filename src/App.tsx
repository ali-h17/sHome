import { useEffect, useMemo, useState } from 'react';
import Model from './components/Model';
import Controls from './components/Controls';
import ESPConnector from './classes/ESPConnector';
import Button from './components/Button';
import Spinner from './components/Spinner';
import LockState from './components/LockState';
import Switch from '@mui/material/Switch';
import { FormGroup } from '@mui/material';

import './styles/App.css';
import { FormControlLabel } from '@mui/material';
import IState from './interfaces/IState';

/*
	JSON OBJECT INTERFACE THAT WILL BE SENT BACK AND FORTH
	{

	}

*/
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

	// useEffect(() => {
	// 	espConnector.connect(setIsLoading);
	// }, []);

	function handleGarageClick() {
		const msg = {
			...state,
			isGarageOpen: !state.isGarageOpen,
			manual: true,
		};
		espConnector.send(msg);
		
		setState({
			...state,
			isGarageOpen: !state.isGarageOpen,
		});
	}

	// if (isLoading) {
	// 	return (
	// 		<div className="loading-screen">
	// 			<p>Connecting...</p>
	// 			<Spinner />
	// 		</div>
	// 	);
	// }
	function handleBedRoomLight() {
		setState({
			...state,
			isBedRoomLight: !state.isBedRoomLight,
		});
	}

	function handleLivingRoomLight() {
		setState({
			...state,
			isLivingRoomLight: !state.isLivingRoomLight,
		});
	}

	function handleManualSwitchChange() {
		const msg = {
			...state,
			manual: !state.manual,
		};

		espConnector.send(msg);
		setState({
			...state,
			manual: !state.manual,
		});
	}

	function handleLockedSwitchChange() {
		const msg = {
			...state,
			isLocked: !state.isLocked,
		};

		espConnector.send(msg);
		setState({
			...state,
			isLocked: !state.isLocked,
		});
	}
	return (
		<>
			<div className="app">
				<div className="model-container">
					<Model state={state} />
				</div>

				<div className="dashboard">
					
				</div>

				<div className="controls">
					<div className="btn-container">
						<Button onClick={handleGarageClick}>
							{state.isGarageOpen ? 'Close' : 'Open'} Garage
						</Button>
						<Button onClick={handleLivingRoomLight}>
							{state.isLivingRoomLight ? 'Turn Off' : 'Turn On'}
						</Button>

						<Button onClick={handleBedRoomLight}>
							{state.isBedRoomLight ? 'Turn Off' : 'Turn On'}
						</Button>
					</div>

					<div className="switch- container">
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										checked={state.manual as boolean}
										onChange={handleManualSwitchChange}
									/>
								}
								labelPlacement="end"
								label="Auto Open Garage"
							/>
						</FormGroup>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										checked={state.isLocked as boolean}
										onChange={handleLockedSwitchChange}
									/>
								}
								labelPlacement="end"
								label={<LockState state={state} />}
							/>
						</FormGroup>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
