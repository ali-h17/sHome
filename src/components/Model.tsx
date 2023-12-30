import House from '../../public/House_v7.tsx';
import IState from '../interfaces/IState';
import '../styles/model.css';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { Vector3 } from 'three';

interface IModelProps {
	state: IState;
}
const initialCameraPosition = new Vector3(-7.17, 3.7, 12.64);

function Model({ state }: IModelProps) {
	return (
		<>
			<Canvas>
				<PerspectiveCamera makeDefault position={initialCameraPosition} />
				<directionalLight
					intensity={0.7}
					rotation={[-0.506, 0.629, 0.756]}
					position={[0, 10, 15]}
				/>
				<Suspense fallback={<Html>Loading...</Html>}>

					<House state={state} />
				</Suspense>

				<OrbitControls/>
			</Canvas>
		</>
	);
}

export default Model;
