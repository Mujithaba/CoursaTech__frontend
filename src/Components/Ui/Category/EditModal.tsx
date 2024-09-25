import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { editedCategoryData } from "../../../api/admin";
import { toast } from "react-toastify";

type EditModalProps = {
  visible: boolean;
  onClose: () => void;
  categoryName: string;
  categoryId: string;
  handleSave: () => void;
};

type Errors = {
  newCategory?: string;
};

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onClose,
  categoryName,
  categoryId,
  handleSave,
}) => {
  const [newCategory, setNewCategory] = useState(categoryName);
  const [errors, setErrors] = useState<Errors>({});

  // validation
  const validateForm = () => {
    const newErrors: Errors = {};

    if (!newCategory.trim()) {
      newErrors.newCategory = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = async () => {
    if (validateForm()) {
      try {
        const response = await editedCategoryData(newCategory, categoryId);
        if (response) {
          if (response.data.message) {
            toast.success(response.data.message, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeButton: false,
            });
            handleSave();
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit Category</ModalHeader>
        <ModalBody>
          <input
            autoFocus
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded"
          />
          {errors.newCategory && (
            <p style={{ color: "red" }}>{errors.newCategory}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSaveClick}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
