import { Route, Routes } from "react-router-dom";
import Login from './views/LoginPage/Login';
import PlayingGroups from './views/PlayingGroups/PlayingGroups';
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/groups" element={<PlayingGroups />} />
        {/* <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="dashboard" element={<Dashboard />} /> */}

        {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </AuthProvider>

  );
}

export default App;
