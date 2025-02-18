
import PropTypes from 'prop-types';

const ProductCard = ({product}) => {
    return (
        <div className="max-w-60 border-2 border-black rounded-lg shadow-lg relative hover:bg-gray-200 hover:z-10 hover:scale-105 transition-transform duration-300">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">
                    {product.flavour}
                </p>
                <p className="text-gray-600 mt-2">
                    {product.size}
                </p>
                <p className="text-gray-600 mt-2">
                    {product.price}
                </p>
            
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        flavour: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductCard;