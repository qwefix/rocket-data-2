import c from "./App.module.scss";
import { Login } from "../LoginPannel/Login";

function App() {
  return (
    <div className={c.wrapper}>
      <Login />
    </div>
  );
}

export default App;
