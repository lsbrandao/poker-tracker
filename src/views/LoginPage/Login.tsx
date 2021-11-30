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

  const handleSubmit = (event: any) => {
    event.preventDefault();

    auth.signin(email, () => {
      navigate("/groups");
    });
  };

  const handleRegister = (event: any) => {
    event.preventDefault();

    console.log(`Register`);
    console.log(`The name you entered was: ${email}`);
  };

  return (
    <section className="page-container login-page-container">
      <div>
        <img src={BackgroundImage} alt="Poker Background" />
      </div>
      <div className="login-form-container">
        <h1>Easily track your poker games</h1>
        <form onSubmit={handleSubmit}>
          <label>
            E-mail
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="cta-container">
            {/* <button type="submit">Sign In</button> */}
            <CustomButton
              type="submit"
              buttonStyle={ButtonStyle.PRIMARY}
              children="Sign In"
            ></CustomButton>
            <a href="/" onClick={handleRegister}>
              Register
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
