import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Portal } from "react-portal";
import { CSSTransition } from "react-transition-group";

import Icon from "../Icon/Icon.jsx";

import styles from "./ModalLayout.module.css";

function ModalLayout({ isOpen, children, onClose }) {
  const [isInnerVisible, setIsInnerVisible] = useState(true);
  const outerNodeRef = useRef(null);
  const innerNodeRef = useRef(null);

  return (
    <Portal>
      <CSSTransition
        nodeRef={outerNodeRef}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.enterBG,
          enterActive: styles.enterActiveBG,
          exit: styles.exitBG,
          exitActive: styles.exitActiveBG,
        }}
        timeout={300}
        in={isOpen}
        onEnter={() => setIsInnerVisible(true)}
        onExiting={() => setIsInnerVisible(false)}
      >
        <div ref={outerNodeRef} className={styles.root}>
          <CSSTransition
            mountOnEnter
            unmountOnExit
            nodeRef={innerNodeRef}
            classNames={{
              enter: styles.enterModal,
              enterActive: styles.enterActiveModal,
              exit: styles.exitModal,
              exitActive: styles.exitActiveModal,
            }}
            timeout={300}
            in={isInnerVisible}
          >
            <div ref={innerNodeRef} className={styles.modal}>
              <button className={styles.close} onClick={onClose}>
                <Icon id="plus" className={styles.icon} />
              </button>
              {children}
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </Portal>
  );
}

ModalLayout.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.object,
  onClose: PropTypes.func,
};

export default ModalLayout;
