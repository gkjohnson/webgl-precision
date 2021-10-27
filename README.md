# webgl-precision

Webpage for computing and displaying a devices float, int, and uint precision for vertex and fragment shaders. Includes a test shader for visually determining floating point precision referenced from ARM community articles on floating point precision [part 1](https://community.arm.com/arm-community-blogs/b/graphics-gaming-and-vr-blog/posts/benchmarking-floating-point-precision-in-mobile-gpus) and [part 2](https://community.arm.com/arm-community-blogs/b/graphics-gaming-and-vr-blog/posts/benchmarking-floating-point-precision-in-mobile-gpus---part-ii). See the [computePrecision](https://github.com/gkjohnson/webgl-precision/blob/9ccdb9345c07d4ee919e01f4933ef77c23fa1b38/src/ComputePrecisionShader.js#L15) function for more information on how the precision and number of bits are computed.

### Notes

- Floating point precision is computed by progressively adding smaller and smaller negative powers of 2 to 1.0 until they have no effect.
- Uint and Int bits are computed by shifting bits until the number rolls around to 0 or turns negative respectively.
- On some hardware the precision artifacts seem to be able to optimized out of the computations resulting in a perfect looking test screen that is not representative of the actual floating point precision.
- Shader precision for floats and ints are set to "highp" for the renderer.
