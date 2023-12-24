import '../styles/Button.css';

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
