document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        const formData = new FormData();
        formData.append('file', file); // Append the file

        // Use fetch API to send the file to the ESP32
        fetch('/upload', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        }).then(data => {
            document.getElementById('uploadStatus').innerHTML = `${file.name} uploaded successfully!`;

            // After the file has been uploaded successfully
            fetch('/send-to-avr')
            .then(response => response.text())
            .then(data => {
            console.log(data);
            // Update the UI to show that the file is being sent to the AVR
            })
            .catch(error => console.error('Error sending file to AVR:', error));

        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('uploadStatus').innerHTML = "Upload failed.";
        });

        
    } else {
        document.getElementById('uploadStatus').innerHTML = "Please select a file first.";
    }
});
