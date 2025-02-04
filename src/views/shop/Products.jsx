import React, { useEffect, useState } from 'react'
import apiInstance from '../../utils/axios'
import { Link } from 'react-router-dom'
import GetCurrentAddress from '../plugin/UserCountry';
import UserData from '../plugin/UserData';
import CartID from '../plugin/CartID';
import { FaCheckCircle, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})
function Products() {
    const [currentItems, setProducts] = useState([])
    const [category, setCategory] = useState([]);

    const currentAddress = GetCurrentAddress();
    const userData = UserData();
    let cart_id = CartID();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedColors, setSelectedColors] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [colorImage, setColorImage] = useState("")
    const [colorValue, setColorValue] = useState("No Color");
    const [sizeValue, setSizeValue] = useState("No Size");
    const [qtyValue, setQtyValue] = useState(1)

    const handleColorButtonClick = (event, product_id, colorName, colorImage) => {
        setColorValue(colorName);
        setColorImage(colorImage);
        setSelectedProduct(product_id);

        setSelectedColors((prevSelectedColors) => ({
            ...prevSelectedColors,
            [product_id]: colorName,
        }));
    }

    const handleSizeButtonClick = (event, product_id, sizeName) => {
        setSizeValue(sizeName);
        setSelectedProduct(product_id);

        setSelectedSize((prevSelectedSize) => ({
            ...prevSelectedSize,
            [product_id]: sizeName,
        }));

    };

    const handleQtyChange = (event, product_id) => {
        setQtyValue(event.target.value);
        setSelectedProduct(product_id);
    };

    const handleAddToCart = async (product_id, price, shipping_amount) => {
        const formData = new FormData();
        formData.append("product_id", product_id);
        formData.append("user_id", userData?.user_id);
        formData.append("qty", qtyValue);
        formData.append("price", price);
        formData.append("shipping_amount", shipping_amount);
        formData.append("country", currentAddress.country);
        formData.append("size", sizeValue);
        formData.append("color", colorValue);
        formData.append("cart_id", cart_id);

        const response = await apiInstance.post(`cart-view/`, formData);
        Toast.fire({
            icon:'success',
            title: response.data.message
        });
    }

    useEffect(()=>{
        apiInstance.get(`products/`).then((res) => {
            setProducts(res.data)
        })
    }, [])

    useEffect(()=>{
        apiInstance.get(`category/`).then((res) => {
            setCategory(res.data)
        })
    }, [])
    
  return (
    
      <>
        <main className="mt-5">
            <div className="container">
            <section className="text-center container">
                <div className="row mt-4 mb-3">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Hot Category🔥</h1>
                        <p className="lead text-muted">
                            Our Latest Categories
                        </p>
                    </div>
                </div>
            </section>
            <div className="d-flex justify-content-center">
                {category.map((c, index) => (
                    <div className="align-items-center d-flex flex-column" style={{ background: "#e8e8e8", marginLeft: "10px", borderRadius: "10px", padding: "30px" }}>
                        <img src={c.image}
                            alt=""
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                        <p><a href="" className='text-dark'>{c.title}</a></p>
                    </div>
                ))}

            </div>
            <section className="text-center container">
                <div className="row mt-4 mb-3">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Featured Products 📍</h1>
                        <p className="lead text-muted">
                            Our Featured Products
                        </p>
                    </div>
                </div>
            </section>
                <section className="text-center">
                    <div className="row ">
                    {currentItems?.map((product, index) => (
                        <div className="col-lg-4 col-md-12 mb-4" key={index.id}>
                            <div className="card">
                                <div
                                    className="bg-image hover-zoom ripple"
                                    data-mdb-ripple-color="light"
                                >
                                    <Link to={`/detail/${product.slug}`}>
                                        <img
                                            src={product.image}
                                            className="w-100"
                                            style={{ width: "100px", height: "300px", objectFit: "cover" }}
                                        />
                                    </Link>
                                </div>
                                <div className="card-body">
                                <h6 className="">By: <Link to={`/vendor/${product?.vendor?.slug}`}>{product.vendor.name}</Link></h6>
                                <Link to={`/detail/${product.slug}`} className="text-reset"><h5 className="card-title mb-3 ">{product.title.slice(0, 30)}...</h5></Link>
                                    {/* <Link to="/" className="text-reset"><p>{product?.brand.title}</p></Link> */}
                                    
                                    <div className='d-flex justify-content-center'>
                                        <h6 className="mb-1">${product?.price}</h6>
                                        <h6 className="mb-1 text-muted ms-2"><strike>${product?.old_price}</strike></h6>
                                    </div>
                                    {((product.color && product.color.length > 0) || (product.size && product.size.length > 0)) ? (
                                            <div className="btn-group">
                                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuClickable" data-bs-toggle="dropdown" data-bs-auto-close="false" aria-expanded="false">
                                                Variation
                                            </button>
                                            <ul className="dropdown-menu" style={{ maxWidth: "400px" }} aria-labelledby="dropdownMenuClickable">
                                            <div className="d-flex flex-column mb-2 mt-2 p-1">
                                                <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                    <>
                                                        <li>
                                                            <input
                                                                type="number"
                                                                className='form-control'
                                                                placeholder='Quantity'
                                                                onChange={(e) => handleQtyChange(e, product.id)}
                                                                min={1}
                                                                defaultValue={1}
                                                            />
                                                        </li>
                                                    </>
                                                </div>
                                                </div>
                                                {product?.size && product?.size.length > 0 && (
                                                    <div className="d-flex flex-column">
                                                        <li className="p-1"><b>Size</b>: {selectedSize[product.id] || 'Select a size'}</li>
                                                        <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                            {product?.size?.map((size, index) => (
                                                                <>
                                                                    <li key={index}>
                                                                        <button
                                                                            className="btn btn-secondary btn-sm me-2 mb-1"
                                                                            onClick={(e) => handleSizeButtonClick(e, product.id, size.name)}
                                                                        >
                                                                            {size.name}
                                                                        </button>
                                                                    </li>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {product.color && product.color.length > 0 && (
                                                    <div className="d-flex flex-column mt-3">
                                                        <li className="p-1 color_name_div"><b>Color</b>: {selectedColors[product.id] || 'Select a color'}</li>
                                                        <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                                            {product?.color?.map((color, index) => (
                                                                <>
                                                                    <input type="hidden" className={`color_name${color.id}`} name="" id="" />
                                                                    <li key={index}>
                                                                        <button
                                                                            key={color.id}
                                                                            className="color-button btn p-3 me-2"
                                                                            style={{ backgroundColor: color.color_code }}
                                                                            onClick={(e) => handleColorButtonClick(e, product.id, color.name, color.image)}
                                                                        >
                                                                        </button>
                                                                    </li>
                                                                </>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Add To Cart */}
                                                <div className="d-flex mt-3 p-1 w-100">
                                                    <button
                                                        onClick={() => handleAddToCart(product.id, product.price, product.shipping_amount)}
                                                        // disabled={loadingStates[product.id] === 'Adding...'}
                                                        type="button"
                                                        className="btn btn-primary me-1 mb-1"
                                                    >
                                                       Added to Cart <FaCheckCircle />
                                                           
                                                    </button>
                                                </div>
                                            </ul>
                                            </div>
                                        ):(<div className="btn-group"></div>)}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </section>
            </div>
        </main>
      </>
  )
}

export default Products
