import "./Cart.scss";
import { MdClose } from "react-icons/md";
import {BsCartX} from 'react-icons/bs';
import CartItem from './CartItem/CartItem';
import { useContext } from "react";
import { Context } from "../../utils/context";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";
import { useNavigate } from "react-router-dom";

// use the stripe plugin
// import the makePaymentRequest ()
const Cart = ({setShowCart}) => {
    const navigate = useNavigate();
    const{cartItems,cartSubTotal} = useContext(Context);

    // create a instances using loadstripe

    const stripePromise = loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    );

    // create a () for handling the payment
    const handlePayment = async() =>{
        try {
            const stripe = await stripePromise;
            // api call is a post call endpoint
            const res = await makePaymentRequest.post("/api/orders",{
                products: cartItems,
            });

            // redirect to checkout
            await stripe.redirectToCheckout({
               sessionId: res.data.stripeSession.id 
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
     <div className="cart-panel">
        <div className="opac-layer">        
        </div>
        <div className="cart-content">
            <div className="cart-header">
                <span className="heading">Shopping Cart</span>
                <span className="cls-btn" onClick={() => setShowCart(false)}>
                    <MdClose/>
                    <span className="text">close</span>
                </span>
            </div>

      
            {!cartItems.length && (
                    <div className="empty-cart">
                        <BsCartX />
                        <span>No products in the cart.</span>
                        <button className="return-cta" onClick={() => {navigate("/");setShowCart(false);}}>
                            RETURN TO SHOP
                        </button>
                    </div>
                )}

       
{!!cartItems.length && (
                    <>
                        <CartItem />
                        <div className="cart-footer">
                            <div className="subtotal">
                                <span className="text">Subtotal:</span>
                                <span className="text total">
                                    &#8377;{cartSubTotal}
                                </span>
                            </div>
                            <div className="button">
                                <button
                                    className="checkout"
                                    // call the () handlepayment
                                    onClick={handlePayment}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            
        </div>
    </div>
    );
};

export default Cart;
