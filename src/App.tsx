import { Route, Routes } from "react-router-dom";
import Login from "./views/LoginPage/Login";
import PlayingGroups from "./views/PlayingGroups/PlayingGroups";
import { AuthProvider } from "./contexts/Auth/AuthContext";
import RequireAuth from "./contexts/Auth/RequireAuth";

import { UserProvider } from "./contexts/UserContext/UserContext";
import EditGroup from "./views/EditGroup/EditGroup";
import Layout from "./components/Layout/Layout";
import MonthlyHistory from "./views/MonthlyHistory/MonthlyHistory";

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <RequireAuth>
              <Layout />
            </RequireAuth>}>
            <Route path="/groups" element={<PlayingGroups />} />
            <Route path="/edit-groups" element={<EditGroup />} />
            <Route path="/edit-groups" element={<EditGroup />} />
            <Route path="/months" element={<MonthlyHistory />} />
          </Route>
          {/* <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="dashboard" element={<Dashboard />} /> */}

          {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
