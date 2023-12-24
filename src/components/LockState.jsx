import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function LockState({ state }) {
	return state.isLocked ? (
		<LockOpenOutlinedIcon sx={{ color: '#4fa94d' }} />
	) : (
		<LockOutlinedIcon sx={{ color: '#ba1c1c' }} />
	);
}

export default LockState;
