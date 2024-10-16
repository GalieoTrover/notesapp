import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, login } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = formData;

  const onSubmit = () => {
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user || isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [navigate, dispatch, user, message, isError, isSuccess]);

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="auth-page auth-page--login">
      <section className="heading">
        <h1>
          {/* <FaUser /> */}
          Login
        </h1>
        <p>Login here.</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
