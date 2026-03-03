import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { salesApi } from "@/services/api";

const OrderPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    try {
      // Create a sale for each cart item
      for (const item of cart) {
        await salesApi.create({
          productId: item._id,
          quantity: item.quantity,
        });
      }

      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Order failed", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate("/products")}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-12">Your Order</h1>

      <div className="grid lg:grid-cols-3 gap-12">

        {/* ================= LEFT: ITEMS ================= */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border rounded-xl p-6 bg-card"
            >
              <div className="flex items-center gap-6">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    ₹{item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      className="px-3 py-1 border rounded-md"
                    >
                      -
                    </button>

                    <span className="font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="px-3 py-1 border rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-lg">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 mt-2 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= RIGHT: SUMMARY ================= */}
        <div className="border rounded-2xl p-8 bg-card h-fit">
          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default OrderPage;
