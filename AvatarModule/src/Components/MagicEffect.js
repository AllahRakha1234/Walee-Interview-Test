// import React, { useRef, useEffect, useState } from 'react';
// import * as faceapi from 'face-api.js';

// const FaceEffect = () => {
//   const [imageSrc, setImageSrc] = useState(null);
//   const [effectApplied, setEffectApplied] = useState(null);
//   const imageRef = useRef(null);

//   useEffect(() => {
//     // Load face-api models
//     const loadModels = async () => {
//       await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
//       await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//       await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
//     };
//     loadModels();
//   }, []);

//   const applyEffects = async () => {
//     const detections = await faceapi.detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
//     // Process the detections and apply effects (custom logic)
//     // For demo, simply draw face landmarks on the canvas
//     const canvas = faceapi.createCanvasFromMedia(imageRef.current);
//     document.body.append(canvas);
//     faceapi.matchDimensions(canvas, imageRef.current);
//     const resizedDetections = faceapi.resizeResults(detections, imageRef.current);
//     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//     setEffectApplied(canvas.toDataURL());
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => setImageSrc(reader.result);
//     if (file) reader.readAsDataURL(file);
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg mt-10">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Magic Face Effects</h2>
//       <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
//       {imageSrc && (
//         <div>
//           <img ref={imageRef} src={imageSrc} alt="Face" className="border border-gray-300 rounded-lg mb-4" />
//           <button onClick={applyEffects} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
//             Apply Magic Effects
//           </button>
//           {effectApplied && (
//             <div>
//               <h3 className="text-xl font-medium mb-2">Image with Effect:</h3>
//               <img src={effectApplied} alt="Effect Applied" className="border border-gray-300 rounded-lg" />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaceEffect;
