import { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import { Context } from "../../utils/context";
import "./Header.scss";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const [scrolled,setScrolled] = useState(false);
    const [showCart,setShowCart] = useState(false);
    const [showSearch,setShowSearch] = useState(false);
    const navigate = useNavigate();
    const {cartCount} = useContext(Context);
    const { loginWithRedirect,logout,user, isAuthenticated, isLoading } = useAuth0();


    const handleScroll = () =>{
        const offset = window.scrollY;
        if(offset > 200){
            setScrolled(true);
        }
        else{
            setScrolled(false)
        }
    
}

    useEffect(() => {
        window.addEventListener("scroll",handleScroll);
    },[]);
    return (
    <>
     <header className = {`main-header ${scrolled ? 'sticky-header' : ""}`}>
        <div className="header-content">
            <ul className="left">
                <li onClick={() => navigate("/")}>Home</li>
                <li>About</li>
                <li>Category</li>
            </ul>
            <div className="center" onClick={()=>navigate("/")}>BALAJI TRADERS</div>
            <div className="right">
                <TbSearch onClick={()=> setShowSearch(true)}/>


            {isAuthenticated && (
      <div className="user">
       
       <img className = "img" src={user.picture} alt={user.name} />
       
      </div>
        )}  
            {isAuthenticated ? (
                   
                    <button  className="logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>log out</button>
                   
                ):(
                    <button className="login" onClick={() => loginWithRedirect()}>Log In</button>

                )}
                

                <span className="cart-icon" onClick={() => setShowCart(true)}>
                    <CgShoppingCart/>
                   {!!cartCount && <span>{cartCount}</span>}
                </span>
                </div>
        </div>
    </header>
    {showCart && <Cart setShowCart = {setShowCart}/>}
    {showSearch && <Search setShowSearch = {setShowSearch}/>}
    </>   
    );
};

export default Header;
