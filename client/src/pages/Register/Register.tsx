import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const submit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        ...data,
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <h1>Register</h1>
      <div className="form">
        <form onSubmit={handleSubmit(submit)}>
          <input
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name should have at least 2 characters",
              },
            })}
            type="text"
            placeholder="First Name"
          />
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}

          <input
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name should have at least 2 characters",
              },
            })}
            type="text"
            placeholder="Last Name"
          />
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="text"
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password should have at least 4 characters",
              },
            })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <NavLink to="/">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
