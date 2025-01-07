import React, { useEffect, useState } from 'react'
import apiInstance from '../../utils/axios'
import { Link } from 'react-router-dom'

function products() {
    const [currentItems, setProducts] = useState([])

    useEffect(()=>{
        apiInstance.get(`products/`).then((res) => {
            setProducts(res.data)
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
                {/* {category.map((c, index) => (
                    <div className="align-items-center d-flex flex-column" style={{ background: "#e8e8e8", marginLeft: "10px", borderRadius: "10px", padding: "30px" }}>
                        <img src={c.image}
                            alt=""
                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                        <p><a href="" className='text-dark'>{c.title}</a></p>
                    </div>
                ))} */}

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

export default products
