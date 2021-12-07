import { useContext, useState, createContext } from "react";
import { useUserUpdate } from "../UserContext/UserContext";

interface AuthContextType {
  user: { message: string, username: string, id: string };
  signup: (email: string, password: string, callback: VoidFunction) => void;
  signin: (email: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

//Creating contexts
const AuthContext = createContext<AuthContextType>(null!);

//Exposing custom hooks
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const { loadPlayingGroups } = useUserUpdate();

  const signup = async (email: string, password: string, callback: VoidFunction) => {
    const body = {
      username: email, password
    }
    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setUser(data);
          loadPlayingGroups(data.id)
          callback();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const signin = async (email: string, password: string, callback: VoidFunction) => {
    const body = {
      username: email, password
    }
    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setUser(data);
          loadPlayingGroups(data.id)
          callback();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const signout = async (callback: VoidFunction) => {
    fetch('http://localhost:3000/users/logout')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (!data.error) {
          setUser(null);
          callback();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const value = { user, signup, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



