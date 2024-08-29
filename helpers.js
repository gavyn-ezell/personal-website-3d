import * as THREE from 'three';

const UP = new THREE.Vector3(0,1,0)
const text = [
    "GAVYN'S VOYAGE", 
    "I’m Gavyn.\nI’m a software engineer who was born and raised on the beautiful island of Oahu, Hawaii.\nI love the beach, playing the piano, and video games.",
    "I traveled to California to complete a bachelor’s degree in Computer Science.\nI attended the University of California – San Diego,\nand participated in clubs like ACM, Triton Gaming, and VGDC.",
    "I gained experience writing backend software through projects and internships.\nI also have a second interest in computer graphics and games!",
    "Thanks for cruising! Feel free to connect or learn about me!"
]
export const generateCloudTransformation = (matrix) => {

    let r = 500;
    let theta = Math.random()  * -2 * Math.PI;
    let phi = Math.acos(Math.random()  * 0.7 + 0.08);
    
    matrix.makeTranslation( r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

export const generateWindLinePosition = (windLine, boatX) => {

    let r = Math.random() * 0.15;
    let theta = Math.random() * 2 * Math.PI;
    
    windLine.position.set(-(Math.random() * 10 + 20), 4 + r * Math.sin(theta), -7 + sigmoidPath(boatX) + r * Math.cos(theta));
}

export const waveFunction = (inx, inz, iTime) => 
{
    let x = inx + iTime;
	let z = inz + iTime;
	let y = 0.08*(Math.sin(0.2*x + 0.4*z) + 2.0 * Math.sin(0.1*x - 0.2*z));

    return y;
}

export const sigmoidPath = (x) => 
    {
        return 35.0*((1.0)/(1.0 + Math.E**(-0.15*(x-12))))
    }

export const calculateBoatPosition = (x, time) =>
{
    let result = new THREE.Vector3();
    result.x = x
    result.z = sigmoidPath(x)
    result.y = waveFunction(x,result.z, time)-0.1
    return result
}

export const calculateBoatOrientation = (curr, x, time, orientation) => 
    {
        let vec = calculateBoatPosition(x+0.1, time)
        vec.sub(curr)
        vec.normalize()
        vec.applyAxisAngle(UP, -Math.PI/2-(1-orientation)*(Math.PI))
        curr.add(vec)
    }

export const calculateCameraPosition = (curr, x, time) =>
{
    let vec = calculateBoatPosition(x+0.001, time)
    vec.sub(curr)
    vec.normalize()
    vec.applyAxisAngle(UP, -Math.PI/2)
    vec.multiplyScalar(6)
    curr.add(vec)
}

export const calculateCameraLook = (cameraPos, boatPos) =>
{
    let vec
}

export const calculateSharkPosition = (r, center, time) =>
    {
        let result = new THREE.Vector3();
        result.x = center.x + r*Math.cos(0.6*time)
        result.z = center.z + r*Math.sin(0.6*time)
        result.y = center.y + waveFunction(result.x, result.z, time)
        return result
    }

export const calculatePlanePosition = (r, center, time) =>
    {
        let result = new THREE.Vector3();
        result.x = center.x + r*Math.cos(0.6*time)
        result.z = center.z + r*Math.sin(0.6*time)
        result.y = center.y + Math.cos(0.6*time)
        return result
    }

export const changeText = (voyageText, x) => {
    voyageText.style.fontSize = "1.6vmax"
    voyageText.style.top = "15vh"
    switch (true) {
        //TITLE
        case x >= -20 && x < -10.48:
            voyageText.style.fontSize = "9vmax"
            voyageText.style.top = "28vh"
            voyageText.style.opacity = (-10.48 - x) / (9.52)
            voyageText.innerText = text[0]
            break;
        //ISLAND 1
        case x >= -10.48 && x < -0.967:
            voyageText.style.opacity = (x -(-10.49)) / (9.51)
            voyageText.innerText = text[1]
            break;
        case x >= -0.967 && x < 5.8:
            voyageText.style.opacity = (5.8-x) / (6.76)
            voyageText.innerText = text[1]
            break;
        //CALIFORNIA
        case x >= 5.8 && x < 11.13:
            voyageText.style.opacity = (x-5.8) / (5.33)
            voyageText.innerText = text[2]
            break;
        case x >= 11.13 && x < 16.475:
            voyageText.style.opacity = (16.475-x) / (5.34)
            voyageText.innerText = text[2]
            break;
        //OILRIG
        case x >= 16.475 && x < 22.51:
            voyageText.style.opacity = (x-16.475) / (6.035)
            voyageText.innerText = text[3]
            break;
        case x >= 22.51 && x < 30.8:
            voyageText.style.opacity = (30.8-x) / (8.29)
            voyageText.innerText = text[3]
            break;
        default:
            voyageText.style.opacity = (x-30.8) / (8.7)
            voyageText.innerText = text[4]
            break;
        
        }
}


