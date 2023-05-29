import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  // fetch("http://localhost:5173/todos")
  //   .then((response) => response.json())
  //   .then((data) => setCount(data));

  return <h1>hello world! {count}</h1>;
}

export default App;
