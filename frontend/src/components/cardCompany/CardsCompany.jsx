import React, { useState } from "react";
import "./Cards.css";
import { ToastContainer, toast } from "react-toastify";
import ImageCard from "@components/ImageCard";
import instance from "../../helpers/axios";
import ImageUpload from "@components/ImageCard";

function CardsCompany() {
  const [cards, setCards] = useState([{ id: 1, image: null }]);
  const notify = () => {
    toast.dark(" cars created ! ✅ ");
  };

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingCard, setCurrentEditingCard] = useState(null);

  const handleAddCard = () => {
    const newCard = { id: cards.length + 1, image: null };
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleSaveCard = (id) => {
    const newCards = cards.map((card) => {
      if (card.id === id) {
        return { id };
      }
      return card;
    });
    setCards(newCards);
  };

  const [cars, setCars] = useState("");

  const handleChangeSubmit = (e) => {
    const { name, value } = e.target;

    setCars({ ...cars, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post("/cars", cars)
      .then((res) => console.warn(res.data, notify()))
      .catch((err) =>
        console.error(err, toast.error("Wrong informations ! ❌"))
      );
  };
  return (
    <div>
      <ToastContainer
        theme="dark"
        autoClose={2000}
        position="bottom-center"
        className="toast-container"
        toastClassName="dark-toast"
      />
      {cards.map((card) => (
        <div className="ContainerFormVehicle" key={card.id}>
          <ImageUpload />
          {card.content}
          <form className="LabelVehicle" htmlFor="Card" onSubmit={handleSubmit}>
            Make:{" "}
            <input
              name="make"
              type="text"
              onChange={handleChangeSubmit}
              required
            />
            Model:{" "}
            <input
              name="model"
              type="text"
              onChange={handleChangeSubmit}
              required
            />
            Autonomy:{" "}
            <input
              name="autonomy"
              type="text"
              onChange={handleChangeSubmit}
              required
            />
            City:{" "}
            <input
              name="city"
              type="text"
              onChange={handleChangeSubmit}
              required
            />
            Miles:{" "}
            <input
              name="miles"
              type="text"
              onChange={handleChangeSubmit}
              required
            />
            Year:{" "}
            <input
              name="year"
              type="text"
              onChange={handleChangeSubmit}
              required
            />
            Seats:{" "}
            <input
              name="seats"
              type="text"
              onChange={handleChangeSubmit}
              required
            />
            
            Available:{" "}
            <fieldset>
              <input
                name="available"
                type="radio"
                value="0"
                onChange={handleChangeSubmit}
              />
              <label htmlFor="type">available</label>
              <input
                name="available"
                type="radio"
                value="1"
                onChange={handleChangeSubmit}
              />
              <label htmlFor="type">not available</label>
            </fieldset>
            <fieldset >
              <input
                type="radio"
                id="casual"
                name="type"
                placeholder="type"
                value="casual"
                onChange={handleChangeSubmit}
              />
              <label  htmlFor="type">Casual</label>
              <input 
                type="radio"
                id="confort"
                name="type"
                placeholder="type"
                value="confort"
                onChange={handleChangeSubmit}
              />
              <label htmlFor="administrateur"> Comfort</label>
            </fieldset>
          </form>
          <div className="ButtonForm" >
            <button 
            type="submit" 
            className="SubmitButton">
              Submit
            </button>
          <button
            type="button"
            className="DeleteButton"
            onClick={() => handleDeleteCard(card.id)}>
            Delete
          </button>
        </div>
        </div>
      ))}
      <div className="ButtonAdd">
        <button className="AddNewVehicle" onClick={handleAddCard}>
          Add New Vehicle
        </button>
      </div>
    </div>
  );
}

export default CardsCompany;
