// import React, { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';

// const AvatarGenerator = () => {
//   const [loading, setLoading] = useState(true);
//   const [detections, setDetections] = useState([]);
//   const imageRef = useRef(null);

//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
//         setLoading(false);
//         console.log('Model loaded successfully!');
//       } catch (error) {
//         console.error('Error loading models:', error);
//         setLoading(false);
//       }
//     };

//     loadModels();
//   }, []);

//   const handleImageLoad = async () => {
//     if (imageRef.current) {
//       try {
//         const detections = await faceapi.detectAllFaces(imageRef.current, new faceapi.SsdMobilenetv1Options());
//         setDetections(detections);
//         console.log('Detections:', detections);
//       } catch (error) {
//         console.error('Error detecting faces:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     if (!loading) {
//       handleImageLoad();
//     }
//   }, [loading]);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading model...</p>
//       ) : (
//         <>
//           <img
//             ref={imageRef}
//             src="ar.jpg" // Replace with your image source
//             alt="Input"
//             crossOrigin="anonymous"
//             style={{ display: 'none' }}
//             onLoad={handleImageLoad}
//           />
//           <ul>
//             {detections.map((detection, index) => (
//               <li key={index}>
//                 {`Box: [${detection.box.x.toFixed(2)}, ${detection.box.y.toFixed(2)}, ${detection.box.width.toFixed(2)}, ${detection.box.height.toFixed(2)}]`}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default AvatarGenerator;
