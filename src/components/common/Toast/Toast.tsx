import "./Toast.scss";

import React from "react";

import { images } from "@/utils/constants";
import { Toast, ToastContainer } from "react-bootstrap";
import { setShowToast } from "@/utils/constants/redux/sets";
import store from "@/app/providers/redux/store";

export const ToastFmc: React.FC = () => {
  const { show, message } = store.getState().main.session.toast;

  return (
    <ToastContainer className="fmc-cart-toast p-3">
      <Toast
        onClose={() => setShowToast(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img
            src={images.LogoLoading1}
            className="rounded me-2"
            width="64px"
            alt=""
          />
          <strong className="me-auto">{message}</strong>
        </Toast.Header>
      </Toast>
    </ToastContainer>
  );
};
