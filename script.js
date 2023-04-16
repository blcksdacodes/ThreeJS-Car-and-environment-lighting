import * as THREE from './three.js/build/three.module.js'
import * as CONTROL from './three.js/examples/jsm/controls/OrbitControls.js'
import * as PCONTROL from './three.js/examples/jsm/controls/PointerLockControls.js'
import * as LOAD from "./three.js/examples/jsm/loaders/GLTFLoader.js";
import * as OBJLOAD from './three.js/src/loaders/ObjectLoader.js'


let scene, camera, cameraFPS, renderer, controls, controls2, loader
const meshes=[]
const helpers=[]
const lines=[]
var activecam = false

function init() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)

    

    renderer = new THREE.WebGLRenderer({
        antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x303030)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.body.appendChild(renderer.domElement)

    // camera.position.z = -70
    // camera.position.y = 60
    // camera.position.x = 50
    //camera.rotation.y = 40
    // camera.position.x = -20
    //camera.lookAt(0, 0, 0)

    cameraFPS = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)

    cameraFPS.position.z = 3
    cameraFPS.position.y = 7
    cameraFPS.position.x = -7.45
    cameraFPS.lookAt(-7.45,10,100)
    //scene.add(cameraFPS)

    //renderer.render(scene, cameraFPS)


    camera.position.z = -70
    camera.position.y = 20
    camera.position.x = -7.45
    //camera.lookAt(-7.45,10,100)
    controls = new CONTROL.OrbitControls(camera, renderer.domElement)
    controls.maxPolarAngle = Math.PI/2.05
    controls.maxDistance = 90
    controls.minDistance = 90
  
    //scene.add(camera)

   
    
   


    
    
    
    generaterightlamps()
    generateleftlamps()
    generateLight()
    generateplane()
    generatebuildingsright()
    generatebuildingsleft()
    generatebulbs()
    //createText("ST.ASHCRE", 1, 5)
    skybox()
    //keyboard()
    carmodel()
    //textcreate()
   
}

function carmodel(){
    loader = new LOAD.GLTFLoader()
    let mesh, material
    loader.load('./assets/model/model.glb', function(gltf){
        let car
        car = gltf.scene.children[0]
        // car.scale.set(1,1,1)
        car.scale.set(5,5,5)
        //gltf.scene.position.set(-7.4,0,0)
        material = new THREE.MeshPhongMaterial()
        mesh = new THREE.Mesh(gltf, material)
        car.position.x = -7.4
        car.castShadow = true
        scene.add(car);
        car.maxDistance = 500

        //car light
        let light,light2, helper,helper2, light3
        light = new THREE.SpotLight(0xffffff, 30)
        light.distance = 100
        light.angle = Math.PI / 18
        light.castShadow = true
        light.penumbra = 1
        light.position.x = -4
        // light.lookAt(-7.45,10,100)
        light.position.y = 4
        light.position.z = 1
        light.target.position.set(10,0,500)
        // light.rotation.x = 50
        // light.rotation.z = 50
        // light.rotation.y = 50
        light2 = new THREE.SpotLight(0xffffff, 30)
        light2.distance = 100
        light2.angle = Math.PI / 18
        light2.castShadow = true
        light2.penumbra = 1
        light2.position.x = -11
        // light2.lookAt(-7.45,10,100)
        light2.position.y = 4
        light2.position.z = 1
        light2.target.position.set(-10,0,500)

        
        
        scene.add(light)
        scene.add(light2)
    
        scene.add(light.target)
        scene.add(light2.target)

       
            document.body.onkeydown = function(gantipos){
                if (gantipos.key == 'w'){
                   car.position.z += 3  
                   cameraFPS.position.z += 3
                   light.position.z += 3
                   light2.position.z += 3 
                }
                else if (gantipos.key == 's'){
                   car.position.z -= 3 
                   cameraFPS.position.z -= 3
                   light.position.z -= 3 
                   light2.position.z -= 3  
                 }
                if (gantipos.key == 'v'){
                    activecam = true
                    console.log(activecam)
                }
                if (gantipos.key == 'c'){
                activecam = false
                console.log(activecam)
            }
    
          }
       
        
    })
    
}


