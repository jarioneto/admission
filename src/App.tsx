import Router from "~/router";
import { Header } from "./components/Header";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header>
        <h2>CajuBoard</h2>
      </Header>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
