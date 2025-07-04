import './GlowingButton.css';

function GlowingButton({ label = "Hover Me!", onClick }) {
  return (
    <button className="glow-btn" onClick={onClick}>
      {label}
    </button>
  );
}

export default GlowingButton;