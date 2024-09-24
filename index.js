const fs = require('fs');

// Helper function to decode values
const decodeValue = (value, base) => parseInt(value, base);

// Lagrange Interpolation to find the constant term c
const lagrangeInterpolation = (points) => {
  let c = 0;

  for (let i = 0; i < points.length; i++) {
    let { x: xi, y: yi } = points[i];
    
    // Basis polynomial
    let Li = 1;
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        let { x: xj } = points[j];
        Li *= xj / (xj - xi);
      }
    }

    // Aggregate for y coefficients
    c += yi * Li;
  }

  return c;
};

// Main function to process the JSON input and find 'c'
const findConstantTerm = (jsonFilePath) => {
  const data = fs.readFileSync(jsonFilePath);
  const input = JSON.parse(data);

  const n = input.keys.n;
  const k = input.keys.k;

  const points = Object.keys(input)
    .filter(key => key !== 'keys')
    .map(key => {
      const { base, value } = input[key];
      return {
        x: parseInt(key),
        y: decodeValue(value, base)
      };
    });

  const c = lagrangeInterpolation(points);
  console.log('The constant term c is:', c);
};

// Run the function with the given JSON file path
findConstantTerm('input.json');