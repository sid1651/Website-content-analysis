import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { X, Compass, Move, Volume2, VolumeX } from "lucide-react";
import vaishnoVideo from "../../imports/document_6208741329380319605.mp4";

type Props = {
  title: string;
  subtitle?: string;
  onClose: () => void;
};

// Converts device orientation (alpha/beta/gamma + screen) into a THREE quaternion.
// This is the standard three.js DeviceOrientationControls algorithm.
const zee = new THREE.Vector3(0, 0, 1);
const euler = new THREE.Euler();
const q0 = new THREE.Quaternion();
const q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // -PI/2 around x

function setQuaternionFromOrientation(
  quaternion: THREE.Quaternion,
  alpha: number,
  beta: number,
  gamma: number,
  orient: number
) {
  euler.set(beta, alpha, -gamma, "YXZ");
  quaternion.setFromEuler(euler);
  quaternion.multiply(q1);
  quaternion.multiply(q0.setFromAxisAngle(zee, -orient));
}

export function Video360Viewer({ title, subtitle, onClose }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [orientationOn, setOrientationOn] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);
  const [motionAvailable, setMotionAvailable] = useState(true);
  const [motionMessage, setMotionMessage] = useState(
    "Drag to look around · rotate your device to explore in every direction"
  );

  // Refs shared with the animation loop / event handlers
  const useOrientation = useRef(false);
  const hasOrientationEvent = useRef(false);
  const deviceData = useRef<{ alpha: number; beta: number; gamma: number }>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      72,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.01);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Video element as texture source
    const video = document.createElement("video");
    video.src = vaishnoVideo;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.autoplay = true;
    videoRef.current = video;
    video.play().catch(() => {});

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;

    // Sphere seen from the inside (invert on x)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Drag-to-look state
    let lon = 0;
    let lat = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startLon = 0;
    let startLat = 0;
    const target = new THREE.Vector3();

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLon = lon;
      startLat = lat;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      lon = startLon - (e.clientX - startX) * 0.15;
      lat = startLat + (e.clientY - startY) * 0.15;
      lat = Math.max(-85, Math.min(85, lat));
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    const el = renderer.domElement;
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const deviceQuat = new THREE.Quaternion();

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      if (useOrientation.current) {
        const { alpha, beta, gamma } = deviceData.current;
        const screenOrientation =
          window.screen.orientation?.angle ??
          ((window.orientation as number | undefined) ?? 0);
        const orient = screenOrientation * (Math.PI / 180);
        setQuaternionFromOrientation(
          deviceQuat,
          THREE.MathUtils.degToRad(alpha),
          THREE.MathUtils.degToRad(beta),
          THREE.MathUtils.degToRad(gamma),
          orient
        );
        camera.quaternion.copy(deviceQuat);
      } else {
        const phi = THREE.MathUtils.degToRad(90 - lat);
        const theta = THREE.MathUtils.degToRad(lon);
        target.setFromSphericalCoords(1, phi, theta);
        camera.lookAt(target);
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      video.pause();
      texture.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  // Detect whether iOS-style permission is required
  useEffect(() => {
    const anyEvent = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof anyEvent?.requestPermission === "function") {
      setNeedsPermission(true);
    }

    if (typeof window !== "undefined" && !("DeviceOrientationEvent" in window)) {
      setMotionAvailable(false);
      setMotionMessage(
        "Motion control is not available on this device or browser. Drag to explore the 360 view."
      );
    }
  }, []);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    hasOrientationEvent.current = true;
    deviceData.current = {
      alpha: e.alpha ?? 0,
      beta: e.beta ?? 0,
      gamma: e.gamma ?? 0,
    };
  };

  const enableOrientation = async () => {
    const anyEvent = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    try {
      if (typeof window !== "undefined" && !("DeviceOrientationEvent" in window)) {
        setMotionAvailable(false);
        setMotionMessage(
          "Motion control needs a phone or tablet with orientation sensors. Drag to explore on this device."
        );
        return;
      }

      if (typeof anyEvent?.requestPermission === "function") {
        const res = await anyEvent.requestPermission();
        if (res !== "granted") {
          setMotionMessage(
            "Motion permission was not granted. Tap again after allowing access, or drag to look around."
          );
          return;
        }
      }

      hasOrientationEvent.current = false;
      window.addEventListener("deviceorientation", handleOrientation, true);
      setMotionMessage("Move or rotate your device to look around the 360 view.");

      window.setTimeout(() => {
        if (hasOrientationEvent.current) {
          useOrientation.current = true;
          setOrientationOn(true);
          setMotionAvailable(true);
          setMotionMessage("Motion control on. Move your device to explore.");
          return;
        }

        window.removeEventListener("deviceorientation", handleOrientation, true);
        useOrientation.current = false;
        setOrientationOn(false);
        setMotionAvailable(false);
        setMotionMessage(
          "No motion sensor data was detected. This usually means the laptop or browser does not expose gyroscope data."
        );
      }, 1200);
    } catch {
      setMotionAvailable(false);
      setMotionMessage(
        "Motion control could not start in this browser. Drag to explore the 360 view."
      );
    }
  };

  const disableOrientation = () => {
    window.removeEventListener("deviceorientation", handleOrientation, true);
    useOrientation.current = false;
    setOrientationOn(false);
    setMotionMessage(
      "Drag to look around · rotate your device to explore in every direction"
    );
  };

  const toggleOrientation = () =>
    orientationOn ? disableOrientation() : enableOrientation();

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    setMuted(v.muted);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <div ref={mountRef} className="h-full w-full touch-none" />

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/70 to-transparent p-5">
        <div className="text-white">
          <div className="font-display text-[1.4rem]">{title}</div>
          {subtitle && (
            <div className="font-body text-sm text-white/70">{subtitle}</div>
          )}
          <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-0.5 font-body text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            360° VR DARSHAN
          </div>
        </div>
        <button
          onClick={onClose}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
          aria-label="Close viewer"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom controls */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-black/70 to-transparent p-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleOrientation}
            disabled={!motionAvailable && !orientationOn}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm backdrop-blur transition-colors ${
              orientationOn
                ? "bg-[var(--dd-saffron)] text-white"
                : "bg-white/15 text-white hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60"
            }`}
          >
            <Compass className="h-4 w-4" />
            {orientationOn ? "Motion control on" : "Move with your device"}
          </button>
          <button
            onClick={toggleMute}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>
        <p className="flex items-center gap-2 font-body text-sm text-white/70">
          <Move className="h-4 w-4" />
          {needsPermission && !orientationOn && motionAvailable
            ? "Tap “Move with your device”, then tilt & rotate to look around"
            : motionMessage}
        </p>
      </div>
    </div>
  );
}
