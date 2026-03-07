'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
	const { theme } = useTheme();

	const containerRef = useRef<HTMLDivElement>(null);
	const requestRef = useRef<number>(0);
	const sceneRef = useRef<{
		scene: THREE.Scene;
		camera: THREE.PerspectiveCamera;
		renderer: THREE.WebGLRenderer;
		points: THREE.Points;
		geometry: THREE.BufferGeometry;
	} | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const SEPARATION = 100;
		const AMOUNTX = 50;
		const AMOUNTY = 50;

		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(theme === 'dark' ? 0x000000 : 0xffffff, 1000, 6000);

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1,
			10000,
		);
		camera.position.set(0, 600, 1500);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(window.innerWidth, window.innerHeight);
		
		containerRef.current.appendChild(renderer.domElement);

		const numParticles = AMOUNTX * AMOUNTY;
		const positions = new Float32Array(numParticles * 3);
		const colors = new Float32Array(numParticles * 3);
		const color = theme === 'dark' ? new THREE.Color(0x94a3b8) : new THREE.Color(0x3b82f6);

		let i = 0;
		for (let ix = 0; ix < AMOUNTX; ix++) {
			for (let iy = 0; iy < AMOUNTY; iy++) {
				positions[i * 3] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
				positions[i * 3 + 1] = 0;
				positions[i * 3 + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

				colors[i * 3] = color.r;
				colors[i * 3 + 1] = color.g;
				colors[i * 3 + 2] = color.b;
				i++;
			}
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		const material = new THREE.PointsMaterial({
			size: 8,
			vertexColors: true,
			transparent: true,
			opacity: 0.5,
			sizeAttenuation: true,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		sceneRef.current = { scene, camera, renderer, points, geometry };

		let count = 0;
		const animate = () => {
			if (!sceneRef.current) return;
			const { renderer, scene, camera, geometry } = sceneRef.current;
			
			const positions = geometry.attributes.position.array as Float32Array;
			let i = 0;
			for (let ix = 0; ix < AMOUNTX; ix++) {
				for (let iy = 0; iy < AMOUNTY; iy++) {
					positions[i * 3 + 1] = (Math.sin((ix + count) * 0.3) * 80) + (Math.sin((iy + count) * 0.5) * 80);
					i++;
				}
			}
			geometry.attributes.position.needsUpdate = true;
			
			renderer.render(scene, camera);
			count += 0.05;
			requestRef.current = requestAnimationFrame(animate);
		};

		const handleResize = () => {
			if (!sceneRef.current) return;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('resize', handleResize);
		requestRef.current = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(requestRef.current);
			if (sceneRef.current) {
				const { points, renderer } = sceneRef.current;
				points.geometry.dispose();
				if (Array.isArray(points.material)) {
					points.material.forEach(m => m.dispose());
				} else {
					points.material.dispose();
				}
				renderer.dispose();
				if (containerRef.current && renderer.domElement) {
					containerRef.current.removeChild(renderer.domElement);
				}
			}
			sceneRef.current = null;
		};
	}, [theme]);

	return (
		<div
			ref={containerRef}
			className={cn('pointer-events-none fixed inset-0 -z-10', className)}
			{...props}
		/>
	);
}
