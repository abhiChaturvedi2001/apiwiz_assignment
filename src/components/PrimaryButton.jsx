import React from "react";

const PrimaryButton = ({
  btnName,
  handleClick,
  styles = "",
  disabled = false,
}) => {
  return (
    <button className={styles} onClick={handleClick} disabled={disabled}>
      {btnName}
    </button>
  );
};

export default PrimaryButton;
