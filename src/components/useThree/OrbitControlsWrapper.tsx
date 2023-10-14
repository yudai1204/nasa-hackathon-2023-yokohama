import { OrbitControls } from "@react-three/drei";
import type { OrbitControlsChangeEvent } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Props = {
  orbitControlsRef: React.MutableRefObject<OrbitControlsImpl | null>;
  wideHeader: boolean;
  handleOrbitControlsChange: ((e: OrbitControlsChangeEvent | undefined) => void) | undefined;
};
export const WrapedOrbitControls = (props: Props) => {
  const { orbitControlsRef, wideHeader, handleOrbitControlsChange } = props;
  // この辺で拡大アニメーションできそう
  useFrame(() => {
    const orbitControls = orbitControlsRef.current;
    if (!orbitControls) return;
    // console.log(orbitControls.object.zoom);
    orbitControls.object.zoom = 1;
    orbitControls.object.updateProjectionMatrix();
    // orbitControls.update();
  });

  return (
    <OrbitControls
      ref={orbitControlsRef}
      minDistance={wideHeader ? 150 : 250}
      maxDistance={500}
      enablePan={false}
      onChange={handleOrbitControlsChange}
      // autoRotate={true}
      // autoRotateSpeed={0}
    />
  );
};
