
import UploadImg from "./Components/UploadImg";
import AvatarGenerator from "./Components/AvatarGenerator";
import MagicEffect from "./Components/MagicEffect";
import AvatarCustomization from "./Components/AvatarCustomization";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Avatarapi from "./Components/Avatarapi"; // Import the AvatarApi component
function App() {
  return (
    <div className="mt-5">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploadimg" element={ <UploadImg />} />
          <Route path="/avatarapi" element={ <Avatarapi />} />
          {/* <Route path="/avatargenerator" element={ <AvatarGenerator />} /> */}
          {/* <Route path="/magiceffect" element={ <MagicEffect />} />
          <Route path="/avatarcustom" element={ <AvatarCustomization />} /> */}

        </Routes>
      </Router>
    
    </div>
  );
}

export default App;
