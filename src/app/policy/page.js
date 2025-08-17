"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaGlobe, FaExclamationTriangle, FaInfoCircle, FaClock, FaCreditCard, FaTrain, FaPlane, FaWallet, FaCalendarAlt } from "react-icons/fa";

export default function PolicyPage() {
  return (
    <div className="w-full overflow-hidden">
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/10 to-secondary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-4xl font-black text-secondary mb-4">
            Cancellation, Refund & Rescheduling Policy
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At Travel Traces, your satisfaction and trust are our top priorities. Our transparent policies are designed to offer flexibility while maintaining fair operational standards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Cancellation Policy */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🔁 Cancellation Policy</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700 mb-6">
              If you wish to cancel your booking for any reason, please refer to the table below to understand the applicable refund:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Cancellation Timeline</th>
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Refund Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 font-medium">30 Days or More Before Departure</td>
                    <td className="border border-gray-300 px-6 py-4 text-green-600 font-semibold">90% of total package cost</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-6 py-4 font-medium">21 – 29 Days Before Departure</td>
                    <td className="border border-gray-300 px-6 py-4 text-blue-600 font-semibold">75% of total package cost</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 font-medium">15 – 19 Days Before Departure</td>
                    <td className="border border-gray-300 px-6 py-4 text-orange-600 font-semibold">50% of total package cost</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-6 py-4 font-medium">14 Days or Less Before Departure</td>
                    <td className="border border-gray-300 px-6 py-4 text-red-600 font-semibold">No Refund</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <h4 className="font-semibold text-red-800 mb-2">❗ Important:</h4>
              <ul className="text-red-700 space-y-1 text-sm">
                <li>• The booking token amount (₹500) per person is strictly non-refundable, regardless of the cancellation timeline.</li>
                <li>• Cancellations must be communicated via email or phone only.</li>
              </ul>
            </div>
          </section>

          {/* Refund Policy for Train/Flight Bookings */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaTrain className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🚆 Refund Policy for Train/Flight Bookings</h2>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <h4 className="font-semibold text-blue-800 mb-2">If your package includes train or flight tickets:</h4>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>• The refund for train/flight tickets will be processed as per the respective airline/IRCTC cancellation policy.</li>
                  <li>• The ticket amount will be refunded to your original bank account or payment source after 30 days from the date of trip completion (as per IRCTC processing timelines).</li>
                  <li>• The remaining refundable amount from the travel package will be credited to your Travel Traces Wallet within 72 working hours after cancellation.</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                <h4 className="font-semibold text-green-800 mb-2">If your package does not include train/flight tickets:</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• The entire refundable amount (as per the cancellation slab) will be credited to your Travel Traces Wallet within 72 working hours.</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>💼 Note:</strong> Refunds are processed only during working days (Monday to Friday). National holidays and weekends may extend processing time.
                </p>
              </div>
            </div>
          </section>

          {/* Important Financial Notes */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-full">
                <FaCreditCard className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">💸 Important Financial Notes</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <FaInfoCircle className="text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">GST Amount Paid</h4>
                  <p className="text-gray-600 text-sm">Non-refundable as per government regulations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <FaInfoCircle className="text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Ticket Cancellation Charges + Agent Charges</h4>
                  <p className="text-gray-600 text-sm">Applicable as per IRCTC/airline and agency policies. This will be deducted from your refundable amount.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <FaWallet className="text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800">Travel Traces Wallet Amount</h4>
                  <p className="text-gray-600 text-sm">Cannot be transferred to a bank account or shared with another individual. It can only be used for future bookings with Travel Traces.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Rescheduling Policy */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <FaCalendarAlt className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🔄 Rescheduling Policy</h2>
            </div>

            <p className="text-gray-700 mb-6">
              We understand the need for flexibility. If you wish to reschedule your trip, here's what applies:
            </p>

            <div className="space-y-6">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                <h4 className="font-semibold text-green-800 mb-2">✳ General Rescheduling Terms:</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Rescheduling within the same trip is allowed by paying 25% of the package cost.</li>
                  <li>• Rescheduling is subject to availability and must be requested at least 15 days before the departure date.</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <h4 className="font-semibold text-red-800 mb-2">🚫 Short Duration Trips (less than 7 days):</h4>
                <p className="text-red-700 text-sm">
                  For short trips, rescheduling requests within 15 days of departure cannot be accommodated, and such requests will be treated as cancellations.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🔔 Note:</h4>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Once a booking is rescheduled, the option to cancel that booking is not available.</li>
                  <li>• If train/flight tickets were booked using the Travel Traces Wallet, any refund related to the cancellation of those tickets will be credited back only to the wallet, not to your bank.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Cancel or Reschedule */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl sm:text-4xl font-bold text-secondary mb-6">📞 How to Cancel or Reschedule</h2>
            <p className="text-gray-700 mb-6">
              You can cancel or reschedule your trip easily through any of the following methods:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <FaPhoneAlt className="text-blue-600 text-3xl mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Call us</h3>
                <p className="text-blue-600 font-semibold">+91 84601 46012</p>
                <p className="text-gray-600 text-sm mt-1">Monday–Saturday | 11:00 AM to 07:00 PM</p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-xl">
                <FaEnvelope className="text-green-600 text-3xl mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Email us</h3>
                <p className="text-green-600 font-semibold">contact@traveltraces.in</p>
                <p className="text-gray-600 text-sm mt-1">24/7 support</p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <FaGlobe className="text-purple-600 text-3xl mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Online</h3>
                <p className="text-purple-600 font-semibold">Visit our website</p>
                <p className="text-gray-600 text-sm mt-1">Go to "Booking History" section</p>
              </div>
            </div>
          </section>

          {/* Refund Processing Timeline */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl sm:text-4xl font-bold text-secondary mb-6">✅ Refund Processing Timeline</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Component</th>
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Refund Method</th>
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Timeframe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 font-medium">Package (excluding tickets)</td>
                    <td className="border border-gray-300 px-6 py-4">Travel Traces Wallet</td>
                    <td className="border border-gray-300 px-6 py-4 text-green-600 font-semibold">Within 72 working hours</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-6 py-4 font-medium">Train Ticket Refund</td>
                    <td className="border border-gray-300 px-6 py-4">Bank Account (via IRCTC)</td>
                    <td className="border border-gray-300 px-6 py-4 text-blue-600 font-semibold">Within 30 days after trip completion</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 font-medium">Flight Ticket Refund</td>
                    <td className="border border-gray-300 px-6 py-4">Bank Account (as per airline)</td>
                    <td className="border border-gray-300 px-6 py-4 text-orange-600 font-semibold">Subject to airline's processing time</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Summary of Key Terms */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-secondary mb-6">📌 Summary of Key Terms</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Booking token of ₹500/person is non-refundable.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Refunds are partially/full based on cancellation date.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Train/flight ticket refunds follow external provider timelines.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Wallet refunds are non-transferable & valid for future Travel Traces bookings only.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Rescheduling incurs 25% charge and forfeits cancellation rights post-change.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">GST is non-refundable under any circumstances.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-secondary mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about our policies, please don't hesitate to reach out. We're here to help you travel with ease and clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:8460146012"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/80 transition-colors"
              >
                <FaPhoneAlt />
                Call Now
              </a>
              <a
                href="mailto:contact@traveltraces.in"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-secondary border-2 border-secondary rounded-full font-semibold hover:bg-secondary hover:text-white transition-colors"
              >
                <FaEnvelope />
                Email Us
              </a>
            </div>
          </section>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
