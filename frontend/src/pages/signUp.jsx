import { Component } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

class signUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('http://localhost:8080/register', {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      });

      // Log the response data
      console.log('User registered successfully:', response.data);

      // Optionally, you can redirect the user to a different page upon successful registration
      // this.props.history.push('/dashboard');
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  }

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default signUp;
