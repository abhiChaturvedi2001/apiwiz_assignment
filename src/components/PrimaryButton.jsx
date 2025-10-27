import React from "react";

const PrimaryButton = ({ btnName, handleClick, styles = "" }) => {
  return (
    <button className={styles} onClick={handleClick}>
      {btnName}
    </button>
  );
};

export default PrimaryButton;
