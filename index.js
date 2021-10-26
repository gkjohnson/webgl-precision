import {
    WebGLRenderer,
    ShaderMaterial,
    WebGLRenderTarget,
    RGBAFormat,
    FloatType,
} from '//cdn.skypack.dev/three@0.130.1/'
import {
    FullScreenQuad,
} from '//cdn.skypack.dev/three@0.130.1/examples/jsm/postprocessing/Pass.js';
import {
    YouiPrecisionShader,
} from './src/YouiPrecisionShader.js';
import {
    ComputePrecisionShader,
} from './src/ComputePrecisionShader.js';

let renderer, fsQuad, rneCanvasCheckbox;
init();

function init() {

    renderer = new WebGLRenderer();
    fsQuad = new FullScreenQuad( new ShaderMaterial( YouiPrecisionShader ) );

    rneCanvasCheckbox = document.getElementById( 'rne-checkbox' );
    rneCanvasCheckbox.addEventListener( 'change', () => {

        updateCanvas();

    } );

    const container = document.getElementById( 'canvas-container' );
    const containerWidth = container.clientWidth;
    container.appendChild( renderer.domElement );
    renderer.setSize( containerWidth, containerWidth );
    renderer.setPixelRatio( window.devicePixelRatio );

    const floatPrecision = extractPrecision( renderer, 0 );
    document.querySelector( '#float-row .vertex').innerHTML = floatPrecision.vertex;
    document.querySelector( '#float-row .fragment').innerHTML = floatPrecision.fragment;

    const intPrecision = extractPrecision( renderer, 1 );
    document.querySelector( '#int-row .vertex').innerHTML = intPrecision.vertex + 1;
    document.querySelector( '#int-row .fragment').innerHTML = intPrecision.fragment + 1;

    const uintPrecision = extractPrecision( renderer, 2 );
    document.querySelector( '#uint-row .vertex').innerHTML = uintPrecision.vertex;
    document.querySelector( '#uint-row .fragment').innerHTML = uintPrecision.fragment;

    const gl = renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if ( debugInfo ) {

        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        document.getElementById( 'renderer-info' ).innerText = renderer;

    } else {

        document.getElementById( 'renderer-info' ).innerText = 'UNMASKED_RENDERER_WEBGL extension unavailable.';

    }

    updateCanvas();

}

function extractPrecision( renderer, mode ) {

    const fsQuad = new FullScreenQuad( new ShaderMaterial( ComputePrecisionShader ) );
    const rt = new WebGLRenderTarget( 1, 1 );

    const ogRT = renderer.getRenderTarget();
    fsQuad.material.defines.MODE = mode;
    renderer.setRenderTarget( rt );
    fsQuad.render( renderer );
    renderer.setRenderTarget( ogRT );

    const readBuffer = new Uint8Array( 4 );
    renderer.readRenderTargetPixels( rt, 0, 0, 1, 1, readBuffer );

    fsQuad.dispose();
    rt.dispose();

    return {

        vertex: readBuffer[ 0 ],
        fragment: readBuffer[ 1 ],

    };

}

function updateCanvas() {

    const isChecked = rneCanvasCheckbox.checked;

    fsQuad.material.defines.RNE_FIX = Number( isChecked );
    renderer.getSize( fsQuad.material.uniforms.resolution.value ).multiplyScalar( window.devicePixelRatio );

    fsQuad.material.needsUpdate = true;
    fsQuad.render( renderer );

}
