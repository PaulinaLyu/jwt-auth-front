import { useEffect } from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import { useAuthStore } from "./store/authStore";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const logout = useAuthStore((state) => state.logout);
  const isActivate = useAuthStore((state) => state.isActivate);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  if (!isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!isActivate) {
    return <LoginForm />;
  }

  return (
    <>
      <h3>
        {isActivate ? `Вы зарегистрированы. E-mail: ${user?.email}` : "Пожалуйста, авторизуйтесь"}
      </h3>
      <button onClick={() => logout()}>Выйти</button>
    </>
  );
}

export default App;
