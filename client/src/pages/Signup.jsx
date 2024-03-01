import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";

const Signup = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const addUserResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = addUserResponse.data.addUser.token;
      Auth.login(token);
    } catch (event) {
      console.log(event);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        Already have an account? <Link to='/login'>Login instead!</Link>
      </div>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            placeholder='ChocoLab'
            name='username'
            type='username'
            id='username'
            onChange={handleChange}
          />
        </div>
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
            <p>Error!</p>
          </div>
        ) : null}
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
