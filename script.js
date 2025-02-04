function invertColors(imageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];       // Invert Red
        data[i + 1] = 255 - data[i + 1]; // Invert Green
        data[i + 2] = 255 - data[i + 2]; // Invert Blue
    }
    return imageData;
}

function processImage(file, index) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            let imageData = ctx.getImageData(0, 0, img.width, img.height);
            imageData = invertColors(imageData);
            ctx.putImageData(imageData, 0, 0);
            
            canvas.toBlob(function(blob) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = file.name;
                link.click();
            }, 'image/jpeg');
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function invertImages() {
    const files = Array.from(document.getElementById('fileInput').files);
    files.sort((a, b) => a.name.localeCompare(b.name));  // Sort files by name

    if (files.length === 0) return;

    files.forEach(file => {
        processImage(file);
    });
}
