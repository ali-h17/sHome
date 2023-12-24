import House_v3 from '../../public/House_v3';
import '../styles/model.css';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';

function Model({ state }) {
	return (
		<>
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 0, 15]} />
				<directionalLight
					intensity={0.7}
					decay={2}
					rotation={[-0.506, 0.629, 0.756]}
					position={[0, 10, 15]}
				/>
				<Suspense fallback={<Html>Loading...</Html>}>
					<House_v3 state={state} />
				</Suspense>

				<OrbitControls />
			</Canvas>
		</>
	);
}

export default Model;
