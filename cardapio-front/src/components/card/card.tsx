import "./card.css";

interface CardProps {
    price: number;
    title: string;
    image: string;
    onEdit: () => void;
}

export function Card({ price, image, title, onEdit }: CardProps) {
    return (
        <div className="card">
            <button className="edit-icon" onClick={onEdit} title="Editar item">
                ✎
            </button>

            <img src={image} alt={title} />

            <div className="card-content">
                <h2>{title}</h2>

                <div className="price-box">
                    <span>R$</span>
                    <strong>{price.toFixed(2)}</strong>
                </div>
            </div>
        </div>
    );
}