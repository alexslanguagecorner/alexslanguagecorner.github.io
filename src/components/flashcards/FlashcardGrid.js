import React from "react";
import FlashcardItem from "./FlashcardItem";
import "./FlashcardGrid.scss";
import Spinner from "../ui/Spinner";

const FlashcardGrid = ({ items, isLoading }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <section className="cards" id="cards">
      {console.log(items)}
      {items.map((item) => (
        <FlashcardItem key={item.id} item={item}></FlashcardItem>
      ))}
    </section>
  );
};

export default FlashcardGrid;
