import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const ProductForm = () => {
    const [product, update] = useState({
        name: "",
        productTypeId: 0,
        pricePerUnit: 0
    })
    const [productTypes, setProductTypes] = useState([])

    useEffect(
        () => {
            fetch('http://localhost:8088/productTypes')
                .then(res => res.json())
                .then((productTypesArray) => {
                    setProductTypes(productTypesArray)
                })
        },
        []
    )

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendToAPI = {
            name: product.name,
            productTypeId: product.productTypeId,
            pricePerUnit: product.pricePerUnit
        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/products")
            })
    }


    
    return (
        <form className="productForm">
            <h2 className="productForm_title">Create New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Please enter product name"
                        value={product.name}
                        onChange={
                            (event) => {
                                const copy = { ...product }
                                copy.name = event.target.value
                                update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productType">Product Type:</label>
                    <select
                        className="form-control"
                        value={product.productTypeId}
                        onChange={
                            (event) => {
                                const copy = { ...product }
                                copy.productTypeId = parseInt(event.target.value)
                                update(copy)
                            }
                        }
                    >
                        <option>Select product type</option>
                        {productTypes.map(productType => {
                            return <option value={productType.id}>{productType.type}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productPrice">Price Per Unit:</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Please enter product price"
                        value={product.pricePerUnit}
                        onChange={
                            (event) => {
                                const copy = { ...product }
                                copy.pricePerUnit = parseFloat(event.target.value)
                                update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent => handleSaveButtonClick(clickEvent))}
                className="btn-primary">
                Save Candy
            </button>
        </form>
    )
}