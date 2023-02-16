function Button({ text, color }) {
  return (
    <button style={{ background: "yellow", color: color, margin: 20 }}>
      {text}
    </button>
  );
}

export default Button;
