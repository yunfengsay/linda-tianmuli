import {Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from 'three';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {MTLLoader} from "three/examples/jsm/loaders/MTLLoader";


export class App {
    private readonly scene = new Scene();
    private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
    private readonly renderer = new WebGLRenderer({
        antialias: true,
        canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });
    private readonly controls = new OrbitControls(this.camera, this.renderer.domElement)


    constructor() {
        // this.scene.add(this.brick);
        this.scene.background = new Color(0xFFFFFF);
        const scene = this.scene;
        this.camera.position.set(200, 100, 200);
        this.camera.lookAt(new Vector3(0, 0, 0));

        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setClearColor(new Color('rgb(0,0,0)'));
        const tianmuli = 'tianmuli.obj';
        const mtlLoader = new MTLLoader()
        mtlLoader
            .setPath('../../data/')
            .load('tianmuli.mtl',  materials => {
            materials.preload();
            new OBJLoader()
                .setPath('../../data/')
                .setMaterials(materials)
                .load(tianmuli, (obj) => {
                    scene.add(obj)
                },  (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
                }, (err) => {
                    console.error('load model error ->', err)
                })

        })
        this.controls.update();
        this.render();
    }

    private adjustCanvasSize() {
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render())
        this.controls.update();
        this.adjustCanvasSize();
    }
}
