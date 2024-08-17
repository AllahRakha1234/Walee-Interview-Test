import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import '../App.css';

const AvatarApi = () => {
  const [image, setImage] = useState(null);
  const [effect, setEffect] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [customizing, setCustomizing] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [responseData, setResponseData] = useState(null); // State to store API response

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setImage(URL.createObjectURL(acceptedFiles[0]));
    }
  });

  const handleUpload = event => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleEffect = async () => {
    if (image) {
      const data = new FormData();
      console.log()
      data.append('image', image);
      data.append('type', effect || 'avatar');

      const options = {
        method: 'POST',
        url: 'https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation',
        headers: {
            'content-type': 'multipart/form-data',
          'x-rapidapi-key': '6915bf92a8mshec4bb53d1830633p1eff9ejsnae2dabc91de9',
          'x-rapidapi-host': 'cartoon-yourself.p.rapidapi.com'
        },
        data: data
      };

      try {
        const response = await axios.request(options);
        console.log('API Response:', response); // Print the entire response object to console
        const imageUrl = response.data.data.image_url
        setAvatar(imageUrl);
        setResponseData(response.data); // Store API response data
        setCustomizing(false);
        setApiError(null);
      } catch (error) {
        console.error('API Error:', error); // Print error details to console
        setApiError('Error processing image. Please try again.');
      }
    }
  };

  const handleCustomize = () => {
    setCustomizing(true);
  };

  const handleDownload = () => {
    if (avatar) {
      const link = document.createElement('a');
      link.href = avatar;
      link.download = 'avatar.png';
      document.body.appendChild(link); // Append link to body
      link.click(); // Trigger the download
      document.body.removeChild(link); // Remove link from body
    }
  };

  return (
    <div className="avatar-api">
      <h1>Avatar Creation Module</h1>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select one</p>
      </div>
      <input type="file" onChange={handleUpload} />
      
      {image && !customizing && (
        <div className="buttons-container">
          <select value={effect} onChange={e => setEffect(e.target.value)} className="effect-dropdown">
            <option value="">Select an effect</option>
            <option value="pixar">Pixar</option>
            <option value="pixar_plus">Pixar Pro</option>
            <option value="3d_cartoon">3D cartoon</option>
            <option value="angel">Angel</option>
            <option value="angel_plus">Angel Pro</option>
            <option value="demon">Demon</option>
            <option value="ukiyoe_cartoon">Ukiyo-e</option>
            <option value="bopu_cartoon">Popper</option>
            <option value="amcartoon">American Manga</option>
            <option value="western">Western</option>
            <option value="avatar">Avatar</option>
            <option value="famous">World famous paintings</option>
            <option value="jpcartoon">Japanese Manga (I)</option>
            <option value="jpcartoon_head">Japanese Manga (portrait)</option>
            <option value="hkcartoon">China Comics</option>
            <option value="classic_cartoon">Retro Cartoon</option>
            <option value="tccartoon">Moe Manga</option>
            <option value="anime">Japanese Manga (II)</option>
            <option value="3d">3D Effects</option>
            <option value="handdrawn">Hand-painted</option>
            <option value="sketch">Pencil drawing (I)</option>
            <option value="artstyle">Artistic effects</option>
            <option value="claborate">Chinese fine brushwork painting</option>
            <option value="hongkong">Hong Kong-style comic style</option>
            <option value="comic">Comic</option>
            <option value="animation3d">3D Animation</option>
            <option value="head">Pencil drawing (head)</option>
            <option value="full">Pencil drawing (II)</option>
            <option value="3d_game">3D game effects</option>
          </select>
          <button onClick={handleEffect}>Apply Effect</button>
        </div>
      )}
      
      {avatar && !customizing && (
        <div className="result-container">
          <img src={avatar} alt="Avatar" className="avatar-image" />
        </div>
      )}

      {apiError && <p className="error-message">{apiError}</p>}
    </div>
  );
};

export default AvatarApi;
