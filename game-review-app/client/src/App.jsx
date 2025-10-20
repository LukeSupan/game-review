import WelcomeMessage from "./components/Welcome";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const App = () => {
  return (
    <div>
      <WelcomeMessage />
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;