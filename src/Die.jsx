function Die({ value, hold, isHeld }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "#ffffff"
  };
  return (
    <div className="die" onClick={hold} style={styles}>
      <p>{value}</p>
    </div>
  );
}

export default Die;
