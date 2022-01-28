import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateFood from "./UpdateFood";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const UpdateFoodLogModal = ({ selectedMeal, mealName, selectedCarb, selectedFat, selectedProtein, selectedCal, dng, foodLogId, selectedMealId }) => {
    const [modal, setShowModal] = useState(false);

    return (
      <>
          <span className="foodlog-existing-edit" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>
          {modal && (
              <Modal onClose={() => setShowModal(false)}>
                  <UpdateFood selectedMeal={selectedMeal}
                    mealName={mealName}
                    selectedCarb={selectedCarb}
                    selectedFat={selectedFat}
                    selectedProtein={selectedProtein}
                    selectedCal={selectedCal}
                    dng={dng}
                    foodLogId={foodLogId}
                    selectedMealId={selectedMealId}
                  />
              </Modal>
          )}

      </>
    );
  };

  export default UpdateFoodLogModal;
