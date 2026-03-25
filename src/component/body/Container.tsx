import { useEffect, useState } from "react";
import MyCard from "./MyCard";

const Container = () => {
  const [cardStatue, setCardStatue] = useState<string>("To Do");

  //   console.log(cardStatue);
  return (
    <>
      <div className="flex gap-8 w-full">
        <div>
          To Do
          {cardStatue == "To Do" && (
            <MyCard cardStatue={cardStatue} setCardStatue={setCardStatue} />
          )}
        </div>
        <div>
          In Progress
          {cardStatue == "In Progress" && (
            <MyCard cardStatue={cardStatue} setCardStatue={setCardStatue} />
          )}
        </div>
        <div>
          Done
          {cardStatue == "Done" && (
            <MyCard cardStatue={cardStatue} setCardStatue={setCardStatue} />
          )}
        </div>
      </div>
    </>
  );
};

export default Container;
