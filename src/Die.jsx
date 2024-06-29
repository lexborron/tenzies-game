function Die({ value, hold, held }) {
  const styles = {
    backgroundColor: held ? "#59E391" : "#ffffff"
  };
  return (
    <div className="die" onClick={hold} style={styles}>
      <p>{value}</p>
    </div>
  );
}

export default Die;
