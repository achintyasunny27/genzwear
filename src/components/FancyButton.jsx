import './FancyButton.css';

export default function FancyButton({ label = 'Click Me', onClick }) {
  return (
    <button className="fancy-btn" onClick={onClick}>
      {label}
    </button>
  );
}