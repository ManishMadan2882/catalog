const fs = require('fs');

fs.readFile('input.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const testCase = JSON.parse(data);

    // Function to decode the base-encoded values
    const decodeValue = (value, base) => {
        return parseInt(value, base);
    };

    // Extracting keys n and k
    const n = testCase.keys.n;
    const k = testCase.keys.k;

    // Prepare arrays to store the x and y values
    const points = [];

    // Collect the points (x, y) from the JSON
    Object.keys(testCase).forEach(key => {
        if (key !== "keys") {
            const base = parseInt(testCase[key].base, 10); 
            const value = testCase[key].value;
            const decodedValue = decodeValue(value, base);
            const x = parseInt(key, 10);  // The key serves as x
            points.push({ x: x, y: decodedValue });
        }
    });

    // Log the points for verification
    console.log('Decoded points (x, y):', points);

    // Function to apply Lagrange Interpolation to find the constant term c (f(0))
    const lagrangeInterpolation = (points) => {
        let result = 0;

        for (let i = 0; i < points.length; i++) {
            let term = points[i].y;

            for (let j = 0; j < points.length; j++) {
                if (i !== j) {
                    term *= (0 - points[j].x) / (points[i].x - points[j].x);
                }
            }

            result += term;
        }

        return result;
    };

    // Solve for the constant term c using Lagrange Interpolation
    const constantTermC = lagrangeInterpolation(points.slice(0, k));

    // Output the constant term c
    console.log('The constant term c of the polynomial is:', constantTermC);
});