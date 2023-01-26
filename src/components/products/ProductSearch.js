export const ProductSearch = ({ setterFunction }) => {
    return (
        <div className="candySearchBar">
            <label htmlFor="candySearchBar">What candy are you looking for?</label>
            <input
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text" placeholder="Enter search terms" />
        </div>
    )
}