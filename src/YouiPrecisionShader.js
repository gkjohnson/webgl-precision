import { Vector2 } from '//cdn.skypack.dev/three@0.130.1/';

export const YouiPrecisionShader = {

    defines: {
        RNE_FIX: 1,
    },

    uniforms: {
        resolution: { value: new Vector2() },
    },

    vertexShader: /* glsl */`

        varying vec2 vUv;
        void main() {

            vec4 mvPosition = vec4( position, 1.0 );
            mvPosition = modelViewMatrix * mvPosition;
            gl_Position = projectionMatrix * mvPosition;

            vUv = uv;

        }

    `,

    fragmentShader: /* glsl */`

        // https://community.arm.com/arm-community-blogs/b/graphics-gaming-and-vr-blog/posts/benchmarking-floating-point-precision-in-mobile-gpus
        // Youi Labs GPU precision shader (slightly modified)
        uniform vec2 resolution;
        void main( void ) {

            #if RNE_FIX == 0

                // Original Shader
                float y = ( gl_FragCoord.y / resolution.y ) * 26.0;
                float x = 1.0 - ( gl_FragCoord.x / resolution.x );
                float b = fract( pow( 2.0, floor( y ) ) + x );
                if( fract( y ) >= 0.9 ) {

                    b = 0.0;

                }
                gl_FragColor = vec4( b, b, b, 1.0 );

            #else

                // Shader with RTZ artifact fixed
                float y = ( gl_FragCoord.y / resolution.y ) * 26.0;
                float x = 1.0 - ( gl_FragCoord.x / resolution.x );
                float p = pow( 2.0, floor( y ) );
                float b = p + x;
                if( fract( y ) >= 0.9 ) {

                        b = 0.0;

                }

                // moving this p subtraction after the previous condition removes
                // the ability for the compiler to optimize the precision issue away.
                b -= p;

                if( fract( y ) >= 0.9 ) {

                    b = 0.0;

                }

                gl_FragColor = vec4( b, b, b, 1.0 );

            #endif

        }

    `,
};
