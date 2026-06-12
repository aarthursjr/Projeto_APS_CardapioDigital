import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { useFoodDataUpdate } from "../../hooks/useFoodDataUpdate";
import { useFoodDataDelete } from "../../hooks/useFoodDataDelete";
import type { FoodData } from "../../interface/FoodData";

import "./modal.css";

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: string): void;
    type?: string;
}

interface ModalProps {
    closeModal(): void;
    foodToEdit?: FoodData | null;
}

const Input = ({
    label,
    value,
    updateValue,
    type = "text",
}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(event) => updateValue(event.target.value)}
            />
        </>
    );
};

export function CreateModal({
    closeModal,
    foodToEdit,
}: ModalProps) {
    const [title, setTitle] = useState(foodToEdit?.title || "");
    const [price, setPrice] = useState(
        foodToEdit?.price ? foodToEdit.price.toString() : ""
    );
    const [image, setImage] = useState(foodToEdit?.image || "");

    const createMutation = useFoodDataMutate();
    const updateMutation = useFoodDataUpdate();
    const deleteMutation = useFoodDataDelete();

    const isEditing = !!foodToEdit;

    const isSuccess =
        createMutation.isSuccess ||
        updateMutation.isSuccess ||
        deleteMutation.isSuccess;

    const isPending =
        createMutation.isPending ||
        updateMutation.isPending ||
        deleteMutation.isPending;

    const formatPricePreview = (value: string) => {
        const number = Number(value);

        if (isNaN(number) || value === "") {
            return "R$ 0,00";
        }

        return number.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    const submit = () => {
        const foodData: FoodData = {
            id: foodToEdit?.id,
            title,
            image,
            price: Number(price),
        };

        if (isEditing) {
            updateMutation.mutate(foodData);
        } else {
            createMutation.mutate(foodData);
        }
    };

    const deleteItem = () => {
        if (!foodToEdit?.id) return;

        const confirmDelete = window.confirm(
            "Deseja realmente excluir este item?"
        );

        if (confirmDelete) {
            deleteMutation.mutate(foodToEdit.id);
        }
    };

    useEffect(() => {
        if (!isSuccess) return;
        closeModal();
    }, [isSuccess, closeModal]);

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <button
                    type="button"
                    className="modal-close"
                    onClick={closeModal}
                >
                    ×
                </button>

                <h2>
                    {isEditing
                        ? "Atualizar item do cardápio"
                        : "Cadastre um novo item no cardápio"}
                </h2>

                <form
                    className="input-container"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <Input
                        label="Nome do produto"
                        value={title}
                        updateValue={setTitle}
                    />

                    <Input
                        label="Preço"
                        type="number"
                        value={price}
                        updateValue={setPrice}
                    />

                    <span className="price-preview">
                        {formatPricePreview(price)}
                    </span>

                    <Input
                        label="URL da imagem"
                        value={image}
                        updateValue={setImage}
                    />
                </form>

                <button
                    type="button"
                    onClick={submit}
                    className="btn-secondary"
                    disabled={isPending}
                >
                    {isPending
                        ? "Salvando..."
                        : isEditing
                        ? "Salvar alterações"
                        : "Cadastrar item"}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={deleteItem}
                        className="btn-delete-modal"
                        disabled={isPending}
                    >
                        Excluir item
                    </button>
                )}
            </div>
        </div>
    );
}