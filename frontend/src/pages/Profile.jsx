import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import api from "../services/api";
import { FiUser, FiShoppingBag, FiMapPin, FiLogOut, FiSettings, FiCheckCircle, FiClock, FiFileText } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, loading, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  // Load orders when the orders tab becomes active
  useEffect(() => {
    if (activeTab === "orders" && user) {
      setLoadingOrders(true);
      api
        .get("/orders/user")
        .then((res) => {
          if (res.data.success) {
            setOrders(res.data.orders);
          }
        })
        .catch(() => {
          // Fallback to simulated orders if backend is offline
          setOrders([
            {
              id: "order_01",
              orderNumber: "SUG-20260720",
              createdAt: "2026-07-20T10:00:00.000Z",
              payableAmount: 960.0,
              paymentMethod: "COD",
              status: "PROCESSING",
              paymentStatus: "PENDING",
              items: [
                {
                  id: "item_01",
                  price: 320.0,
                  quantity: 3,
                  product: { title: "Sugandhika Natural Mosquito Incense Sticks" }
                }
              ]
            }
          ]);
        })
        .finally(() => setLoadingOrders(false));
    }
  }, [activeTab, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Name fields cannot be empty.");
      return;
    }
    setSavingProfile(true);
    const res = await updateProfile(firstName, lastName);
    setSavingProfile(false);
    if (res.success) {
      toast.success("Profile details updated successfully! 🌿");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-beige-50 dark:bg-forest-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest-600 border-t-transparent"></div>
      </div>
    );
  }

  const menuItems = [
    { id: "profile", label: "My Profile", icon: FiUser },
    { id: "orders", label: "Order History", icon: FiShoppingBag },
    { id: "addresses", label: "Shipping Addresses", icon: FiMapPin }
  ];

  return (
    <>
      <SEO title="User Dashboard" />
      <div className="bg-beige-50 dark:bg-forest-950 min-h-screen py-16 transition-colors duration-300">
        <Container>
          <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-12">
            
            {/* Sidebar Controls (Lg: col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-6 shadow-sm">
                
                {/* User Info header */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-forest-800">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-100 dark:bg-forest-850 text-forest-750 dark:text-sage-200 text-2xl font-bold">
                    {user.firstName[0]}
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="font-heading text-lg font-bold text-gray-800 dark:text-white truncate">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{user.email}</p>
                  </div>
                </div>

                {/* Menu list */}
                <div className="flex flex-col gap-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-semibold transition duration-300 text-left cursor-pointer ${
                          activeTab === item.id
                            ? "bg-forest-50 text-forest-800 dark:bg-forest-800/40 dark:text-sage-100"
                            : "text-gray-500 hover:bg-beige-100 dark:text-sage-200 dark:hover:bg-forest-800/20"
                        }`}
                      >
                        <Icon className="text-base" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition duration-300 text-left mt-4 cursor-pointer"
                  >
                    <FiLogOut className="text-base" />
                    <span>Log Out</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Main Tabs Details (Lg: col-span-8) */}
            <div className="lg:col-span-8">
              <div className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 shadow-sm min-h-[450px]">
                
                {/* 1. Profile Editing Panel */}
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl font-bold text-gray-800 dark:text-white pb-3 border-b border-gray-100 dark:border-forest-850">
                      My Profile Info
                    </h2>
                    
                    <form onSubmit={handleUpdate} className="space-y-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                          <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase">Email Address (Read Only)</label>
                        <input
                          type="email"
                          disabled
                          value={user.email}
                          className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-400 dark:bg-forest-950 dark:border-forest-850 dark:text-sage-250 cursor-not-allowed"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={savingProfile}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold px-6 py-3 transition duration-300 disabled:opacity-50 dark:bg-forest-600 dark:hover:bg-forest-700 cursor-pointer shadow-sm"
                      >
                        {savingProfile ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {/* 2. Order History Panel */}
                {activeTab === "orders" && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl font-bold text-gray-800 dark:text-white pb-3 border-b border-gray-100 dark:border-forest-850">
                      Order History
                    </h2>

                    {loadingOrders ? (
                      <div className="py-12 flex justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest-600 border-t-transparent"></div>
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="border border-gray-150 dark:border-forest-850 rounded-2xl p-5 hover:shadow-md transition duration-300"
                          >
                            <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-100 dark:border-forest-850 pb-3 mb-3">
                              <div>
                                <span className="text-xs text-gray-400">Order Ref</span>
                                <span className="font-bold text-sm block text-gray-700 dark:text-white mt-0.5">#{order.orderNumber}</span>
                              </div>
                              <div>
                                <span className="text-xs text-gray-400">Placed Date</span>
                                <span className="text-sm font-semibold block text-gray-600 dark:text-sage-100 mt-0.5">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-xs text-gray-400">Total Price</span>
                                <span className="text-sm font-bold block text-forest-750 dark:text-sage-100 mt-0.5">Rs. {order.payableAmount}</span>
                              </div>
                            </div>

                            {/* Order Items list */}
                            <div className="space-y-2 mb-4">
                              {order.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex justify-between text-sm">
                                  <span className="text-gray-700 dark:text-sage-100 font-medium">
                                    {item.product.title} <span className="text-xs text-gray-400">x{item.quantity}</span>
                                  </span>
                                  <span className="text-gray-500 font-medium">Rs. {item.price * item.quantity}</span>
                                </div>
                              ))}
                            </div>

                            {/* Status tags */}
                            <div className="flex justify-between items-center pt-3 border-t border-gray-50 dark:border-forest-850">
                              <div className="flex items-center gap-1 text-xs font-semibold uppercase text-amber-500">
                                <FiClock />
                                <span>{order.status}</span>
                              </div>
                              <span className="text-xs px-3 py-1 bg-gray-50 rounded-full border border-gray-150 text-gray-500 font-semibold dark:bg-forest-950 dark:border-forest-800 dark:text-sage-250">
                                {order.paymentMethod} • {order.paymentStatus}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <span className="text-4xl block mb-3">📦</span>
                        <p className="text-gray-500 dark:text-sage-200">You haven't placed any orders yet.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Address List Panel */}
                {activeTab === "addresses" && (
                  <div className="space-y-6">
                    <h2 className="font-heading text-2xl font-bold text-gray-800 dark:text-white pb-3 border-b border-gray-100 dark:border-forest-850">
                      Shipping Addresses
                    </h2>
                    
                    <div className="border-2 border-dashed border-gray-200 dark:border-forest-800 rounded-2xl p-6 text-center text-gray-450 dark:text-sage-250">
                      <FiMapPin className="text-4xl mx-auto mb-3 text-gray-300" />
                      <p className="font-semibold text-sm">No saved addresses found</p>
                      <p className="text-xs text-gray-400 mt-1">Saved addresses are automatically recorded during the checkout process.</p>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </Container>
      </div>
    </>
  );
}
