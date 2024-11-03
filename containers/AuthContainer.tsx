// containers/AuthContainer.js
import LoginForm from '../components/LoginForm';

const AuthContainer = () => {
  return (
    <div className="flex flex-col items-center bg-white p-8 rounded shadow-md">
      <LoginForm />
    </div>
  );
};

export default AuthContainer;
