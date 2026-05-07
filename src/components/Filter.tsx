const Filter = () => {
    return (
        <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center gap-8">  
            <div className="flex items-center flex-col sm:flex-row gap-4">
                {/* Sort by */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray">Sort by:</span>
                    <select name="sort" id="sort" className="outline-none border border-gray/50 rounded-md px-2 py-1 text-sm">
                        <option value="best_selling">Best Selling</option>
                        <option value="price_low_to_high">Price: Low to High</option>
                        <option value="price_high_to_low">Price: High to Low</option>
                        <option value="customer_rating">Customer Rating</option>
                    </select>
                </div>
                {/* Availability */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray">Availability:</span>
                    <select name="availability" id="availability" className="outline-none border border-gray/50 rounded-md px-2 py-1 text-sm">
                        <option value="all">All</option>
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>
                </div>
            </div>
            {/* Number of products */}
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray">Number of products:</span>
                <select name="number_of_products" id="number_of_products" className="outline-none border border-gray/50 rounded-md px-2 py-1 text-sm">
                    <option value="12">25</option>
                    <option value="24">50</option>
                    <option value="48">100</option>
                </select>
            </div>
        </div>
    )
}   

export default Filter