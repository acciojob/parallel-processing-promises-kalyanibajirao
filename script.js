const images = [
    { url: 'https://picsum.photos/id/237/200/300' },
    { url: 'https://picsum.photos/id/238/200/300' },
    { url: 'https://picsum.photos/id/239/200/300' }
];

function downloadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;

        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
    });
}

document.getElementById('download-images-button').addEventListener('click', () => {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous content

    const downloadPromises = images.map(downloadImage);

    Promise.all(downloadPromises)
        .then(images => {
            images.forEach(img => outputDiv.appendChild(img));
        })
        .catch(error => {
            outputDiv.textContent = error.message;
        });
});
