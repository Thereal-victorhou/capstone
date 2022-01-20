import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddFood from './AddFood';


const FoodLogModal = ({ selectedMeal }) => {
  const [modal, setShowModal] = useState(false);

  return (
    <>
      <button className="add_food_button" onClick={() => setShowModal(true)}>
        <h4 type="button" className="add_food_button_text">
          Add New Food
        </h4>
      </button>
      {modal && (
        <Modal onClose={() => setShowModal(false)}>
            <AddFood selectedMeal={selectedMeal}/>
        </Modal>
      )}
    </>
  );
};

export default FoodLogModal;
