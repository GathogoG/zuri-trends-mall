import './Signup.css';

const Signup = () => {
  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
