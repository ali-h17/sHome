import Button from './Button';

import Switch from '@mui/material/Switch';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import LockState from './LockState';
import IState from '../interfaces/IState';
import EspConnector from '../classes/ESPConnector';

interface IControlsProps {
	state: IState;
	setState: React.Dispatch<React.SetStateAction<IState>>;
	espConnector: EspConnector;
}

function Controls({
	state,
	setState,
	espConnector,
}: IControlsProps): JSX.Element {
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
	return (
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

			<div className="switch-container">
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
	);
}

export default Controls;
