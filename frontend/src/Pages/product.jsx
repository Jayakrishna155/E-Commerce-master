import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../Context/ShopContext.jsx';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/breadcrum';
import Productdisplay from '../Components/Productdisplay/productdisplay.jsx';
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox.jsx';
import Relatedproduct from '../Components/Relatedproduct/Relatedproduct.jsx';
import Loader from '../Components/Loader/Loader.jsx';

export default function Product() {
    const { Allproducts } = useContext(Shopcontext);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
        const timer = setTimeout(() => {
            if (Allproducts && Allproducts.length > 0) {
                const foundProduct = Allproducts.find((item) => Number(productId) === item.id);
                setProduct(foundProduct);
            }
            setLoading(false); 
        }, 300);

        return () => clearTimeout(timer);
    }, [Allproducts, productId]);

    if (loading) return <Loader />;

    return (
        <div className='product'>
            <Breadcrum product={product} />
            <Productdisplay product={product} />
            <Descriptionbox />
            <Relatedproduct />
        </div>
    );
}
