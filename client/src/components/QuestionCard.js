import cardStyles from "./styles/cardStyles.module.css";

const Card = ({
  questionNum,
  question,
  choices,
  answer,
  handleOptionChange,
  selectedOption,
}) => {
  return (
    <div className={cardStyles["card-container"]}>
      <h3>Question {questionNum}</h3>
      <p>{question}</p>
      <ul>
        {choices.map((choice, index) => (
          <li key={index}>{choice}</li>
        ))}
        <p>{answer}</p>
      </ul>
      <div className={cardStyles["checkbox-container"]}>
        <div>
          <label>
            Keep:
            <input
              type="checkbox"
              checked={selectedOption === "keep"}
              onChange={() => handleOptionChange(questionNum, "keep")}
            />
          </label>
        </div>
        <div>
          <label>
            Regenerate:
            <input
              type="checkbox"
              checked={selectedOption === "regenerate"}
              onChange={() => handleOptionChange(questionNum, "regenerate")}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Card;
