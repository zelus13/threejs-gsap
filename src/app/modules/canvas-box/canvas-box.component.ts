import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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

  radiusNormal = 1.5;
  radiusBig = 3.5;
  widthSeg = 50;
  heightSeg = 50;

  animationId!: any;

  renderer: any = THREE.WebGLRenderer;
  scene: any = THREE.Scene;
  camera: any = THREE.PerspectiveCamera;
  ambientLight: any = THREE.AmbientLight;

  canvas: any;
  canvasSizes: any;

  controls: any = OrbitControls;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.initThree();
    this.createThreeJsBox();
    this.render();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
  }

  initThree() {
    //Create scene
    this.scene = new THREE.Scene();
    this.canvas = document.getElementById('canvas-box');

    //Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Set up camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 2.5);
    this.camera.updateProjectionMatrix();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();

    //Set canvas size
    this.canvasSizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    if (!this.canvas) {
      return;
    }

    window.addEventListener('resize', () => {
      this.canvasSizes.width = window.innerWidth;
      this.canvasSizes.height = window.innerHeight;

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.canvasSizes.width, this.canvasSizes.height);
    });
  }

  createThreeJsBox(): void {
    const defaultColor = new THREE.Color(0x38761d);
    const newColor = new THREE.Color(0x8fce00);

    //Create sphere
    const sphereGeometry1 = new THREE.SphereGeometry(
      this.radiusNormal,
      this.widthSeg,
      this.heightSeg
    );
    const sphereMaterial1 = new THREE.MeshStandardMaterial({
      color: 0x8fce00,
    });
    const light = new THREE.PointLight(0x8fce00, 100, 0);
    light.position.set(0, 0, 0);
    this.scene.add(light);

    const sphereGeometry2 = new THREE.SphereGeometry(
      this.radiusNormal,
      this.widthSeg,
      this.heightSeg
    );
    const sphereMaterial2 = new THREE.MeshStandardMaterial({
      color: 0x38761d,
    });

    const sphereGeometry3 = new THREE.SphereGeometry(
      this.radiusNormal,
      this.widthSeg,
      this.heightSeg
    );
    const sphereMaterial3 = new THREE.MeshStandardMaterial({
      color: 0x38761d,
    });

    const sphereGeometry4 = new THREE.SphereGeometry(
      this.radiusNormal,
      this.widthSeg,
      this.heightSeg
    );
    const sphereMaterial4 = new THREE.MeshStandardMaterial({
      color: 0x38761d,
    });

    const sphereGeometry5 = new THREE.SphereGeometry(
      this.radiusNormal,
      this.widthSeg,
      this.heightSeg
    );
    const sphereMaterial5 = new THREE.MeshStandardMaterial({
      color: 0x38761d,
    });

    const sphereGeometry6 = new THREE.SphereGeometry(
      this.radiusNormal,
      this.widthSeg,
      this.heightSeg
    );
    const sphereMaterial6 = new THREE.MeshStandardMaterial({
      color: 0x38761d,
    });

    const sphere1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);
    const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    const sphere3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3);
    const sphere4 = new THREE.Mesh(sphereGeometry4, sphereMaterial4);
    const sphere5 = new THREE.Mesh(sphereGeometry5, sphereMaterial5);
    const sphere6 = new THREE.Mesh(sphereGeometry6, sphereMaterial6);

    //Sphere position
    sphere1.position.set(0, 0, 0);
    sphere2.position.set(-3, 3, 0);
    sphere3.position.set(3, 3, 0);
    sphere4.position.set(-3, -3, 0);
    sphere5.position.set(3, -3, 0);
    sphere6.position.set(10, 10, 0);

    this.scene.add(sphere1);
    this.scene.add(sphere2);
    this.scene.add(sphere3);
    this.scene.add(sphere4);
    this.scene.add(sphere5);
    this.scene.add(sphere6);

    // Add ambient light to the scene
    this.ambientLight = new THREE.AmbientLight(0x8fce00);
    this.scene.add(this.ambientLight);

    //GSAP Animation sequence
    //set sphere position, duration, delay

    //Move backwards
    gsap.to(sphere1.position, { z: -7, duration: 2, delay: 1 });
    gsap.to(sphere2.position, { z: -7, duration: 2, delay: 1 });
    gsap.to(sphere3.position, { z: -7, duration: 2, delay: 1 });
    gsap.to(sphere4.position, { z: -7, duration: 2, delay: 1 });
    gsap.to(sphere5.position, { z: -7, duration: 2, delay: 1 });
    gsap.to(sphere6.position, { z: -7, duration: 2, delay: 1 });

    //set light position, duration, delay
    gsap.to(light.position, { z: -7, duration: 2, delay: 1 });

    //----------------------------------------------------------//
    // Turn into circle                                          //
    //----------------------------------------------------------//
    gsap.to(sphere1.position, {
      x: -2.5,
      y: 2,
      z: -10,
      ease: 'power1.in',
      duration: 1.5,
      delay: 3,
    });
    gsap.to(sphere1.position, {
      z: -7,
      ease: 'power4.out',
      duration: 1.5,
      delay: 4,
    });
    //change the light position after sphere change into circle
    gsap.to(light.position, {
      x: -2.5,
      y: 2,
      z: -7,
      duration: 1.5,
      delay: 3.8,
    });

    gsap.to(sphere2.position, {
      x: -4,
      y: -2.5,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 3,
    });

    gsap.to(sphere3.position, {
      x: 2,
      y: 3,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 3,
    });

    gsap.to(sphere4.position, {
      x: -1,
      y: -6,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 3,
    });

    gsap.to(sphere5.position, {
      x: 3.5,
      y: -5,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 3,
    });

    gsap.to(sphere6.position, {
      x: 5,
      y: -0.5,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 3,
    });

    //----------------------------------------------------------//
    // Rotate circle                                            //
    //----------------------------------------------------------//
    //change the light position after sphere change into circle
    gsap.to(light.position, {
      x: -2.5,
      y: 2,
      z: -7,
      duration: 1.5,
      delay: 5.8,
    });

    gsap.to(sphere1.position, {
      x: 2,
      y: 3,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 5,
    });
    gsap.to(sphere1.material.color, {
      r: defaultColor.r,
      g: defaultColor.g,
      b: defaultColor.b,
      ease: 'power1.inOut',
      duration: 2,
      delay: 5,
      onUpdate: () => {
        sphere2.material.needsUpdate = true;
      },
    });

    gsap.to(sphere2.position, {
      x: -2.5,
      y: 2,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 5,
    });
    gsap.to(sphere2.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
      ease: 'power1.inOut',
      duration: 2,
      delay: 5,
      onUpdate: () => {
        sphere2.material.needsUpdate = true;
      },
    });

    gsap.to(sphere3.position, {
      x: 5,
      y: -0.5,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 5,
    });

    gsap.to(sphere4.position, {
      x: -4,
      y: -2.5,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 5,
    });

    gsap.to(sphere5.position, {
      x: -1,
      y: -6,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 5,
    });

    gsap.to(sphere6.position, {
      x: 3.5,
      y: -5,
      ease: 'power1.inOut',
      duration: 1.5,
      delay: 5,
    });

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    // Handle mouse wheel scrolling
    // let rotationSpeed = 0.1;

    // document.addEventListener('wheel', (event) => {
    //   // Update the rotation of the entire group based on scroll direction
    //   if (event.deltaY > 0) {
    //     sphereGroup.rotation.z += rotationSpeed;
    //     lineGroup.rotation.z += rotationSpeed;
    //   } else {
    //     sphereGroup.rotation.z -= rotationSpeed;
    //     lineGroup.rotation.z -= rotationSpeed;
    //   }
    // });

    // this.gui = new GUI();

    // const options = {
    //   sphereColor: '#ffea00',
    //   wireframe: false,
    // };

    //For changing sphere color
    // this.gui.addColor(options, 'sphereColor').onChange(function (e: any) {
    //   sphere.material.color.set(e);
    // });
    // //add wireframe handler
    // this.gui.add(options, 'wireframe').onChange(function (e: any) {
    //   sphere.material.wireframe = e;
    // });
  }

  animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.ngZone.run(() => this.render());
  }

  render(): void {
    // sphere.rotation.x += 0.01;
    // sphere.rotation.y += 0.01;
    // lineWireframe.rotation.x += 0.01;
    // lineWireframe.rotation.y += 0.01;
    // sphereGroup.rotation.x += 0.01
    // sphereGroup.rotation.y += 0.01
    // lineGroup.rotation.x += 0.01
    // lineGroup.rotation.y += 0.01

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  toggleAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    } else {
      this.animate();
    }
  }
}
