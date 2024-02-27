import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';
import gsap from 'gsap';

@Component({
  selector: 'canvas-box',
  templateUrl: './canvas-box.component.html',
  styleUrls: ['./canvas-box.component.scss'],
})
export class CanvasBoxComponent implements OnInit {
  @ViewChild('#canvas-box', { static: false }) canvasBox!: ElementRef<String>;

  gui!: GUI;

  constructor() {}

  ngOnInit(): void {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void {
    const canvas = document.getElementById('canvas-box');

    const scene = new THREE.Scene();

    //Create sphere
    const sphereGeometry = new THREE.SphereGeometry(4, 15, 15);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x38761d,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    //Create lines/wireframes
    const wireframe = new THREE.WireframeGeometry(sphereGeometry);
    const line = new THREE.LineBasicMaterial({ color: 0x5b5b5b, linewidth: 1 });
    const lineWireframe = new THREE.LineSegments(wireframe, line);
    scene.add(lineWireframe);

    //Sphere group = outer sphere
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);
    //Line group, wireframe for outer sphere
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    // Create multiple spheres with different positions
    const numberOfSpheres = 6;
    const radius = 15;

    //duplicate sphere for sphere group
    for (let i = 0; i < numberOfSpheres; i++) {
      const angle = (i / numberOfSpheres) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      const wireframes = new THREE.WireframeGeometry(sphereGeometry);
      const lines = new THREE.LineBasicMaterial({
        color: 0x5b5b5b,
        linewidth: 1,
      });
      const lineWireframes = new THREE.LineSegments(wireframes, lines);
      scene.add(lineWireframes);

      sphere.position.set(x, y, 0);
      lineWireframes.position.set(x, y, 0);
      sphereGroup.add(sphere);
      lineGroup.add(lineWireframes);
    }

    // Handle mouse wheel scrolling
    let rotationSpeed = 0.1;

    document.addEventListener('wheel', (event) => {
      // Update the rotation of the entire group based on scroll direction
      if (event.deltaY > 0) {
        sphereGroup.rotation.z += rotationSpeed;
        lineGroup.rotation.z += rotationSpeed;
      } else {
        sphereGroup.rotation.z -= rotationSpeed;
        lineGroup.rotation.z -= rotationSpeed;
      }
    });

    //GSAP animation
    gsap.to(sphere.rotation, {
      duration: 5, // Animation duration in seconds
      x: Math.PI * 2, // Rotate 360 degrees around the x-axis
      y: Math.PI * 2, // Rotate 360 degrees around the y-axis
      repeat: -1, // Repeat indefinitely
      ease: 'linear', // Linear easing for a smooth rotation
    });

    gsap.to(lineWireframe.rotation, {
      duration: 5, // Animation duration in seconds
      x: Math.PI * 2, // Rotate 360 degrees around the x-axis
      y: Math.PI * 2, // Rotate 360 degrees around the y-axis
      repeat: -1, // Repeat indefinitely
      ease: 'linear', // Linear easing for a smooth rotation
    });

    gsap.to(sphereGroup.rotation, {
      duration: 5, // Animation duration in seconds
      x: Math.PI * 2, // Rotate 360 degrees around the x-axis
      y: Math.PI * 2, // Rotate 360 degrees around the y-axis
      repeat: -1, // Repeat indefinitely
      ease: 'linear', // Linear easing for a smooth rotation
    });

    gsap.to(lineGroup.rotation, {
      duration: 5, // Animation duration in seconds
      x: Math.PI * 2, // Rotate 360 degrees around the x-axis
      y: Math.PI * 2, // Rotate 360 degrees around the y-axis
      repeat: -1, // Repeat indefinitely
      ease: 'linear', // Linear easing for a smooth rotation
    });

    this.gui = new GUI();

    const options = {
      sphereColor: '#ffea00',
      wireframe: false,
    };

    //For changing sphere color
    this.gui.addColor(options, 'sphereColor').onChange(function (e: any) {
      sphere.material.color.set(e);
    });
    //add wireframe handler
    this.gui.add(options, 'wireframe').onChange(function (e: any) {
      sphere.material.wireframe = e;
    });

    const directionalLight = new THREE.DirectionalLight(0xc1b531, 5);
    scene.add(directionalLight);
    directionalLight.position.set(-30, 50, 0);

    const dlightHelper = new THREE.DirectionalLightHelper(directionalLight);
    scene.add(dlightHelper);

    const windowAny = window as any;

    const canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Add ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0x2986cc);
    scene.add(ambientLight);

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    if (!canvas) {
      return;
    }

    //Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.setClearColor(0xe232222, 1);
    renderer.setSize(canvasSizes.width, canvasSizes.height);
    document.body.appendChild(renderer.domElement);

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    window.addEventListener('resize', () => {
      canvasSizes.width = window.innerWidth;
      canvasSizes.height = window.innerHeight;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasSizes.width, canvasSizes.height);
    });

    const animateGeometry = () => {
      // sphere.rotation.x += 0.01;
      // sphere.rotation.y += 0.01;
      // lineWireframe.rotation.x += 0.01;
      // lineWireframe.rotation.y += 0.01;
      // sphereGroup.rotation.x += 0.01
      // sphereGroup.rotation.y += 0.01
      // lineGroup.rotation.x += 0.01
      // lineGroup.rotation.y += 0.01

      // Rotate all spheres

      // Render
      renderer.render(scene, camera);

      // Call animateGeometry again on the next frame
      window.requestAnimationFrame(animateGeometry);
    };

    animateGeometry();
  }

  scrollFunction() {}
}
