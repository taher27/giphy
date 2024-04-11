import React from "react";
import s from "./toggle.module.scss";
import cx from "classnames";

function Toggle(props) {
  const { onChangeHandler, toggleValue } = props;

  const isToggled = cx(s.toggleButton, {
    [s.on]: toggleValue,
    [s.off]: !toggleValue,
  });
  return (
    <>
      <button
        onClick={() => {
          onChangeHandler(!toggleValue);
        }}
        className={isToggled}
      >
        Turn {toggleValue ? "Light" : "Dark"} Mode
      </button>
    </>
  );
}

export default Toggle;
