import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import PageHeaders from '../components/PageHeader';
import { FaRegTrashCan, FaMinus, FaPlus } from "react-icons/fa6";

const Cart = () => {
    const { cart, updateCart, removeFromCart } = useContext(CartContext);

    const handleIncrement = (item) => {
        updateCart(item.id, item.quantity + 1);
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            updateCart(item.id, item.quantity - 1); 
        } else {
            removeFromCart(item.id);
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.prices.price / 100) * item.quantity, 0).toFixed(2);
    };

    return (
        <>
            <PageHeaders title="Cart" image_url="/Header/Shop-header.png" />
            {cart.length === 0 ? (
                <p className='cart-empty'>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-container">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                            <img src={item.images[0].src} alt={item.name} />
                            <h2>{item.name}</h2>
                            <p>Price: ${parseFloat(item.prices.price / 100).toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => handleDecrement(item)} disabled={item.quantity === 1}>
                                <FaMinus />
                            </button>
                            <button onClick={() => handleIncrement(item)}>
                                <FaPlus />
                            </button>
                            <button onClick={() => removeFromCart(item.id)}>
                                <FaRegTrashCan />
                            </button>
                            </li>
                        ))}
                    </ul>
                    <h3 className='cart-price'>Total Price: ${getTotalPrice()}</h3>
                    <button onClick={() => alert("Proceeding to checkout...")}>Proceed to Checkout</button>
                </>
            )}
        </>
    );
};

export default Cart;
