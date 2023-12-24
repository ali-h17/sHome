import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IState from '../interfaces/IState';

interface LockStateProps {
	state: IState;
}

function LockState({ state }: LockStateProps): JSX.Element {
	return state.isLocked ? (
		<LockOpenOutlinedIcon sx={{ color: '#4fa94d' }} />
	) : (
		<LockOutlinedIcon sx={{ color: '#ba1c1c' }} />
	);
}

export default LockState;
