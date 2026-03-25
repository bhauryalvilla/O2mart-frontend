

interface MyCardProp {
  cardStatue: string;
  setCardStatue: React.Dispatch<React.SetStateAction<string>>;
}

const MyCard: React.FC<MyCardProp> = ({ cardStatue, setCardStatue }) => {
  //setCardStatue("Laxman");

  function setCard(value: string) {
    setCardStatue(value);
  }

  //   useEffect(() => {
  //     console.log(cardStatue);
  //   }, [cardStatue]);

  return (
    <div>
      My Card
      <div>
        <select onChange={(e) => setCard(e.target.value)} value={cardStatue}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <div>Card moved to {cardStatue}</div>
      </div>
    </div>
  );
};

export default MyCard;
