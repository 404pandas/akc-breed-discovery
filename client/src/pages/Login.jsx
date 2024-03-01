import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Login = (props) => {
  const [userFormState, setUserFormState] = useState({
    email: "",
    password: "",
  });

  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await login({
        variables: {
          email: userFormState.email,
          password: userFormState.password,
        },
      });
      const token = loginResponse.data.login.token;
      Auth.login(token);
    } catch (event) {
      console.log(event);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormState({
      ...userFormState,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        Don't have an account? <Link to='/signup'>Signup instead!</Link>
      </div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            placeholder='chocoLab@gmail.com'
            name='email'
            type='email'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <h3>Please select a password with a minimum of 8 characters!</h3>
          <input
            placeholder='labrador'
            name='password'
            type='password'
            id='password'
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p>Error! Incorrect email or password.</p>
          </div>
        ) : null}
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
