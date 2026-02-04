import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiVideo,
  FiCalendar,
  FiPackage,
  FiLogOut,
  FiCheckCircle,
} from "react-icons/fi";

export default function UserDashboard() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const token =
    localStorage.getItem("access") ||
    sessionStorage.getItem("access");

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [subscription, setSubscription] = useState(null);

  /* -------------------------------
     AUTH GUARD
  -------------------------------- */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchDashboard();
  }, [token]);

  /* -------------------------------
     FETCH DASHBOARD DATA
  -------------------------------- */
  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/accounts/dashboard/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Dashboard fetch failed");

      const data = await res.json();

      setUser(data.user);
      setOrders(data.orders || []);
      setSubscription(data.subscription || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------
     LOGOUT
  -------------------------------- */
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-sky-100 rounded-xl">
              <FiUser className="text-2xl text-sky-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                Welcome, {user?.first_name}
              </h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <FiLogOut />
            Logout
          </button>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            icon={<FiPackage />}
            label="Total Orders"
            value={orders.length}
          />
          <StatCard
            icon={<FiVideo />}
            label="Purchased Webinars"
            value={orders.reduce((a, o) => a + o.items.length, 0)}
          />
          <StatCard
            icon={<FiCalendar />}
            label="Subscription"
            value={subscription ? "Active" : "None"}
            highlight={!!subscription}
          />
        </div>

        {/* ================= SUBSCRIPTION ================= */}
        {subscription && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-bold mb-4">Active Subscription</h2>
            <div className="flex items-center gap-3 text-green-600">
              <FiCheckCircle />
              <span>
                {subscription.plan_name} — valid till{" "}
                {new Date(subscription.end_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        {/* ================= ORDERS ================= */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-bold mb-4">Your Orders</h2>

          {orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">${order.total}</p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        order.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */
function StatCard({ icon, label, value, highlight }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
      <div
        className={`p-3 rounded-xl ${
          highlight ? "bg-green-100 text-green-600" : "bg-sky-100 text-sky-600"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
