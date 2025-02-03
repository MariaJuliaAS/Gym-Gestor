import RoutesApp from "./routes";
import './app.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer 
      autoClose={3000}
      theme="dark"
      />
      <RoutesApp/>
    </div>
  );
}

export default App;
