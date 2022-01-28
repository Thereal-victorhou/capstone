import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateFood from "./UpdateFood";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const UpdateFoodLogModal = ({ selectedMeal }) => {
    const [modal, setShowModal] = useState(false);

    return (
      <>
        {selectedMeal ?
          (<span className="foodlog-existing-edit" onClick={() => setShowModal(true)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </span>
          ) :
          (<h3>Please Select A Meal Time</h3>)
        }
          {modal && (
              <Modal onClose={() => setShowModal(false)}>
                  <UpdateFood selectedMeal={selectedMeal}/>
              </Modal>
          )}

      </>
    );
  };

  export default UpdateFoodLogModal;
