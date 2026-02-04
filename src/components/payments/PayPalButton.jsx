import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import axios from "axios";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function PayPalButton({ orderId, onSuccess, onCancel }) {
  const token =
    localStorage.getItem("access") ||
    sessionStorage.getItem("access");

  const [processing, setProcessing] = useState(false);

  return (
    <PayPalButtons
      disabled={processing}

      /* 🔥 VERY IMPORTANT PART */
      fundingSource={FUNDING.CARD}

      style={{
        layout: "vertical",
        color: "black",
        shape: "rect",
        label: "pay",
        
      }}

      createOrder={async () => {
        setProcessing(true);

        const res = await axios.post(
          `${API_BASE}/api/payments/paypal/create/`,
          { order_id: orderId },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (res.data.free) {
          setProcessing(false);
          onSuccess?.();
          return "";
        }

        return res.data.paypal_order_id;
      }}

      onApprove={async (data) => {
        try {
          await axios.post(
            `${API_BASE}/api/payments/paypal/capture/`,
            { paypal_order_id: data.orderID },
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );

          setProcessing(false);
          onSuccess?.();
        } catch (err) {
          console.error("Capture error:", err);
          setProcessing(false);
          alert("Payment failed");
        }
      }}

      onCancel={() => {
        setProcessing(false);
        onCancel?.();
      }}

      onError={(err) => {
        console.error("PayPal error:", err);
        setProcessing(false);
        alert("Payment failed. Try again.");
      }}
    />
  );
}
