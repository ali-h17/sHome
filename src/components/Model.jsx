import Home from '../../public/Home';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
im

function Model() {
	return (
		<>
			<Canvas>
				<PerspectiveCamera makeDefault position={[0, 0, 100]} />
				<directionalLight
					intensity={0.7}
					decay={2}
					rotation={[-0.506, 0.629, 0.756]}
					position={[0, -10, 5]}
				/>
				<Suspense fallback={<Html>Loading...</Html>}>
					<Home />
				</Suspense>

				<OrbitControls />
			</Canvas>
		</>
	);
}

export default Model;
