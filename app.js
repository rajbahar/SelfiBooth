
let fabricCanvas;
let canvas;
// Create a link element
const link = document.createElement('a');
function main() {
    const webcam = document.getElementById('webcam');
    canvas = document.getElementById('canvas');
    const photo = document.getElementById('photo');
    const takePhotoButton = document.getElementById('takePhotoButton');



    // Initialize Fabric.js canvas
    function initializeFabric() {
        fabricCanvas = new fabric.Canvas('fabric_canvas');
    }

    webcam.addEventListener('click', function () {
        webcam.play()
    }, false)

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    }).then(function (stream) {
        webcam.srcObject = stream
        webcam.play()
    })
        .catch(function (err) {
            console.log("An error has happened: " + err);
        })

    // Capture a photo
    takePhotoButton.addEventListener('click', function () {
        console.log('dd')
        const context = canvas.getContext('2d');
        canvas.width = webcam.videoWidth;
        canvas.height = webcam.videoHeight;
        context.drawImage(webcam, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/png');
        // photo.setAttribute('src', data);
        // photo.style.display = 'block';
        canvas.style.display = 'none';

        $('#editor-window').css('display', 'block');
        $('.camera-feed').css('display', 'none');

        initializeFabric();
        fabric.Image.fromURL(data, function (img) {
            let width = window.innerWidth;
            let height = window.innerHeight;
            fabricCanvas.setWidth(width);
            fabricCanvas.setHeight(height);
            fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
        });


    });

}

function setObject(value) {

    fabric.Image.fromURL(`images/${value}.png`, function (img) {
        let oImg = img.set({ left: 0, top: 0 }).scale(0.25);
        fabricCanvas.add(oImg);
    });
}

function onSaveClick() {
    const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1
    });


    link.href = dataURL;
    link.download = 'canvas.png';

    // Trigger the download by clicking the link
    link.click();
}

document.addEventListener('DOMContentLoaded', () => {
    main();
})