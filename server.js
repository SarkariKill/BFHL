const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/bfhl', (req, res) => {
    res.send({ "operation code" : 1 });
});

// POST request handler for /bfhl
app.post('/bfhl', (req, res) => {
    const data = req.body.data;

    // Validate input
    if (!Array.isArray(data)) {
        return res.status(400).json({
            "is_success": false,
            "user_id": "aditya_sarkar_18032004",
            "email" : "adi.sarkar2004@gmail.com",
            "roll_number" : "21BEC0867",
        });
    }

    // Initialize result arrays and variables
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;

    // Process the data array
    data.forEach(item => {
        if (!isNaN(item) && item.trim() !== '') {
            // Item is a number
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            // Item is a single alphabet character
            alphabets.push(item);

            // Update highest lowercase alphabet
            if (item === item.toLowerCase()) {
                if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
                    highestLowercaseAlphabet = item;
                }
            }
        }
    });

    // Prepare highest lowercase alphabet as an array with a single element
    const highestLowercaseAlphabetArray = highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [];

    // Send the response
    res.json({
        "is_success": true,
        "user_id": "aditya_sarkar_18032004",
        "email" : "adi.sarkar2004@gmail.com",
        "roll_number" : "21BEC0867",
        "numbers" : numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet" : highestLowercaseAlphabetArray
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
