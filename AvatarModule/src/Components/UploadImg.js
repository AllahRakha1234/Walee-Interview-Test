import React, { useState } from 'react';
import Webcam from 'react-webcam';

const ImageCaptureUpload = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const webcamRef = React.useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = (src, filename) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    link.click();
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Capture or Upload Image</h2>
      <div className="flex flex-col items-center">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="mb-4 border border-gray-300 rounded-lg"
          width={320}
          height={240}
        />
        <button
          onClick={captureImage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 mb-6"
        >
          Capture Image
        </button>
      </div>
      {imageSrc && (
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Captured Image:</h3>
          <img src={imageSrc} alt="Captured" className="border border-gray-300 rounded-lg mb-2" />
          <button
            onClick={() => downloadImage(imageSrc, 'captured-image.jpg')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Download Captured Image
          </button>
        </div>
      )}
      <div className="mb-4">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="border border-gray-300 rounded-lg px-2 py-1"
        />
      </div>
      {uploadImage && (
        <div>
          <h3 className="text-xl font-medium mb-2">Uploaded Image:</h3>
          <img src={uploadImage} alt="Uploaded" className="border border-gray-300 rounded-lg mb-2" />
          <button
            onClick={() => downloadImage(uploadImage, 'uploaded-image.jpg')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Download Uploaded Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCaptureUpload;
