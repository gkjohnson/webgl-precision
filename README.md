# webgl-precision

Webpage for computing and displaying a devices float, int, and uint precision for vertex and fragment shaders. Includes a test shader for visually determining floating point precision referenced from ARM community articles on floating point precision [part 1](https://community.arm.com/arm-community-blogs/b/graphics-gaming-and-vr-blog/posts/benchmarking-floating-point-precision-in-mobile-gpus) and [part 2](https://community.arm.com/arm-community-blogs/b/graphics-gaming-and-vr-blog/posts/benchmarking-floating-point-precision-in-mobile-gpus---part-ii). See the [computePrecision](https://github.com/gkjohnson/webgl-precision/blob/2a76ca43568cfa545c3cfcaefde97d7291beb9c9/src/ComputePrecisionShader.js#L3) function for more information on how the precision and number of bits are computed.

### Notes

- Floating point precision is computed by progressively adding smaller and smaller negative powers of 2 to 1.0 until they have no effect.
- Uint and Int bits are computed by shifting bits until the number rolls around to 0 or turns negative respectively.
- On some hardware the precision artifacts seem to be able to optimized out of the computations resulting in a perfect looking test screen that is not representative of the actual floating point precision.
- An additional small change was made to the test shader from the one referenced in part 2 of the above series of articles to remove the ability for compilers to optimize the operations away.
