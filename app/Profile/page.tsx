import { useState } from "react";

export default function App() {
  const users = [
    {
      name: "Anna",
      age: 22,
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    },
    {
      name: "Sara",
      age: 24,
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    {
      name: "Emma",
      age: 21,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
  ];

  const [index, setIndex] = useState(0);

  const nextProfile = () => {
    setIndex((prev) => (prev + 1) % users.length);
  };

  const user = users[index];

  return (
    <div style={styles.container}>
      <div style={styles.title}>Tinder UI</div>

      <div style={styles.card}>
        <img src={user.img} alt="" style={styles.image} />
        <div>
          {user.name}, {user.age}
        </div>
      </div>

      <div style={styles.buttons}>
        <button style={styles.dislike} onClick={nextProfile}>
          ❌
        </button>
        <button style={styles.like} onClick={nextProfile}>
          ❤️
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#fafafa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial",
  },
  title: {
    marginBottom: "20px",
  },
  card: {
    width: "300px",
    height: "420px",
    background: "#fff",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "80%",
    objectFit: "cover",
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    gap: "40px",
  },
  like: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    fontSize: "24px",
    background: "#ff4458",
    color: "#fff",
    cursor: "pointer",
  },
  dislike: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    fontSize: "24px",
    background: "#ddd",
    cursor: "pointer",
  },
};
