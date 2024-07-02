const imageUrls = [
  { url: 'https://via.placeholder.com/150' },
  { url: 'https://via.placeholder.com/200' },
  { url: 'https://via.placeholder.com/250' },
  { url: 'https://via.placeholder.com/300' },
];

document.getElementById('download-images-button').addEventListener('click', () => {
  downloadImages(imageUrls)
    .then(displayImages)
    .catch(error => {
      document.getElementById('output').textContent = error;
    });
});

function downloadImages(urls) {
  const promises = urls.map(image => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
    });
  });
  
  return Promise.all(promises);
}

function displayImages(images) {
  const output = document.getElementById('output');
  output.innerHTML = '';
  images.forEach(img => {
    output.appendChild(img);
  });
}
