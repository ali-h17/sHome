import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import IState from '../src/interfaces/IState';
import { usePrevious } from '@uidotdev/usehooks';

interface ModelProps {
	state: IState;
}

function hexToString(hex: Number): string {
	return '#' + hex.toString(16);
}

export default function House(props: ModelProps) {
	const { state } = props;
	const group = useRef<THREE.Group>();
	const { nodes, animations } = useGLTF('/sHome/house_v7.glb');
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

		if (state.isWindowOpen && !prev?.isWindowOpen) {
			// Open isWindowOpen
			actions?.CloseLeftWindow?.stop();
			actions?.OpenLeftWindow?.reset();
			actions?.OpenLeftWindow?.setLoop(THREE.LoopOnce, 0);
			if (actions && actions.OpenLeftWindow) {
				actions.OpenLeftWindow.clampWhenFinished = true;
			}
			actions?.OpenLeftWindow?.play();
		} else if (!state.isWindowOpen && prev?.isWindowOpen) {
			// Close isWindowOpen
			actions?.OpenLeftWindow?.stop();
			actions?.CloseLeftWindow?.reset();
			actions?.CloseLeftWindow?.setLoop(THREE.LoopOnce, 0);
			if (actions && actions.CloseLeftWindow) {
				actions.CloseLeftWindow.clampWhenFinished = true;
			}
			actions?.CloseLeftWindow?.play();
		}
	}, [state]);

	return (
		<group ref={group as React.RefObject<THREE.Group>} scale={0.4}  >
			<group name="Scene">
				<group name="Node_0" scale={0.01}>
					<group name="Scene_1">
						<directionalLight
							name="Light_1"
							color={new THREE.Color('white')}
							intensity={2}
							position={[-100, 1000, -100]}
						/>

						<directionalLight
							name="Light_2"
							color={new THREE.Color('white')}
							intensity={2}
							position={[-100, -1000, -100]}
						/>
						{state.isLeftLightOn ? (
							<>
								<pointLight
									name="Light_2"
									color={new THREE.Color(hexToString(state.lightColor))}
									intensity={7}
									position={[-700, 550, 10]}
								/>
							</>
						) : null}
						{state.isRightLightOn ? (
							<>
								<pointLight
									name="Light_1"
									color={new THREE.Color('white')}
									intensity={5}
									position={[-100, 550, 10]}
								/>
							</>
						) : null}

						<group
							name="Group"
							position={[-792.387, 319.328, 260.371]}
							rotation={[-0.167, 0, 0]}
							scale={[3.087, 1.95, 3.138]}
						>
							<mesh
								name="Rectangle_8"
								geometry={(nodes.Rectangle_8 as THREE.Mesh).geometry}
								material={(nodes.Rectangle_8 as THREE.Mesh).material}
								position={[0, -100.79, 3.5]}
								rotation={[-3.052, 0, Math.PI]}
							/>
						</group>
						<group
							name="window"
							position={[-30.314, 556.662, -169.91]}
							scale={[0.971, 0.957, 0.031]}
						>
							<group
								name="body001"
								position={[-108.018, -6.121, 8.053]}
								scale={1.594}
							>
								<mesh
									name="Merged_Geometry001"
									geometry={(nodes.Merged_Geometry001 as THREE.Mesh).geometry}
									material={(nodes.Merged_Geometry001 as THREE.Mesh).material}
									position={[0, 0.237, 0]}
									rotation={[0, 0.891, 0]}
									scale={0.627}
								/>
							</group>
							<mesh
								name="glass001"
								geometry={(nodes.glass001 as THREE.Mesh).geometry}
								material={(nodes.glass001 as THREE.Mesh).material}
								position={[-108.018, -5.744, 7.878]}
								rotation={[0, 0, Math.PI]}
								scale={[-0.917, -0.917, -0.064]}
							/>
						</group>
						<group
							name="window_2"
							position={[-683.882, 566.451, -180.029]}
							scale={[1.056, 0.869, 0.015]}
						>
							<group
								name="body"
								position={[-108.018, -6.121, 8.054]}
								scale={1.594}
							>
								<mesh
									name="Merged_Geometry"
									geometry={(nodes.Merged_Geometry as THREE.Mesh).geometry}
									material={(nodes.Merged_Geometry as THREE.Mesh).material}
									position={[0, 0.237, 0]}
									scale={0.627}
								/>
								<mesh
									name="Cube_4"
									geometry={(nodes.Cube_4 as THREE.Mesh).geometry}
									material={(nodes.Cube_4 as THREE.Mesh).material}
									position={[0, 0, -3.035]}
									rotation={[0, 0, Math.PI]}
									scale={[-0.714, -0.714, -0.017]}
								/>
							</group>
							<mesh
								name="glass"
								geometry={(nodes.glass as THREE.Mesh).geometry}
								material={(nodes.glass as THREE.Mesh).material}
								position={[-108.018, -5.744, 7.879]}
								rotation={[0, 0, Math.PI]}
								scale={[-0.917, -0.917, -0.064]}
							/>
						</group>
						<group name="Default_Ambient_Light" position={[0, 1, 0]} />
						<group
							name="Group_2"
							position={[328.286, 792.035, 59.551]}
							rotation={[0, 0, -1.209]}
							scale={[2.28, 2.976, 1.848]}
						>
							<mesh
								name="Rectangle_8001"
								geometry={(nodes.Rectangle_8001 as THREE.Mesh).geometry}
								material={(nodes.Rectangle_8001 as THREE.Mesh).material}
								position={[-228.854, -220.607, 0]}
								rotation={[1.571, 1.478, 0]}
								scale={[1.02, 0.721, 1.225]}
							/>
						</group>
						<mesh
							name="Boolean_3"
							geometry={(nodes.Boolean_3 as THREE.Mesh).geometry}
							material={(nodes.Boolean_3 as THREE.Mesh).material}
							position={[-35.94, 562.802, -170.886]}
						/>
						<mesh
							name="Boolean_2"
							geometry={(nodes.Boolean_2 as THREE.Mesh).geometry}
							material={(nodes.Boolean_2 as THREE.Mesh).material}
							position={[-773.551, 538.065, -166.96]}
							scale={[1.005, 0.972, 0.516]}
						/>
						<mesh
							name="Rectangle"
							geometry={(nodes.Rectangle as THREE.Mesh).geometry}
							material={(nodes.Rectangle as THREE.Mesh).material}
							position={[-427.063, -76.773, 183.624]}
							rotation={[Math.PI / 2, 0, 0]}
							scale={[2.82, 2.591, 2.838]}
						/>
						<mesh
							name="Rectangle_2"
							geometry={(nodes.Rectangle_2 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_2 as THREE.Mesh).material}
							position={[207.539, 549.797, 59.551]}
							rotation={[Math.PI / 2, Math.PI / 2, 0]}
							scale={[2.393, 1.332, 3.456]}
						/>
						<mesh
							name="Rectangle_3"
							geometry={(nodes.Rectangle_3 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_3 as THREE.Mesh).material}
							position={[-483.643, 332.709, 59.551]}
							rotation={[Math.PI / 2, Math.PI / 2, 0]}
							scale={[2.838, 1.332, 3.456]}
						/>
						<mesh
							name="Rectangle_4"
							geometry={(nodes.Rectangle_4 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_4 as THREE.Mesh).material}
							position={[-1180.213, 374.385, 59.551]}
							rotation={[Math.PI / 2, Math.PI / 2, 0]}
							scale={[2.838, 1.332, 3.456]}
						/>
						<mesh
							name="Rectangle_6"
							geometry={(nodes.Rectangle_6 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_6 as THREE.Mesh).material}
							position={[-813.654, 377.243, 59.551]}
							rotation={[Math.PI / 2, 0, 0]}
							scale={[2.82, 1.332, 3.477]}
						/>
						<mesh
							name="Rectangle_7"
							geometry={(nodes.Rectangle_7 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_7 as THREE.Mesh).material}
							position={[-122.471, 377.243, 59.551]}
							rotation={[Math.PI / 2, 0, 0]}
							scale={[2.82, 1.332, 3.477]}
						/>
						<mesh
							name="Rectangle_9"
							geometry={(nodes.Rectangle_9 as THREE.Mesh).geometry}
							material={(nodes.Rectangle_9 as THREE.Mesh).material}
							position={[-469.564, 800.912, 59.551]}
							rotation={[Math.PI / 2, 0, 0]}
							scale={[4.346, 1.332, 3.477]}
						/>
					</group>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload('/house_v7.glb');