function generaterightlamps() {
    let bentuk, material, mesh

    //box
    // let loader = new THREE.TextureLoader()
    // let texture = loader.load('./textures/crate.png')

    // let texture_normal = loader.load('./textures/crate_normal.png')
    // bentuk = new THREE.BoxGeometry(2,2,2)
    // material = new THREE.MeshPhongMaterial({
    //     color: 0xFFFFFF,
    //     shininess: 30,
    //     //metalness: 1,
    //     //roughness: 0.5,
    //     specular: 0xff0000,
    //     map: texture,
    //     normalMap: texture_normal
    // })
    // mesh = new THREE.Mesh(bentuk, material)
    // mesh.position.x = 0
    // mesh.castShadow = true
    // scene.add(mesh)
    // meshes.push(mesh)

    //=======LAMPU========

    //lampu1
    bentuk = new THREE.CylinderGeometry(1,1,39,32)
    material = new THREE.MeshStandardMaterial({
        color: 0x43464B,
        roughness: 0.1,
        metalness: 0.6,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 16.5
    mesh.position.x = 25
    mesh.position.z = 125
    scene.add(mesh)


    
    bentuk = new THREE.CylinderGeometry(4,2,6,4)
    let wireframe = new THREE.WireframeGeometry(bentuk)
    let line = new THREE.LineSegments(wireframe)
    // /line.material.depthTest = false
    line.material.opacity = 0.25
    line.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 39
    mesh.position.x = 25
    line.position.y = 39
    line.position.x = 25
    line.position.z = 125

    scene.add(line)
    //scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(2,4,2,4)
    let wireframe2 = new THREE.WireframeGeometry(bentuk)
    let line2 = new THREE.LineSegments(wireframe2)
    // /line.material.depthTest = false
    line2.material.opacity = 0.25
    line2.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
   
    line2.position.y = 43
    line2.position.x = 25
    line2.position.z = 125

    scene.add(line2)

    //lampu 2
    bentuk = new THREE.CylinderGeometry(1,1,39,32)
    material = new THREE.MeshStandardMaterial({
        color: 0x43464B,
        roughness: 0.1,
        metalness: 0.6,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 16.5
    mesh.position.x = 25
    mesh.position.z = -156.5
    scene.add(mesh)


    
    bentuk = new THREE.CylinderGeometry(4,2,6,4)
    let wireframe3 = new THREE.WireframeGeometry(bentuk)
    let line3 = new THREE.LineSegments(wireframe3)
    // /line.material.depthTest = false
    line3.material.opacity = 0.25
    line3.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 39
    mesh.position.x = 25
    line3.position.y = 39
    line3.position.x = 25
    line3.position.z = -156.5

    scene.add(line3)
    //scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(2,4,2,4)
    let wireframe4 = new THREE.WireframeGeometry(bentuk)
    let line4 = new THREE.LineSegments(wireframe4)
    // /line.material.depthTest = false
    line4.material.opacity = 0.25
    line4.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
   
    line4.position.y = 43
    line4.position.x = 25
    line4.position.z = -156.5

    scene.add(line4)

    //lampu 3

    bentuk = new THREE.CylinderGeometry(1,1,39,32)
    material = new THREE.MeshStandardMaterial({
        color: 0x43464B,
        roughness: 0.1,
        metalness: 0.6,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 16.5
    mesh.position.x = 25
    mesh.position.z = -62.5
    scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(4,2,6,4)
    let wireframe5 = new THREE.WireframeGeometry(bentuk)
    let line5 = new THREE.LineSegments(wireframe5)
    // /line.material.depthTest = false
    line5.material.opacity = 0.25
    line5.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 39
    mesh.position.x = 25
    line5.position.y = 39
    line5.position.x = 25
    line5.position.z = -62.5

    scene.add(line5)
    //scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(2,4,2,4)
    let wireframe6 = new THREE.WireframeGeometry(bentuk)
    let line6 = new THREE.LineSegments(wireframe6)
    // /line.material.depthTest = false
    line6.material.opacity = 0.25
    line6.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
   
    line6.position.y = 43
    line6.position.x = 25
    line6.position.z = -62.5

    scene.add(line6)

    //lampu 4

    bentuk = new THREE.CylinderGeometry(1,1,39,32)
    material = new THREE.MeshStandardMaterial({
        color: 0x43464B,
        roughness: 0.1,
        metalness: 0.6,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 16.5
    mesh.position.x = 25
    mesh.position.z = 31.25
    scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(4,2,6,4)
    let wireframe7 = new THREE.WireframeGeometry(bentuk)
    let line7 = new THREE.LineSegments(wireframe7)
    // /line.material.depthTest = false
    line7.material.opacity = 0.25
    line7.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 39
    mesh.position.x = 25
    line7.position.y = 39
    line7.position.x = 25
    line7.position.z = 31.25

    scene.add(line7)
    //scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(2,4,2,4)
    let wireframe8 = new THREE.WireframeGeometry(bentuk)
    let line8 = new THREE.LineSegments(wireframe8)
    // /line.material.depthTest = false
    line8.material.opacity = 0.25
    line8.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
   
    line8.position.y = 43
    line8.position.x = 25
    line8.position.z = 31.25

    scene.add(line8)
}



function generateleftlamps(){

    let bentuk, material, mesh

     //=======LAMPU========

    //lampu1
    bentuk = new THREE.CylinderGeometry(1,1,39,32)
    material = new THREE.MeshStandardMaterial({
        color: 0x43464B,
        roughness: 0.1,
        metalness: 0.6,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 16.5
    mesh.position.x = -25
    mesh.position.z = 125
    scene.add(mesh)


    
    bentuk = new THREE.CylinderGeometry(4,2,6,4)
    let wireframe = new THREE.WireframeGeometry(bentuk)
    let line = new THREE.LineSegments(wireframe)
    // /line.material.depthTest = false
    line.material.opacity = 0.25
    line.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 39
    mesh.position.x = -25
    line.position.y = 39
    line.position.x = -25
    line.position.z = 125

    scene.add(line)
    //scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(2,4,2,4)
    let wireframe2 = new THREE.WireframeGeometry(bentuk)
    let line2 = new THREE.LineSegments(wireframe2)
    // /line.material.depthTest = false
    line2.material.opacity = 0.25
    line2.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
   
    line2.position.y = 43
    line2.position.x = -25
    line2.position.z = 125

    scene.add(line2)

    //lampu 2
    bentuk = new THREE.CylinderGeometry(1,1,39,32)
    material = new THREE.MeshStandardMaterial({
        color: 0x43464B,
        roughness: 0.1,
        metalness: 0.6,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 16.5
    mesh.position.x = -25
    mesh.position.z = -156.5
    scene.add(mesh)


    
    bentuk = new THREE.CylinderGeometry(4,2,6,4)
    let wireframe3 = new THREE.WireframeGeometry(bentuk)
    let line3 = new THREE.LineSegments(wireframe3)
    // /line.material.depthTest = false
    line3.material.opacity = 0.25
    line3.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 39
    mesh.position.x = 25
    line3.position.y = 39
    line3.position.x = -25
    line3.position.z = -156.5

    scene.add(line3)
    //scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(2,4,2,4)
    let wireframe4 = new THREE.WireframeGeometry(bentuk)
    let line4 = new THREE.LineSegments(wireframe4)
    // /line.material.depthTest = false
    line4.material.opacity = 0.25
    line4.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
   
    line4.position.y = 43
    line4.position.x = -25
    line4.position.z = -156.5

    scene.add(line4)

    //lampu 3

    bentuk = new THREE.CylinderGeometry(1,1,39,32)
    material = new THREE.MeshStandardMaterial({
        color: 0x43464B,
        roughness: 0.1,
        metalness: 0.6,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 16.5
    mesh.position.x = -25
    mesh.position.z = -62.5
    scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(4,2,6,4)
    let wireframe5 = new THREE.WireframeGeometry(bentuk)
    let line5 = new THREE.LineSegments(wireframe5)
    // /line.material.depthTest = false
    line5.material.opacity = 0.25
    line5.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 39
    mesh.position.x = 25
    line5.position.y = 39
    line5.position.x = -25
    line5.position.z = -62.5

    scene.add(line5)
    //scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(2,4,2,4)
    let wireframe6 = new THREE.WireframeGeometry(bentuk)
    let line6 = new THREE.LineSegments(wireframe6)
    // /line.material.depthTest = false
    line6.material.opacity = 0.25
    line6.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
   
    line6.position.y = 43
    line6.position.x = -25
    line6.position.z = -62.5

    scene.add(line6)

    //lampu 4

    bentuk = new THREE.CylinderGeometry(1,1,39,32)
    material = new THREE.MeshStandardMaterial({
        color: 0x43464B,
        roughness: 0.1,
        metalness: 0.6,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 16.5
    mesh.position.x = -25
    mesh.position.z = 31.25
    scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(4,2,6,4)
    let wireframe7 = new THREE.WireframeGeometry(bentuk)
    let line7 = new THREE.LineSegments(wireframe7)
    // /line.material.depthTest = false
    line7.material.opacity = 0.25
    line7.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 39
    mesh.position.x = 25
    line7.position.y = 39
    line7.position.x = -25
    line7.position.z = 31.25

    scene.add(line7)
    //scene.add(mesh)

    bentuk = new THREE.CylinderGeometry(2,4,2,4)
    let wireframe8 = new THREE.WireframeGeometry(bentuk)
    let line8 = new THREE.LineSegments(wireframe8)
    // /line.material.depthTest = false
    line8.material.opacity = 0.25
    line8.material.transparent = true
    material = new THREE.MeshPhongMaterial()
    mesh = new THREE.Mesh(bentuk, material)
    line8.castShadow = true
   
    line8.position.y = 43
    line8.position.x = -25
    line8.position.z = 31.25

    scene.add(line8)

}

function generatebulbs(){
    let bentuk, material, mesh, light, helper

    //=============================================
    //=============================================
    //==================K I R I====================

    //====1================

    bentuk = new THREE.SphereGeometry(2,32,32)
    material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.position.y = 40
    mesh.position.x = -25
    mesh.position.z = 31.25
    scene.add(mesh)

    light = new THREE.PointLight(0xffffff, 0.15)
    light.castShadow = true
    light.penumbra = 1
    light.position.x = -25
    light.position.y = 40
    light.position.z = 31.25
    scene.add(light)

    //helper= new THREE.PointLightHelper(light)
    scene.add(helper)
    //helpers.push(helper)



    //====2================

    bentuk = new THREE.SphereGeometry(2,32,32)
    material = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.position.y = 40
    mesh.position.x = -25
    mesh.position.z = -62.5
    scene.add(mesh)

    light = new THREE.PointLight(0xffffff, 0.15)
    light.castShadow = true
    light.penumbra = 1
    light.position.x = -25
    light.position.y = 40
    light.position.z = -62.5
    // mesh.position.y = 16.5
    // mesh.position.x = -25
    // mesh.position.z = -62.5
    
    scene.add(light)

    //helper= new THREE.PointLightHelper(light)
    scene.add(helper)
    //helpers.push(helper)



    //====3=================

    bentuk = new THREE.SphereGeometry(2,32,32)
    material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.position.y = 40
    mesh.position.x = -25
    mesh.position.z = -156.5
    scene.add(mesh)

    light = new THREE.PointLight(0xffffff, 0.15)
    light.castShadow = true
    light.penumbra = 1
    light.position.x = -25
    light.position.y = 40
    light.position.z = -156.5
    // mesh.position.y = 16.5
    // mesh.position.x = -25
    // mesh.position.z = -62.5
    scene.add(light)

    //helper= new THREE.PointLightHelper(light)
    scene.add(helper)
    //helpers.push(helper)



    //====4===================

    bentuk = new THREE.SphereGeometry(2,32,32)
    material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.position.y = 40
    mesh.position.x = -25
    mesh.position.z = 125
    scene.add(mesh)

    light = new THREE.PointLight(0xffffff, 0.15)
    light.castShadow = true
    light.penumbra = 1
    light.position.x = -25
    light.position.y = 40
    light.position.z = 125
    // mesh.position.y = 16.5
    // mesh.position.x = -25
    // mesh.position.z = -62.5
    scene.add(light)

    //helper= new THREE.PointLightHelper(light)
    scene.add(helper)
    //helpers.push(helper)






    //=============================================
    //=============================================
    //==================K A N A N==================



    //====1================

    bentuk = new THREE.SphereGeometry(2,32,32)
    material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.position.y = 40
    mesh.position.x = 25
    mesh.position.z = 31.25
    scene.add(mesh)

    light = new THREE.PointLight(0xffffff, 0.15)
    light.castShadow = true
    light.penumbra = 1
    light.position.x = 25
    light.position.y = 40
    light.position.z = 31.25
    scene.add(light)

    //helper= new THREE.PointLightHelper(light)
    scene.add(helper)
    //helpers.push(helper)



    //====2================

    bentuk = new THREE.SphereGeometry(2,32,32)
    material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.position.y = 40
    mesh.position.x = 25
    mesh.position.z = -62.5
    scene.add(mesh)

    light = new THREE.PointLight(0xffffff, 0.15)
    light.castShadow = true
    light.penumbra = 1
    light.position.x = 25
    light.position.y = 40
    light.position.z = -62.5
    // mesh.position.y = 16.5
    // mesh.position.x = -25
    // mesh.position.z = -62.5
    scene.add(light)

    //helper= new THREE.PointLightHelper(light)
    scene.add(helper)
    //helpers.push(helper)



    //====3=================

    bentuk = new THREE.SphereGeometry(2,32,32)
    material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.position.y = 40
    mesh.position.x = 25
    mesh.position.z = -156.5
    scene.add(mesh)

    light = new THREE.PointLight(0xffffff, 0.15)
    light.castShadow = true
    light.penumbra = 1
    light.position.x = 25
    light.position.y = 40
    light.position.z = -156.5
    // mesh.position.y = 16.5
    // mesh.position.x = -25
    // mesh.position.z = -62.5
    scene.add(light)

    //helper= new THREE.PointLightHelper(light)
    scene.add(helper)
    //helpers.push(helper)



    //====4===================

    bentuk = new THREE.SphereGeometry(2,32,32)
    material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.BackSide,
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.position.y = 40
    mesh.position.x = 25
    mesh.position.z = 125
    scene.add(mesh)

    light = new THREE.PointLight(0xffffff, 0.15)
    light.castShadow = true
    light.penumbra = 1
    light.position.x = 25
    light.position.y = 40
    light.position.z = 125
    // mesh.position.y = 16.5
    // mesh.position.x = -25
    // mesh.position.z = -62.5
    scene.add(light)

    //helper= new THREE.PointLightHelper(light)
    scene.add(helper)
    //helpers.push(helper)



}

function generatebuildingsright(){
    let bentuk, material, mesh

    let loader = new THREE.TextureLoader()
    let texturex = loader.load('./assets/building.jpg')
    let texturey = loader.load('./assets/building.jpg')
    let texturez = loader.load('./assets/building.jpg')
    let texture = loader.load('./assets/building.jpg')
    let texture2 = loader.load('./assets/building.jpg')
    let texture3 = loader.load('./assets/building.jpg')
    texture2.wrapS = THREE.RepeatWrapping
    texture2.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture3.wrapS = THREE.RepeatWrapping
    texture3.wrapT = THREE.RepeatWrapping
    texturex.wrapS = THREE.RepeatWrapping
    texturex.wrapT = THREE.RepeatWrapping
    texturey.wrapS = THREE.RepeatWrapping
    texturey.wrapT = THREE.RepeatWrapping
    texturez.wrapS = THREE.RepeatWrapping
    texturez.wrapT = THREE.RepeatWrapping
    texture.repeat.set(3, 4)
    texture2.repeat.set(3,2)
    texture3.repeat.set(3,3)
    texturex.repeat.set(0.6,2)
    texturey.repeat.set(0.6,4)
    texturez.repeat.set(0.6,3)
    

    // bentuk = new THREE.BoxGeometry(25, 120, 25)
    // material = new THREE.MeshStandardMaterial({
    //     //color: 0x43464B,
    //     map: texturex,
      
    // })
    // mesh = new THREE.Mesh(bentuk, material)
    // mesh.castShadow = true
    // mesh.position.y = 57
    // mesh.position.x = 75
    // mesh.position.z = -187.5
    // scene.add(mesh)

    //=========5x 120height buildings=============
    bentuk = new THREE.BoxGeometry(25, 120, 125)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texture,
      
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 57
    mesh.position.x = 75
    mesh.position.z = 189.5
    scene.add(mesh)

    //=========5x 60height buildings=============
    bentuk = new THREE.BoxGeometry(25, 60, 125)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texture2,
      
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 27
    mesh.position.x = 75
    mesh.position.z = 63.5
    scene.add(mesh)

    //=========5x 90height buildings=============
    bentuk = new THREE.BoxGeometry(25, 90, 125)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texture3,
        
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 42
    mesh.position.x = 75
    mesh.position.z = -62.5
    scene.add(mesh)

   
    //=========60height buildings=============
    bentuk = new THREE.BoxGeometry(25, 60, 25)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texturex,
      
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 27
    mesh.position.x = 75
    mesh.position.z = -138.5
    scene.add(mesh)
     //=========60height buildings=============
     bentuk = new THREE.BoxGeometry(25, 60, 25)
     material = new THREE.MeshStandardMaterial({
         //color: 0x43464B,
         map: texturex,
       
     })
     mesh = new THREE.Mesh(bentuk, material)
     mesh.castShadow = true
     mesh.position.y = 27
     mesh.position.x = 75
     mesh.position.z = -163.5
     scene.add(mesh)
     //=========60height buildings=============
     bentuk = new THREE.BoxGeometry(25, 60, 25)
     material = new THREE.MeshStandardMaterial({
         //color: 0x43464B,
         map: texturex,
       
     })
     mesh = new THREE.Mesh(bentuk, material)
     mesh.castShadow = true
     mesh.position.y = 27
     mesh.position.x = 75
     mesh.position.z = -241
     scene.add(mesh)


    
    
    //=========120height building=============
    bentuk = new THREE.BoxGeometry(25, 120, 25)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texturey,
      
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 57
    mesh.position.x = 75
    mesh.position.z = -189.5
    scene.add(mesh)

    //=========90height building=============
    bentuk = new THREE.BoxGeometry(25, 90, 25)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texturez,
        
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 42
    mesh.position.x = 75
    mesh.position.z = -215
    scene.add(mesh)



}

function generatebuildingsleft(){
    let bentuk, material, mesh

    let loader = new THREE.TextureLoader()
    let texturex = loader.load('./assets/building.jpg')
    let texturey = loader.load('./assets/building.jpg')
    let texturez = loader.load('./assets/building.jpg')
    let texture = loader.load('./assets/building.jpg')
    let texture2 = loader.load('./assets/building.jpg')
    let texture3 = loader.load('./assets/building.jpg')
    texture2.wrapS = THREE.RepeatWrapping
    texture2.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture3.wrapS = THREE.RepeatWrapping
    texture3.wrapT = THREE.RepeatWrapping
    texturex.wrapS = THREE.RepeatWrapping
    texturex.wrapT = THREE.RepeatWrapping
    texturey.wrapS = THREE.RepeatWrapping
    texturey.wrapT = THREE.RepeatWrapping
    texturez.wrapS = THREE.RepeatWrapping
    texturez.wrapT = THREE.RepeatWrapping
    texture.repeat.set(3, 4)
    texture2.repeat.set(3,2)
    texture3.repeat.set(3,3)
    texturex.repeat.set(0.6,2)
    texturey.repeat.set(0.6,4)
    texturez.repeat.set(0.6,3)
    

    // bentuk = new THREE.BoxGeometry(25, 120, 25)
    // material = new THREE.MeshStandardMaterial({
    //     //color: 0x43464B,
    //     map: texturex,
      
    // })
    // mesh = new THREE.Mesh(bentuk, material)
    // mesh.castShadow = true
    // mesh.position.y = 57
    // mesh.position.x = 75
    // mesh.position.z = -187.5
    // scene.add(mesh)

    //=========5x 120height buildings=============
    bentuk = new THREE.BoxGeometry(25, 120, 125)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texture,
      
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 57
    mesh.position.x = -75
    mesh.position.z = 189.5
    scene.add(mesh)

    //=========5x 60height buildings=============
    bentuk = new THREE.BoxGeometry(25, 60, 125)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texture2,
      
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 27
    mesh.position.x = -75
    mesh.position.z = 63.5
    scene.add(mesh)

    //=========5x 90height buildings=============
    bentuk = new THREE.BoxGeometry(25, 90, 125)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texture3,
        
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 42
    mesh.position.x = -75
    mesh.position.z = -62.5
    scene.add(mesh)

   
    //=========60height buildings=============
    bentuk = new THREE.BoxGeometry(25, 60, 25)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texturex,
      
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 27
    mesh.position.x = -75
    mesh.position.z = -138.5
    scene.add(mesh)
     //=========60height buildings=============
     bentuk = new THREE.BoxGeometry(25, 60, 25)
     material = new THREE.MeshStandardMaterial({
         //color: 0x43464B,
         map: texturex,
       
     })
     mesh = new THREE.Mesh(bentuk, material)
     mesh.castShadow = true
     mesh.position.y = 27
     mesh.position.x = -75
     mesh.position.z = -163.5
     scene.add(mesh)
     //=========60height buildings=============
     bentuk = new THREE.BoxGeometry(25, 60, 25)
     material = new THREE.MeshStandardMaterial({
         //color: 0x43464B,
         map: texturex,
       
     })
     mesh = new THREE.Mesh(bentuk, material)
     mesh.castShadow = true
     mesh.position.y = 27
     mesh.position.x = -75
     mesh.position.z = -241
     scene.add(mesh)


    
    
    //=========120height building=============
    bentuk = new THREE.BoxGeometry(25, 120, 25)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texturey,
      
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 57
    mesh.position.x = -75
    mesh.position.z = -189.5
    scene.add(mesh)

    //=========90height building=============
    bentuk = new THREE.BoxGeometry(25, 90, 25)
    material = new THREE.MeshStandardMaterial({
        //color: 0x43464B,
        map: texturez,
        
    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.castShadow = true
    mesh.position.y = 42
    mesh.position.x = -75
    mesh.position.z = -215
    scene.add(mesh)



}

function generateplane(){
    let bentuk, material, mesh


    let loader = new THREE.TextureLoader()
    let texture = loader.load('./assets/asphalt.jpg')
    let texture2 = loader.load('./assets/road.jpg')
    texture2.wrapS = THREE.RepeatWrapping
    texture2.wrapT = THREE.RepeatWrapping
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(20, 20)
    texture2.repeat.set(1,8)


    //let repeat = new THREE.RepeatWrapping(20, 20)

    //let texture_normal = loader.load('./textures/crate_normal.png')
    bentuk = new THREE.PlaneGeometry(500, 500)
    material = new THREE.MeshStandardMaterial({
        color: 0xb5b5b5,
        side: THREE.DoubleSide,
        map:texture,
        
        

    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.rotation.x = -Math.PI/2
    mesh.position.y = 0
    mesh.receiveShadow = true
    scene.add(mesh)

    bentuk = new THREE.PlaneGeometry(30, 500)
    material = new THREE.MeshStandardMaterial({
        //color: 0xfffff,
        side: THREE.DoubleSide,
        map: texture2,

    })
    mesh = new THREE.Mesh(bentuk, material)
    mesh.rotation.x = -Math.PI/2
    mesh.position.y = 0.1
    mesh.receiveShadow = true
    scene.add(mesh)
    createText2("ST.",1,5)
    createText("ASHCRE", 1, 5)
    //textcreate()
}

let createText = (text, height, size) =>{
    let fontLoader = new THREE.FontLoader()
    fontLoader.load('./three.js/examples/fonts/helvetiker_regular.typeface.json', (font)=> {
        let geometry = new THREE.TextGeometry(text,{
            font: font,
            height:height,
            size:size
        })
        let material = new THREE.MeshStandardMaterial()

        let mesh = new THREE.Mesh(geometry, material)

        mesh.position.x = 14
        mesh.position.y = 0 
        mesh.position.z = 50

        mesh.rotation.y = 110

        mesh.castShadow = true
        mesh.receiveShadow = true

        scene.add(mesh)
    })
}

let createText2 = (text, height, size) =>{
    let fontLoader = new THREE.FontLoader()
    fontLoader.load('./three.js/examples/fonts/helvetiker_regular.typeface.json', (font)=> {
        let geometry = new THREE.TextGeometry(text,{
            font: font,
            height:height,
            size:size
        })
        let material = new THREE.MeshStandardMaterial()

        let mesh = new THREE.Mesh(geometry, material)

        mesh.position.x = 5
        mesh.position.y = 6 
        mesh.position.z = 50

        mesh.rotation.y = 110

        mesh.castShadow = true
        mesh.receiveShadow = true

        scene.add(mesh)
    })
}




function generateLight() {
    let light, helper 

    // light = new THREE.PointLight(0xffffff, 4)
    // light.distance = 3
    // light.position.y=2
    // scene.add(light)

    // light = new THREE.AmbientLight(0xffffff)
    // light.intensity = 0.5
    // scene.add(light)

    // light = new THREE.SpotLight(0xffffff,5)
    // light.angle = Math.PI / 5
    // light.position.y=5
    // light.castShadow = true
    // light.penumbra = 1
    // scene.add(light)

    // light = new THREE.SpotLight(0xffffff,0.8)
    // light.angle = Math.PI / 4
    // light.position.y=9
    // light.position.x=15
    // light.position.z=-3
    // light.castShadow = true
    // light.penumbra = 1
    // scene.add(light)

    
    light = new THREE.PointLight(0xF4F1C9)
    light.distance = 1000
    light.intensity = 0.5
    light.decay = 1.5
    light.position.set(0, 500, 250)
    scene.add(light)



    

    // light = new THREE.SpotLight(0xffffff,20)
    // light.angle = Math.PI / 30
    // light.position.y=-1
    // light.position.x=0
    // light.castShadow = true
    // light.penumbra = 1
    // scene.add(light)

    


    // light = new THREE.DirectionalLight(0xffffff, 0.5)
    // light.castShadow = true
    // scene.add(light)

    // helper= new THREE.PointLightHelper(light)
    // scene.add(helper)
    // helpers.push(helper)

    // helper= new THREE.DirectionalLightHelper(light)
    // //light.position.y = 8
    // //light.target = meshes[0]
    // scene.add(helper)
    // helpers.push(helper)



    // helper = new THREE.SpotLightHelper(light)
    // scene.add(helper)
    // helpers.push(helper)
}

function skybox(){

    let materialArray = []
    let texture_1 = new THREE.TextureLoader().load('./assets/cubemap/px.png')
    let texture_2 = new THREE.TextureLoader().load('./assets/cubemap/nx.png')
    let texture_3 = new THREE.TextureLoader().load('./assets/cubemap/py.png')
    let texture_4 = new THREE.TextureLoader().load('./assets/cubemap/ny.png')
    let texture_5 = new THREE.TextureLoader().load('./assets/cubemap/pz.png')
    let texture_6 = new THREE.TextureLoader().load('./assets/cubemap/nz.png')

    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_1}))
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_2}))
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_3}))
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_4}))
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_5}))
    materialArray.push(new THREE.MeshBasicMaterial({
        map: texture_6}))

        for(let i=0; i<6; i++)
            materialArray[i].side = THREE.BackSide

        let skyboxGeo = new THREE.BoxGeometry(500, 500, 500)
        let skybox = new THREE.Mesh(skyboxGeo, materialArray)
        skybox.position.y = 50
        scene.add(skybox)
}

function animate() {

    if(activecam){
        renderer.render(scene, cameraFPS)
    }
    else{
        renderer.render(scene, camera)
    }
    


    // document.body.onkeydown = function(ganticam){
    //     if (ganticam.key == 'v'){
    //         renderer.render(scene, cameraFPS)
    //         //activecam = false    
    //     }
        

    // }
    //renderer.render(scene, camera)
    //renderer.render(scene, cameraFPS)

    meshes.forEach(mesh => {
        mesh.rotation.x += 0.02
        mesh.rotation.z += 0.02
    })

    //gltf.scene.position.x += 0.02

    //camera.rotation.y +=0.02
    // document.body.onkeydown = function(ganticam){
    //     if (ganticam.key == 'v'){
    //         // camera.position.z = -2
    //         // camera.position.y = 2
    //         // camera.position.x = 2
                
    //     }
        

    // }



    helpers.forEach(helper => {
        helper.update()
    })

    lines.forEach(line=>{
        line.update()
    })


    requestAnimationFrame(animate)
}


init()
requestAnimationFrame(animate)

window.onresize = () => {
    let newW = innerWidth
    let newH = innerHeight

    renderer.setSize(newW, newH)

    camera.aspect = newW/newH
    camera.updateProjectionMatrix()
    cameraFPS.aspect = newW/newH
    cameraFPS.updateProjectionMatrix()
}