import { useState } from 'react';
import Button from './Button';
import Switch from '@mui/material/Switch';
import { ChromePicker } from 'react-color';
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
	const [pickerOpen, setPickerOpen] = useState<Boolean>(false);

	function handleLightSwitch() {
		const msg = {
			...state,
			isLightOn: !state.isLightOn,
		};

		espConnector.send(msg);
		setState({
			...state,
			isLightOn: !state.isLightOn,
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

	function handleColorChange(color: any) {
		const msg = {
			...state,
			lightColor: color.hex,
		};

		espConnector.send(msg);
		setState({
			...state,
			lightColor: color.hex,
		});
	}

	function handleOpenWindow() {
		const msg = {
			...state,
			LivingRoomWindow: !state.LivingRoomWindow,
		};

		espConnector.send(msg);
		setState({
			...state,
			LivingRoomWindow: !state.LivingRoomWindow,
		});
	}

	return (
		<div className="controls">
			<div className="btn-container">
				<Button onClick={handleGarageClick}>
					{state.isGarageOpen ? 'Close' : 'Open'} Garage
				</Button>

				<Button onClick={handleOpenWindow}>
					{state.LivingRoomWindow ? 'Close' : 'Open'} Window
				</Button>
				<div>
					<Button
						onClick={() => {
							setPickerOpen((prev) => !prev);
						}}
					>
						Change Color
					</Button>

					{pickerOpen ? (
						<ChromePicker
							disableAlpha={true}
							color={state.lightColor as string}
							onChangeComplete={handleColorChange}
						/>
					) : null}
				</div>
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
								checked={state.isLightOn as boolean}
								onChange={handleLightSwitch}
							/>
						}
						labelPlacement="end"
						label="Light"
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
