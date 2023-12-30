import React, {useState} from 'react';
import Button from './Button';
import Switch from '@mui/material/Switch';
import {ChromePicker} from 'react-color';
import {FormControlLabel, FormGroup} from '@mui/material';
import LockState from './LockState';
import IState from '../interfaces/IState';
import EspConnector from '../classes/ESPConnector';
import '../styles/ColorPicker.css';

interface IControlsProps {
	state: IState;
	setState: React.Dispatch<React.SetStateAction<IState>>;
	espConnector: EspConnector;
}

function Controls({
	state,
	espConnector,
}: IControlsProps): JSX.Element {
	const [pickerOpen, setPickerOpen] = useState<Boolean>(false);

	function handleLightSwitch() {
		if (state.lightColor === 0) {
			state.lightColor = 0xffffff;
		}
		const msg = {
			...state,
			isLeftLightOn: !state.isLeftLightOn,
		};

		espConnector.send(msg);
		// setState({
		// 	...state,
		// 	isLightOn: !state.isLightOn,
		// });
	}

	function handleManualSwitchChange() {
		const msg = {
			...state,
			manual: !state.manual,
		};

		espConnector.send(msg);
		// setState({
		// 	...state,
		// 	manual: !state.manual,
		// });
	}

	function handleLockedSwitchChange() {
		const msg = {
			...state,
			isLocked: !state.isLocked,
		};

		espConnector.send(msg);
		// setState({
		// 	...state,
		// 	isLocked: !state.isLocked,
		// });
	}
	function handleGarageClick() {
		const msg = {
			...state,
			isGarageOpen: !state.isGarageOpen,
			manual: true,
		};
		espConnector.send(msg);

		// setState({
		// 	...state,
		// 	isGarageOpen: !state.isGarageOpen,
		// 	manual: true,
		// });
	}

	function handleColorChange(color: any) {
		const hex: Number = parseInt(color.hex.replace(/^#/, ''), 16);
		const msg = {
			...state,
			lightColor: hex,
		};

		espConnector.send(msg);
		// setState({
		// 	...state,
		// 	lightColor: hex,
		// });
	}

	function handleOpenWindow() {
		const msg = {
			...state,
			isWindowOpen: !state.isWindowOpen,
		};

		espConnector.send(msg);
		// setState({
		// 	...state,
		// 	isWindowOpen: !state.isWindowOpen,
		// });
	}

	function hexToString(hex: Number) {

		return hex.toString(16);
	}

	return (
		<div className="controls">
			<div className="btn-container">
				<Button onClick={handleGarageClick}>
					{state.isGarageOpen ? 'Close' : 'Open'} Garage
				</Button>

				<Button onClick={handleOpenWindow}>
					{state.isWindowOpen ? 'Close' : 'Open'} Window
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
							color={hexToString(state.lightColor)}
							onChangeComplete={handleColorChange}
							className='color-picker'

						/>
					) : null}
				</div>
			</div>

			<div className="switch-container">
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={!state.manual as boolean}
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
								checked={state.isLeftLightOn as boolean}
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
