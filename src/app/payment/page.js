"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PaymentPage() {
  return (
    <div className="w-full overflow-hidden bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">
            Booking Payment
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Scan the QR code below and complete your booking payment.
          </p>

          <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-500 mb-3">Upload your QR image at:</p>
            <p className="text-sm font-semibold text-secondary mb-4">
              public/payment-qr.png
            </p>
            <img
              src="/payment-qr.png"
              alt="Payment QR Code"
              className="mx-auto w-64 h-64 object-contain rounded-lg bg-gray-100"
            />
          </div>

          <p className="text-xs text-gray-500 mt-4">
            If the QR does not load, add your file at <code>public/payment-qr.png</code>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
