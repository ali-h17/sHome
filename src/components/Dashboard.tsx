import { IoRainyOutline, IoCloudOutline, IoMoonOutline } from 'react-icons/io5';
import { MdOutlineWbSunny } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai";
import IState from '../interfaces/IState';
import '../styles/Dashboard.css';
import {useEffect} from "react";
// @ts-ignore
import useSound from "use-sound";

const alarmURL = '/fire-alarm.mp3';


interface IDashboardProps {
	state: IState;
}

function Dashboard({ state }: IDashboardProps) {
	const [play, { sound, stop }] = useSound(alarmURL);

	useEffect(() => {
		if (state.fire) {
			if (sound) {

				sound._loop = true;
			}
			play({ forceSoundEnabled: true, interrupt: true });
		} else {
			stop();
		}
	}, [state])


	return (
		<div className="dashboard">
			{state.isRaining ? (
				<IoRainyOutline style={{ color: 'blue', fontSize: '2rem' }} />
			) : (
				<IoCloudOutline style={{ color: 'white', fontSize: '2rem' }} />
			)}

            <span style={{color: '#E1E1DA', fontSize: '2rem' }}>{String(Math.round(state.temp as number))}&deg;C</span>
			<span style={{color: '#E1E1DA', fontSize: '2rem' }}>{String(Math.round(state.humidity as number))}%</span>

            {
                !state.isRightLightOn ? (
                    <MdOutlineWbSunny style={{ color: 'yellow', fontSize: '2rem' }} />
                ) : (
                    <IoMoonOutline style={{ color: '#f0', fontSize: '2rem' }} />
                )
            }


			{state.fire ? ( <AiOutlineFire style={{ color: 'red', fontSize: '2rem' }} /> ) : (<></>)}



		</div>
	);
}

export default Dashboard;
