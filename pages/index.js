export default function Home() {
  return (
    <div
      style={{
        display: "grid",
        width: "100vw",
        height: "100vh",
        placeItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>RSS Search Engine</h2>
        <input style={{ height: "4rem", width: "24rem" }} />
      </div>
    </div>
  );
}
