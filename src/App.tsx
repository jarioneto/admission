import Router from "~/router";
import { Header } from "./components/Header";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header>
        <h1>CajuBoard</h1>
      </Header>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
