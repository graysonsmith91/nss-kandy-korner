import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/Locations"
import { ProductContainer } from "../products/ProductContainer"
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/Products"

export const CustomerViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner 🍬</h1>

					<Outlet />
				</>
			}>
				<Route path="findcandy" element={<ProductContainer />} />
                <Route path="products" element={<ProductList />} />
				<Route path="products/create" element={<ProductForm />} />
				<Route path="locations" element={<LocationList />} />
			</Route>
		</Routes>
	)
}