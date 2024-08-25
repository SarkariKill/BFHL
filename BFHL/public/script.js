document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dataForm');
    const jsonInput = document.getElementById('jsonInput');
    const errorMessage = document.getElementById('errorMessage');
    const dropdownContainer = document.getElementById('dropdownContainer');
    const responseOptions = document.getElementById('responseOptions');
    const responseContainer = document.getElementById('responseContainer');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputData = jsonInput.value;

        // Validate JSON
        let parsedData;
        try {
            parsedData = JSON.parse(inputData);
        } catch (error) {
            errorMessage.textContent = 'Invalid JSON format.';
            responseContainer.innerHTML = '';
            return;
        }

        // Clear previous errors
        errorMessage.textContent = '';

        // Post request to API
        try {
            const response = await fetch('/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsedData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // Show the dropdown and handle option change
            dropdownContainer.style.display = 'block';

            responseOptions.addEventListener('change', () => {
                const selectedOptions = Array.from(responseOptions.selectedOptions).map(option => option.value);
                renderResponse(result, selectedOptions);
            });

        } catch (error) {
            errorMessage.textContent = 'Error communicating with the server.';
            responseContainer.innerHTML = '';
        }
    });

    function renderResponse(result, selectedOptions) {
        const output = [];

        // Check if the result object contains the expected properties
        if (result.alphabets) {
            if (selectedOptions.includes('alphabets')) {
                output.push('<strong>Alphabets:</strong> ' + JSON.stringify(result.alphabets));
            }
        }
        if (result.numbers) {
            if (selectedOptions.includes('numbers')) {
                output.push('<strong>Numbers:</strong> ' + JSON.stringify(result.numbers));
            }
        }
        if (result.highest_lowercase_alphabet) {
            if (selectedOptions.includes('highestLowercaseAlphabet')) {
                output.push('<strong>Highest lowercase alphabet:</strong> ' + result.highest_lowercase_alphabet);
            }
        }

        // Render the result
        responseContainer.innerHTML = output.join('<br>');
    }
});
