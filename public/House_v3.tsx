import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { usePrevious } from '@uidotdev/usehooks';
import * as THREE from 'three';
import IState from '../src/interfaces/IState';

interface ModelProps {
	state: IState;
}

export default function Model(props: ModelProps) {
	const { state } = props;
	const group = useRef<THREE.Group>();
	const { nodes, materials, animations } = useGLTF('/house_v3.glb');
	const { actions } = useAnimations(animations, group);
	const prev = usePrevious(state);

	useEffect(() => {
		if (state.isGarageOpen && !prev?.isGarageOpen) {
			// Open garage
			actions?.CloseGarage?.stop();
			actions?.OpenGarage?.reset();
			actions?.OpenGarage?.setLoop(THREE.LoopOnce, 0);
			if (actions && actions.OpenGarage) {
				actions.OpenGarage.clampWhenFinished = true;
			}
			actions?.OpenGarage?.play();
		} else if (!state.isGarageOpen && prev?.isGarageOpen) {
			// Close garage
			actions?.OpenGarage?.stop();
			actions?.CloseGarage?.reset();
			actions?.CloseGarage?.setLoop(THREE.LoopOnce, 0);
			if (actions && actions.CloseGarage) {
				actions.CloseGarage.clampWhenFinished = true;
			}
			actions?.CloseGarage?.play();
		}
	}, [state, actions.OpenGarage, actions.CloseGarage, prev]);

	return (
		<group ref={group as React.RefObject<THREE.Group>} {...props} dispose={null}>
			<group name="Scene">
				<group name="Node_0" scale={0.01}>
					{state.isLivingRoomLight ? (
						<pointLight
							color={new THREE.Color('white')}
							intensity={5}
							position={[150, 200, -200]}
						/>
					) : null}

					{/* BedRoom Light*/}
					{state.isBedRoomLight ? (
						<pointLight
							color={new THREE.Color('white')}
							intensity={4}
							position={[-150, 140, -150]}
						/>
					) : null}
					<group name="Scene_1">
						<group
							name="Group"
							position={[-139, 59.135, -74.555]}
							rotation={[-0.457, 0, 0]}
							scale={[1.104, 1, 1]}
						>
							<mesh
								name="Rectangle_8"
								geometry={(nodes.Rectangle_8 as THREE.Mesh).geometry}
								material={(nodes.Rectangle_8 as THREE.Mesh).material}
								position={[10.056, -87.777, -33.164]}
								rotation={[-2.697, 0, Math.PI]}
								scale={[1.049, 1.013, 1]}
							/>
						</group>
						<group name="Default_Ambient_Light" position={[0, 1, 0]} />
						<group
							name="Group_2"
							position={[191.105, 359.947, -193.649]}
							rotation={[0, 0, -1.215]}
							scale={[1, 1.04, 1]}
						>
							<mesh
								name="Rectangle_8001"
								geometry={(nodes.Rectangle_8001 as THREE.Mesh).geometry}
								material={(nodes.Rectangle_8001 as THREE.Mesh ).material}
								position={[-11.044, -204.256, 0]}
								rotation={[Math.PI / 2, Math.PI / 2, 0]}
								scale={[1.02, 0.721, 1.225]}
							/>
						</group>
						<mesh
							name="Rectangle"
							geometry={(nodes.Rectangle as THREE.Mesh).geometry}
							material={(nodes.Rectangle as THREE.Mesh).material}
							position={[0, -109.918, -126.521]}
							rotation={[Math.PI / 2, 0, 0]}
							scale={[1, 1.402, 1.22]}
						/>
						<mesh
							name="Rectangle_2"
							geometry={(nodes.Rectangle_2 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_2 as THREE.Mesh).material}
							position={[225.008, 134.412, -193.649]}
							rotation={[Math.PI / 2, Math.PI / 2, 0]}
							scale={[1.02, 0.721, 1.225]}
							/>
							<mesh
							name="Rectangle_3"
							geometry={(nodes.Rectangle_3 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_3 as THREE.Mesh).material}
							position={[-20.061, 85.294, -193.649]}
							rotation={[Math.PI / 2, Math.PI / 2, 0]}
							scale={[1.22, 0.721, 1.225]}
						/>
						<mesh
							name="Rectangle_4"
							geometry={(nodes.Rectangle_4 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_4 as THREE.Mesh).material}
							position={[-261.088, 45.799, -193.649]}
							rotation={[Math.PI / 2, Math.PI / 2, 0]}
							scale={[1.22, 0.721, 1.225]}
						/>
						<mesh
							name="Rectangle_5"
							geometry={(nodes.Rectangle_5 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_5 as THREE.Mesh).material}
							position={[-8.015, 131.558, -314.35]}
							rotation={[0, 0, Math.PI / 2]}
							scale={[1.02, 2.022, 1.717]}
						/>
						<mesh
							name="Rectangle_6"
							geometry={(nodes.Rectangle_6 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_6 as THREE.Mesh).material}
							position={[-137.071, 85.294, -193.649]}
							rotation={[Math.PI / 2, 0, 0]}
							scale={[1, 0.721, 1.495]}
						/>
						<mesh
							name="Rectangle_7"
							geometry={(nodes.Rectangle_7 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_7 as THREE.Mesh).material}
							position={[107.998, 85.294, -193.649]}
							rotation={[Math.PI / 2, 0, 0]}
							scale={[1, 0.721, 1.495]}
						/>
					</group>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload('/house_v3.glb');
