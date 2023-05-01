import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import useFetch from "../../../hooks/useFetch";
import "./Search.scss";
import prod from "../../../assets/products/earbuds-prod-1.webp";
{/*use state used for initial stage*/}
//usenavigate for navigation  


// call the useFetch method for api calling

const Search = ({setShowSearch}) => {
    {/*initial set the state to empty*/}
    const[query, setQuery] = useState("");
    // create a instance
    const navigate = useNavigate()

    // create a onChange method the parameter is event
    const onChange = (e)=>{
        // the user input text value
        setQuery(e.target.value);
    };

    // use the useFetch method and pass the endpoint(url) and $contains is the operator which check the user query and strapi title
    let {data} = useFetch(`/api/products?populate=*&filters[title][$contains]=${query}`);
    
    // if the query is not typed the data will be null
    if(!query.length){
        data = null;
    }

    return ( <div className="search-modal">
        <div className="form-field">
            <input type="text" autoFocus 
            placeholder="search for products"  
            // input the initial state 
            
            value={query}
            onChange={onChange}
            />
            <MdClose onClick={()=> setShowSearch(false)}/>
        </div>
        <div className="search-result-content">
            <div className="search-results">
                {/* map loop ? is used for optional chaining error free*/}
                {data?.data?.map(item =>(
                    // use the key and usenavigate is navigate to the particular product page
                <div key={item.id} className="search-result-item"
                onClick={()=>{
                    navigate("/product/" + item.id);
                    setShowSearch(false);
                }}
                >
                    <div className="img-container">
                        {/* pass the url to fetch the image from strapi */}
                        <img src={process.env.REACT_APP_DEV_URL +
                        item.attributes.img.data[0].attributes.url} alt="" />
                    </div>
                    <div className="prod-details">
                        {/* render the product title name and desc*/}
                        <span className="name">{item.attributes.title}</span>
                        <span className="desc">{item.attributes.desc}</span>
                    </div>
                </div>

                ))}
            </div>
        </div>
    </div>
    );
};

export default Search;
