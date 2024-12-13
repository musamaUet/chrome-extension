import React from "react";

interface ButtonProps {
  title: string; // Text to display on the button
  onClick?: () => void; // Function to execute on button click
  backgroundColor?: string; // Custom background color
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick
}) => {

  return (
    <button className="button" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
