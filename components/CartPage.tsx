import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useCart } from "../contexts/CartContext";
import { 
  ShoppingCart, Trash2, Plus, Minus, MapPin, 
  CreditCard, CheckCircle, ArrowRight, Package, 
  AlertCircle, Tag, X
} from "lucide-react";
import type { PageView } from "../App";

interface CartPageProps {
  onNavigate: (view: PageView) => void;
  user: any;
  onLoginRequired: () => void;
}

export function CartPage({ onNavigate, user, onLoginRequired }: CartPageProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getItemCount, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const deliveryCharge = getTotalPrice() > 500 ? 0 : 40;
  const discount = getTotalPrice() > 1000 ? 100 : 0;
  const totalAmount = getTotalPrice() + deliveryCharge - discount;

  const handleCheckout = () => {
    if (!user) {
      onLoginRequired();
      return;
    }

    const hasPrescriptionMedicine = items.some(item => item.prescriptionRequired);
    if (hasPrescriptionMedicine) {
      const confirm = window.confirm(
        "⚠️ Your cart contains medicines that require prescription.\n\nPlease ensure you have uploaded a valid prescription.\n\nProceed to checkout?"
      );
      if (!confirm) return;
    }

    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    if (!address || !city || !pincode) {
      alert("Please fill in all address details");
      return;
    }

    // Simulate order placement
    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setShowSuccess(false);
      alert("✅ Order placed successfully!\n\nOrder ID: #ECL" + Math.random().toString(36).substr(2, 9).toUpperCase() + "\n\nYou will receive delivery updates via SMS/Email.");
      onNavigate('home');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Navigation onNavigate={onNavigate} cartCount={getItemCount()} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some medicines or healthcare products to get started
            </p>
            <Button onClick={() => onNavigate('medicine')} size="lg">
              Browse Medicines
            </Button>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex gap-4">
                    <div className="text-5xl">{item.image || '📦'}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg">{item.name}</h3>
                          {item.prescriptionRequired && (
                            <Badge variant="destructive" className="text-xs mt-1">
                              Prescription Required
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      
                      <p className="text-2xl text-pink-600 mb-4">₹{item.price}</p>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-4">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-muted-foreground">
                          Subtotal: ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <Button variant="outline" onClick={clearCart} className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <h3 className="text-xl mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4 pb-4 border-b">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({getItemCount()} items)</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Charge</span>
                    <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-xl mb-6">
                  <span>Total</span>
                  <span className="text-pink-600">₹{totalAmount}</span>
                </div>

                {getTotalPrice() < 500 && (
                  <div className="p-3 bg-yellow-50 rounded-lg mb-4 flex items-start gap-2">
                    <Tag className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      Add items worth ₹{500 - getTotalPrice()} more to get FREE delivery!
                    </p>
                  </div>
                )}

                {getTotalPrice() > 1000 && (
                  <div className="p-3 bg-green-50 rounded-lg mb-4 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <p className="text-sm text-green-800">
                      🎉 You saved ₹{discount} on this order!
                    </p>
                  </div>
                )}

                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="max-w-2xl w-full p-8 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl">Checkout</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCheckout(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {showSuccess ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl mb-4">Order Placed Successfully!</h3>
                <p className="text-muted-foreground mb-6">
                  Your order is confirmed and will be delivered soon.
                </p>
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-pink-600 border-t-transparent mx-auto"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Delivery Address */}
                <div>
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm mb-2 block">Complete Address *</label>
                      <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House no., Building name, Street, Area"
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm mb-2 block">City *</label>
                        <Input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm mb-2 block">PIN Code *</label>
                        <Input
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="6-digit PIN"
                          maxLength={6}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Order Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t flex justify-between">
                      <span>Total Amount</span>
                      <span className="text-pink-600">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 border-2 border-pink-600 rounded-lg bg-pink-50">
                      <div className="flex items-center gap-3">
                        <input type="radio" checked readOnly />
                        <div>
                          <p>Cash on Delivery (COD)</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-2 rounded-lg opacity-50">
                      <div className="flex items-center gap-3">
                        <input type="radio" disabled />
                        <div>
                          <p>Online Payment</p>
                          <p className="text-sm text-muted-foreground">UPI, Card, Net Banking (Coming Soon)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prescription Warning */}
                {items.some(item => item.prescriptionRequired) && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="mb-2"><strong>Important:</strong></p>
                      <p>Your order contains prescription medicines. Please have your valid prescription ready at the time of delivery.</p>
                    </div>
                  </div>
                )}

                <Button onClick={handlePlaceOrder} className="w-full" size="lg">
                  Place Order (₹{totalAmount})
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
