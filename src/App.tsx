import { ModalContainer } from "react-modal-global";
import "./App.css";
import Modal from "./component/Modal.new";
import ModalDemo from "./component/ModalDemo";
import { default as ModalDemoNew } from "./component/ModalDemo.new";

function App() {
  return (
    <div className="App">
      <ModalDemo />
      <ModalDemoNew />
      <ModalContainer controller={Modal} />
    </div>
  );
}

export default App;
