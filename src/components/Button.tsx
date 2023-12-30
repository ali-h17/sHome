import '../styles/Button.css';
import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
}

function Button({ children, onClick }: ButtonProps): JSX.Element {
	return (
		<button className="btn" onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;
