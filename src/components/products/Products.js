import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"

export const ProductList = ({searchTermState}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [expensiveProducts, setExpensiveProducts] = useState(false)

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const navigate = useNavigate()

    useEffect(
        () => {
            const searchedProducts = products.filter(product => product.name.toLowerCase().startsWith(searchTermState.toLowerCase()))
            setFiltered(searchedProducts)
        },
        [searchTermState]
    )

    useEffect(
        () => {
            fetch('http://localhost:8088/products?_expand=productType&_sort=name')
                .then(res => res.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        },
        []
    )


    useEffect(
        () => {
            if (kandyUserObject.staff) {
                setFiltered(products)
            } else {
                setFiltered(products)
            }
        },
        [products]
    )

    useEffect(
        () => {
            if (expensiveProducts) {
                const expensiveCandy = products.filter(product => product.pricePerUnit > 2)
                setFiltered(expensiveCandy)
            } else {
                setFiltered(products)
            }
        },
        [expensiveProducts]
    )


    return <>
        {
            kandyUserObject.staff
                ? <>
                    <button onClick={() => { setExpensiveProducts(true) }}>Top Priced</button>
                    <button onClick={() => { setExpensiveProducts(false) }}>All Candy</button>
                    <button onClick={() => navigate("/products/create")}>Add New Candy</button>
                </>

                : <>
                    <button onClick={() => { setExpensiveProducts(true) }}>Top Priced</button>
                    <button onClick={() => { setExpensiveProducts(false) }}>All Candy</button>
                </>
        }


        <h2>Products List</h2>
        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product">

                            <div>{product.name}</div>
                            <div>Price: ${product.pricePerUnit.toFixed(2)}</div>
                            <div>Type: {product.productType.type}</div>
                        </section>
                    }

                )
            }

        </article>

    </>
}