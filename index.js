import {
    WebGLRenderer,
    ShaderMaterial,
} from '//cdn.skypack.dev/three@0.130.1/'
import {
    FullScreenQuad,
} from '//cdn.skypack.dev/three@0.130.1/examples/jsm/postprocessing/Pass.js';
import {
    YouiPrecisionShader,
} from './src/YouiPrecisionShader.js';

let renderer, fsQuad;
init();

function init() {

    renderer = new WebGLRenderer();
    fsQuad = new FullScreenQuad( new ShaderMaterial( YouiPrecisionShader ) );

    const container = document.getElementById( 'canvas-container' );
    const containerWidth = container.clientWidth;
    container.appendChild( renderer.domElement );
    renderer.setSize( containerWidth, containerWidth );
    renderer.setPixelRatio( window.devicePixelRatio );

    renderer.getSize( fsQuad.material.uniforms.resolution.value );
    fsQuad.render( renderer );

}

