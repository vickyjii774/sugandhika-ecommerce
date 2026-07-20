import { useCart } from "../context/CartContext";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    total,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-4xl font-bold">
            Your Cart is Empty
          </h1>

          <p className="mt-4 text-gray-500">
            Add some Sugandhika products to your cart.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="my-10 text-4xl font-bold">
        Shopping Cart
      </h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="mb-6 flex items-center justify-between rounded-xl border p-6"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 object-contain"
            />

            <div>
              <h2 className="font-bold">
                {item.name}
              </h2>

              <p>Rs. {item.price}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                updateQuantity(item.id, item.quantity - 1)
              }
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(item.id, item.quantity + 1)
              }
            >
              +
            </button>

            <Button
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="mt-10 text-right">
        <h2 className="text-3xl font-bold">
          Total: Rs. {total}
        </h2>

        <Button className="mt-5">
          Proceed to Checkout
        </Button>
      </div>
    </Container>
  );
}