import { useState } from "react";
import "./Login.scss";
import BackgroundImage from "../../assets/login-bg.svg";
import CustomButton, {
  ButtonStyle,
} from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = (event: any) => {
    event.preventDefault();
    auth.signin(email, password, () => {
      navigate("/groups");
    });
  };

  const handleRegister = (event: any) => {
    event.preventDefault();
    auth.signup(email, password, () => {
      navigate("/groups");
    });
  };

  return (
    <section className="page-container login-page-container">
      <div>
        <img src={BackgroundImage} alt="Poker Background" />
      </div>
      <div className="login-form-container">
        <h1>Easily track your poker games</h1>
        <form onSubmit={handleLogin}>
          <div className="label-container">
            <label className="primary-color">
              E-mail
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="label-container">
            <label className="primary-color">
              Password
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="cta-container">
            <CustomButton
              type="submit"
              buttonStyle={ButtonStyle.PRIMARY}
              children="Sign In"
            />
            <button className="link-btn primary-color" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
