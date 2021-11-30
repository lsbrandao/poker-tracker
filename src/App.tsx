import { Route, Routes } from "react-router-dom";
import Login from "./views/LoginPage/Login";
import PlayingGroups from "./views/PlayingGroups/PlayingGroups";
import AuthProvider from "./contexts/Auth/AuthContext";
import RequireAuth from "./contexts/Auth/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/groups"
          element={
            <RequireAuth>
              <PlayingGroups />
            </RequireAuth>
          }
        />
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
