import Products from "../../Products/Products";
import useFetch from "../../../hooks/useFetch";

const RelatedProducts = ({productID,categoryID}) => {
    const{data} = useFetch(
        `/api/products?populate=*&filters[id][$ne]=${productID}&filters[categories][id]=${categoryID}&
        pagination[start]=0&pagination[limit]=4`
    );
    return <div className="related-products">
        <Products headingText = "Related Products" products={data}/>
    </div>;
};

export default RelatedProducts;
