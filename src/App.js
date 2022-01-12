import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [height, setHeight] = useState(); //cm
  const [weight, setWeight] = useState(); //kg
  const [BMI, setBMI] = useState();
  const [color, setColor] = useState("#f8f8f8");
  const [description, setDescription] = useState("white");
  const [validInput, setValidInput] = useState();
  const heightInput = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const calculateBMI = () => {
    if (validInput) {
      const heightInMeters = height / 100;
      const newBMI = weight / (heightInMeters * heightInMeters);
      setBMI(newBMI.toFixed(2));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    calculateBMI();
  };

  const checkDescription = () => {
    if (validInput && BMI) {
      if (BMI < 15) {
        setRgbColor("red");
        setDescription("Sairaalloinen alipaino");
      } else if (BMI >= 15 && BMI <= 17) {
        setRgbColor("red");
        setDescription("Merkittävä alipaino");
      } else if (BMI > 17 && BMI <= 18.5) {
        setRgbColor("yellow");
        setDescription("Lievä alipaino");
      } else if ((BMI > 18, 5 && BMI <= 25)) {
        setRgbColor("green");
        setDescription("Normaali paino");
      } else if (BMI > 25 && BMI <= 30) {
        setRgbColor("yellow");
        setDescription("Lievä ylipaino");
      } else if (BMI > 30 && BMI <= 35) {
        setRgbColor("red");
        setDescription("Merkittävä ylipaino");
      } else if (BMI > 35 && BMI <= 40) {
        setRgbColor("red");
        setDescription("Vaikea ylipaino");
      } else if (BMI > 40) {
        setRgbColor("red");
        setDescription("Sairaalloinen ylipaino");
      }
    } else {
      setRgbColor("white");
      setBMI(null);
      setDescription(null);
    }
  };

  const setRgbColor = (color) => {
    if (color === "green") {
      setColor("#66FF7F");
    } else if (color === "yellow") {
      setColor("#FFFF4D");
    } else if (color === "red") {
      setColor("#FF4D4D");
    } else if (color === "white") {
      setColor("#f8f8f8");
    }
  };

  useEffect(() => {
    heightInput.current.focus();
  }, []);
  useEffect(() => {
    checkDescription();
  });

  //check if the input is correct if submitted
  useEffect(() => {
    if ((parseFloat(height) && parseFloat(weight) && submitted) || !submitted) {
      setValidInput(true);
    } else {
      setValidInput(false);
    }
  }, [height, weight, submitted, BMI]);

  return (
    <div className="container" style={{ backgroundColor: `${color}` }}>
      <div className="app">
        <form onSubmit={handleSubmit}>
          <h1>Painoindeksi laskuri</h1>
          <label htmlFor="height">Pituus:</label>
          <input
            className="input"
            type="text"
            name="height"
            placeholder="cm"
            ref={heightInput}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
          ></input>
          <label htmlFor="weight">Paino:</label>
          <input
            className="input"
            type="text"
            name="weight"
            placeholder="kg"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          ></input>
          <button className="btn" type="submit">
            Laske painoindeksi
          </button>
          <div className="result">
            {BMI ? <h3>{`Painoindeksi on: ${BMI}`}</h3> : null}
            <h2 className="description" style={{ color: `${color}` }}>
              {description}
            </h2>
            {!validInput ? (
              <h3 className="error">{`Syötä pituus ja paino `}</h3>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
