import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card className="group overflow-hidden p-0">
      {/* Product Image */}

<div className="relative h-64 overflow-hidden bg-green-50">
  <Link to={`/product/${product.slug}`}>
    <img
      src={product.image}
      alt={product.name}
      className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-110"
    />
  </Link>

  <div className="absolute left-4 top-4">
    <Badge color="green">{product.badge}</Badge>
  </div>

  <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow hover:bg-green-50">
    <FiHeart size={20} />
  </button>
</div>

      {/* Product Info */}
      <div className="p-6">
<Link to={`/product/${product.slug}`}>
  <h3 className="text-lg font-bold hover:text-green-700 transition-colors">
    {product.name}
  </h3>
</Link>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">
          <FiStar className="fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{product.rating}</span>
          <span className="text-gray-500">
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-center gap-3">
          <span className="text-2xl font-bold text-green-700">
            Rs. {product.price}
          </span>

          <span className="text-gray-400 line-through">
            Rs. {product.oldPrice}
          </span>
        </div>

        {/* Button */}
        <Button
          className="mt-6 w-full flex items-center justify-center gap-2"
        >
          <FiShoppingCart />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}