# webgl-precision
Tool for computing a devices float, int, and uint precision for vertex and fragment shaders.

### TODO

- Create shader to compute bits of float and int precision in both vertex and fragment shader.
  - Float precision can be computed by iterative checking `2 ** - n` added to 1 until it has no effect.
  - Int / Uint precesion can be determined by bit shifting 1 until it rolls to 0 or a negative number.
- Renders to int buffer.
- Read buffer back to CPU to get precesion values.
