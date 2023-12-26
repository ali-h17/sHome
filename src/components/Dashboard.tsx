import { IoRainyOutline, IoCloudOutline, IoMoonOutline } from 'react-icons/io5';
import { MdOutlineWbSunny } from "react-icons/md";
import IState from '../interfaces/IState';
import '../styles/Dashboard.css';

interface IDashboardProps {
	state: IState;
}

function Dashboard({ state }: IDashboardProps) {
	return (
		<div className="dashboard">
			{state.isRaining ? (
				<IoRainyOutline style={{ color: 'blue', fontSize: '2rem' }} />
			) : (
				<IoCloudOutline style={{ color: 'white', fontSize: '2rem' }} />
			)}

            <span style={{color: '#E1E1DA', fontSize: '2rem' }}>{String(state.temp)}&deg;C</span>

            {
                state.isSunny ? (
                    <MdOutlineWbSunny style={{ color: 'yellow', fontSize: '2rem' }} />
                ) : (
                    <IoMoonOutline style={{ color: '#f0', fontSize: '2rem' }} />
                )
            }

		</div>
	);
}

export default Dashboard;
