import React from "react";

const ProgressBar = ({ size }) => {
  const containerStyles = {
    height: 21,
    width: "100%",
    backgroundColor: "#e0e0de",
  };

  const fillerStyles = {
    height: "100%",
    width: `${size}%`,
    background: "#1990fe",
    borderRadius: "inherit",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles} />
    </div>
  );
};

export default ProgressBar;
