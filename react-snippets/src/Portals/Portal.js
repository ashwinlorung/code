import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import "./Portals.css";

const Modal = function ({ children }) {
  let modalRoot;
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot = document.getElementById("modal-root");
    modalRoot.appendChild(el);

    return () => {
      modalRoot.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, el);
};

const Portals = function () {
  const handleClick = () => {
    console.log("Grand Parent Element clicked");
  };

  const handleChildClick = (e) => {
    console.log("Button clicked");
  };

  return (
    <div>
      <div className="modal-button" onClick={handleClick}>
        <div>Some button to open modal</div>
        <div onClick={() => console.log("Parent element clicked")}>
          <Modal>
            <div
              className="modal"
              onClickCapture={() => console.log("middle element clicked")}
            >
              <div className="modal-content">
                <button onClick={handleChildClick}>Click me</button>
                <div className="modal-button">No click zone</div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div>
        <p>Hello</p>
      </div>
    </div>
  );
};

export default Portals;
