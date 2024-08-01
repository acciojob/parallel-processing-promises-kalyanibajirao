// Sample array of image URLs
const images = [
    { url: 'https://example.com/image1.jpg' },
    { url: 'https://example.com/image2.jpg' },
    { url: 'https://example.com/image3.jpg' }
];

// Function to download an image and return a promise
function downloadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;

        // On success, resolve the promise with the image element
        img.onload = () => resolve(img);

        // On failure, reject the promise with an error message
        img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
    });
}

// Event listener for the button click
document.getElementById('download-images-button').addEventListener('click', () => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear any previous content

    // Create an array of promises for downloading images
    const downloadPromises = images.map(downloadImage);

    // Use Promise.all to wait for all promises to resolve
    Promise.all(downloadPromises)
        .then(images => {
            // All images downloaded successfully, display them
            images.forEach(img => outputDiv.appendChild(img));
        })
        .catch(error => {
            // If any image fails to download, show the error message
            outputDiv.textContent = error.message;
        });
});
