
import "./Banner.scss";
import BannerImg from "../../../assets/water.png"
const Banner = () => {
    return <div className="hero-banner">
        <div className="content">
            <div className="text-content">
                <h1>
                    SALES
                </h1>
                <p>
                HAVELLS Digiplus 6 L RO + UV Water Purifier 8 Stages, Double UV Purification 
                </p>
                <div className="ctas">
                    <div className="banner-cta">Read More</div>
                    <div className="banner-cta v2">Shop Now</div>
                </div>
            </div>
            <img className="banner-img" src= {BannerImg} alt=""/>
        </div>
    </div>;
};

export default Banner;
