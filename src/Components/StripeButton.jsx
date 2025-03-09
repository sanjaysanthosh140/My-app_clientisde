import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const StripeButton = (total) => {
  // $10.00 (in cents)
  const [amount] = useState(total.amount); 
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      // Step 1: Get clientSecret from backend
      const {
        data: { clientSecret },
      } = await axios.post(
        "http//:localhost:4000/user_side/payment", 
        {
        amount: amount,
      });
      console.log("clientSecret", clientSecret);
      // Step 2: Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error);
        setPaymentStatus("Payment failed!");
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent);
        setPaymentStatus("Payment succeeded! 🎉");
      }
    } catch (error) {
      console.error("Error:", error);
      setPaymentStatus("Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Test Payment (Stripe Demo)</h2>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
                // If you need a white background, use one of these formats instead:
                backgroundColor: "rgb(255, 255, 255)" // or
                // backgroundColor: "#FFFFFF" // or
                // backgroundColor: "hsl(0, 0%, 100%)"
              },
              invalid: { color: "#9e2146" },
            },
          }}
          
        />
        <button
          type="submit"
          disabled={!stripe || loading}
          style={{
            marginTop: "20px",
            padding: "14px 28px",
            backgroundColor: loading ? "#94a3b8" : "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            transform: "translateY(0)",
            "&:hover": {
              backgroundColor: loading ? "#94a3b8" : "#4338ca",
              transform: "translateY(-1px)",
              boxShadow:
                "0 6px 8px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.06)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow:
                "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)",
            },
          }}
        >
          {loading ? "Processing..." : `Pay $${total.amount}`}
        </button>
      </form>
      {paymentStatus && <p style={{ marginTop: "20px" }}>{paymentStatus}</p>}
    </div>
  );
};

export default StripeButton;
