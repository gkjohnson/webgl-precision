const computePrecisionFunction = /* glsl */`

    float computePrecision() {

        #if MODE == 0 // float

            float eps = 1.0;
            float exponent = 0.0;
            while ( 1.0 + ( eps / 2.0 ) > 1.0 ) {

                eps = eps / 2.0;
                exponent ++;

            }

            return exponent;


        #elif MODE == 1 // int

            int v = 1;
            int bits = 0;
            while ( v > 0 ) {

                v = v << 1;
                v = v | 1;
                bits ++;

            }

            return float( bits );

        #else // uint

            uint v = 1;
            int bits = 0;
            while ( v > 0 ) {

                v = v << 1u;
                bits ++;

            }

            return float( bits );

        #endif

    }


`;

export const ComputePrecisionShader = {

    defines: {
        MODE: 0,
    },

    vertexShader: /* glsl */`

        ${ computePrecisionFunction }

        varying float vPrecision;
        void main() {

            vec4 mvPosition = vec4( position, 1.0 );
            mvPosition = modelViewMatrix * mvPosition;
            gl_Position = projectionMatrix * mvPosition;

            vPrecision = computePrecision();

        }

    `,

    fragmentShader: /* glsl */`

        ${ computePrecisionFunction }

        varying float vPrecision;
        void main( void ) {

            float fPrecision = computePrecision();
            gl_FragColor = vec4( vPrecision, fPrecision );

        }

    `,
};
