const Product = ({ product }) => {
    return (
        <div className="product-card">
            <img
                src={product.img}
                onError={(e) => e.currentTarget.src = `${product.img}`}
                height="130px"
            />
            <h2 className="productName">{product.name}</h2>
            <p className="productPrice">{product.price} ₪</p>
        </div>
    );
};

export default Product;
