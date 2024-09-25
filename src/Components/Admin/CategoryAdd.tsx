import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { addCategory } from "../../api/admin";
import { toast } from "react-toastify";

type Errors = {
  category?: string;
};

type CategoryAddProps = {
  onCategoryAdded: () => void;
};

export default function CategoryAdd({ onCategoryAdded }: CategoryAddProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const close = () => {
    setCategory("");
    onClose();
  };

  // validation
  const validateForm = () => {
    const newErrors: Errors = {};

    if (!category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCategory = async () => {
    if (validateForm()) {
      const response = await addCategory(category);
      console.log(response, "cate response");

      if (response) {
        toast.success(response.data.message, {
          autoClose: 2000,
          hideProgressBar: true,
          position: "top-center",
        });
        console.log("Category saved:", category);
        onClose();
        setCategory("");
        onCategoryAdded();
      }
    }
  };

  return (
    <>
      <Button className="font-bold font-mono" onPress={onOpen} color="success">
        Add Category
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex  items-center flex-col gap-1">
              Add Category
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                value={category}
                label="Category Name"
                variant="underlined"
                onChange={(e) => setCategory(e.target.value)}
              />
              {errors.category && (
                <p style={{ color: "red" }}>{errors.category}</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={close}>
                Close
              </Button>
              <Button color="success" onClick={handleCategory}>
                Save
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
