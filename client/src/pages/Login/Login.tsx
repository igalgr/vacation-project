import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from "../../redux/Store";
import { setLoginAction } from "../../redux/AuthReducer";
import axios from "axios";
import "./Login.css";

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const login: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        ...data,
      });
      if (response.status === 200) {
        store.dispatch(setLoginAction(response.data.user, response.data.token));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="form">
        <form onSubmit={handleSubmit(login)}>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="text"
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button type="submit" className="btnLogin">Login</button>
        </form>
        <p>
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
