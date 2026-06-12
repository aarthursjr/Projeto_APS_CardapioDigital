import { useState } from "react";
import "./App.css";
import { Card } from "./components/card/card";
import { useFoodData } from "./hooks/useFoodData";
import { CreateModal } from "./components/create-modal/create-modal";
import type { FoodData } from "./interface/FoodData";

function App() {
    const { data } = useFoodData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [foodToEdit, setFoodToEdit] = useState<FoodData | null>(null);
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("");

    const handleOpenCreateModal = () => {
        setFoodToEdit(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (foodData: FoodData) => {
        setFoodToEdit(foodData);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFoodToEdit(null);
    };

    const filteredData = data
        ?.filter((foodData) =>
            foodData.title.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === "az") {
                return a.title.localeCompare(b.title);
            }

            if (sortOption === "za") {
                return b.title.localeCompare(a.title);
            }

            if (sortOption === "menor-preco") {
                return a.price - b.price;
            }

            if (sortOption === "maior-preco") {
                return b.price - a.price;
            }

            return 0;
        });

    return (
        <div className="container">
            <h1>Cardápio Digital</h1>
            <h2>Uma solução moderna para consulta e gerenciamento de produtos alimentícios.</h2>

            <div className="filter-area">
                <div className="search-area">
                    <input
                        type="text"
                        placeholder="Pesquisar alimento..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                <select
                    className="sort-select"
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                >
                    <option value="">Organizar</option>
                    <option value="az">De A-Z</option>
                    <option value="za">De Z-A</option>
                    <option value="menor-preco">Menor preço</option>
                    <option value="maior-preco">Maior preço</option>
                </select>
            </div>

            <div className="card-grid">
                {filteredData?.map((foodData) => (
                    <Card
                        key={foodData.id}
                        price={foodData.price}
                        title={foodData.title}
                        image={foodData.image}
                        onEdit={() => handleOpenEditModal(foodData)}
                    />
                ))}
            </div>

            {isModalOpen && (
                <CreateModal
                    closeModal={handleCloseModal}
                    foodToEdit={foodToEdit}
                />
            )}

            <button onClick={handleOpenCreateModal}>Novo item</button>
        </div>
    );
}

export default App;