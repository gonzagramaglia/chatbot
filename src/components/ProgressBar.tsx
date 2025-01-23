import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({
  progress,
  height,
  color,
  backgroundColor,
}: {
  progress: number;
  height: string;
  color: string;
  backgroundColor: string;
}) => {
  const containerStyle = {
    width: "100%",
    backgroundColor: backgroundColor || "#e0e0df",
    borderRadius: "8px",
    overflow: "hidden",
    height: height || "20px",
  };

  const fillerStyle = {
    width: `${progress}%`,
    backgroundColor: color || "#4caf50",
    height: "100%",
    transition: "width 0.3s ease-in-out",
  };

  return (
    <div style={containerStyle}>
      <div style={fillerStyle}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  height: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default ProgressBar;
