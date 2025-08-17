"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { FaShieldAlt, FaUserShield, FaCookieBite, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaEnvelope, FaGavel, FaHandshake, FaLock, FaEye, FaUsers, FaCar, FaTicketAlt, FaCamera, FaSmokingBan, FaBed, FaExclamationCircle } from "react-icons/fa";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/10 to-secondary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-4xl font-black text-secondary mb-4">
            Privacy Policy & Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At Travel Traces, we are committed to protecting your privacy and ensuring transparent terms for all our services. Your trust and security are our top priorities.
          </p>
          <div className="mt-6 text-sm text-gray-600">
            <p>Last Updated: 10th July 2025</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Declaration Section */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaGavel className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">DECLARATION</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-xs sm:text-sm">
                Travel Traces hereby declares that we will never misuse, sell, or exploit any user data for any malicious purpose. Your privacy and trust are of utmost importance to us. However, if required by law, or upon receiving a legal notice, we are obligated to share relevant user data under the Right to Information Act or as per any legal mandate.
              </p>
              <p className="text-xs sm:text-sm">
                All legal matters shall fall under the jurisdiction of Ahmedabad, Gujarat, where our firm is registered.
              </p>
            </div>
          </section>

          {/* Website Privacy */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <FaEye className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">WEBSITE PRIVACY</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700 mb-6">
              Our website is designed to provide seamless travel services and information to our users. To facilitate this, we may collect personal data such as name, phone number, email address, etc. This information is used solely for service facilitation and is accessed only by authorized personnel of Travel Traces.
            </p>
          </section>

          {/* Data Collection */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-full">
                <FaUserShield className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">DATA COLLECTION</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700 mb-4">
              We collect personal information including (but not limited to) your:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaCheckCircle className="text-green-600" />
                <span className="text-xs sm:text-sm text-gray-700">Name</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaCheckCircle className="text-green-600" />
                <span className="text-xs sm:text-sm text-gray-700">Email address</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaCheckCircle className="text-green-600" />
                <span className="text-xs sm:text-sm text-gray-700">Contact number</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaCheckCircle className="text-green-600" />
                <span className="text-xs sm:text-sm text-gray-700">Travel preferences</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FaCheckCircle className="text-green-600" />
                <span className="text-xs sm:text-sm text-gray-700">Location/IP data (analytics)</span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700 mt-4">
              This data is collected only to help us serve you better and ensure efficient delivery of our services.
            </p>
          </section>

          {/* Cookies Usage Policy */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-100 rounded-full">
                <FaCookieBite className="text-yellow-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">COOKIES USAGE POLICY</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700">
              We use cookies to enhance your browsing experience, reduce loading times, and understand user behavior. You can choose to disable cookies through your browser settings if you prefer not to share this data. However, disabling cookies may affect your overall experience on our site.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 rounded-full">
                <FaExclamationTriangle className="text-orange-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">THIRD-PARTY LINKS</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700">
              Our website may contain links to third-party websites for your convenience or reference. Travel Traces does not control or endorse these websites. Therefore, we are not responsible for any data breaches, losses, or issues that may arise from accessing these external links.
            </p>
          </section>

          {/* User Data Protection */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <FaShieldAlt className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">USER DATA PROTECTION</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700 mb-4">
              All personal data shared with Travel Traces is:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Collected transparently</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Stored securely</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Shared only with internal team members involved in your travel planning</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-gray-700">Never sold, rented, or misused</span>
              </div>
            </div>
            
            <p className="text-gray-700 mt-4">
              We have robust digital safeguards in place to protect user information from unauthorized access or leaks.
            </p>
          </section>

          {/* Grievance Officer */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <FaEnvelope className="text-red-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">GRIEVANCE OFFICER</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700 mb-4">
              If you have any concerns, questions, or grievances regarding our Privacy Policy or the handling of your data, please contact our Grievance Officer:
            </p>
            
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-blue-800 font-semibold">Email: contact@traveltraces.in</p>
            </div>
          </section>

          {/* Terms & Conditions Section */}
          <section className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8">
            <h2 className="text-2xl sm:text-4xl font-bold text-secondary mb-6 text-center">General Terms & Conditions</h2>
            <p className="text-xs sm:text-sm text-gray-700 mb-6 text-center">
              By confirming a booking with Travel Traces, the participant acknowledges having read, understood, and agreed to the following terms and conditions in full.
            </p>
          </section>

          {/* Booking Confirmation */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">✅ Booking Confirmation</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• A trek or trip with Travel Traces is considered confirmed only after an official confirmation email is issued.</p>
              <p className="text-xs sm:text-sm">• By booking any travel service with Travel Traces, it is assumed that the participant unconditionally accepts all terms and conditions outlined herein.</p>
            </div>
          </section>

          {/* Adventure Activities & Risk Acknowledgement */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 rounded-full">
                <FaExclamationTriangle className="text-orange-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🧗‍♂ Adventure Activities & Risk Acknowledgement</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-xs sm:text-sm">• All adventure activities (trekking, camping, river crossing, etc.) are complementary in nature, even when mentioned in the itinerary.</p>
              <p className="text-xs sm:text-sm">• In the event of unforeseen conditions like bad weather, political unrest, natural calamities, or other force majeure, if any activity is canceled, no refund shall be applicable.</p>
              <p className="text-xs sm:text-sm">• Adventure travel involves inherent personal and physical risk, including potential injury, illness, or death. By booking, the participant assumes full responsibility and releases Travel Traces from all liabilities related to such risks.</p>
            </div>
          </section>

          {/* Trip Alterations or Cancellations */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaExclamationCircle className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🔄 Trip Alterations or Cancellations</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• Travel Traces reserves the right to modify or cancel any part of the itinerary due to circumstances beyond our control (weather, strikes, operational issues, etc.).</p>
              <p className="text-xs sm:text-sm">• In such events, any additional costs incurred (accommodation, transport, food, etc.) shall be borne by the participant.</p>
              <p className="text-xs sm:text-sm">• If the trip is carried on under a revised itinerary, it will be considered that the participant has accepted the changes.</p>
            </div>
          </section>

          {/* Package Inclusions and Cost Breakdown */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-full">
                <FaInfoCircle className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🧾 Package Inclusions and Cost Breakdown</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• Travel Traces does not provide a detailed cost breakup for the package price.</p>
              <p className="text-xs sm:text-sm">• All packages must be fully paid prior to the start of the journey.</p>
            </div>
          </section>

          {/* Mandatory Travel Documents */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-100 rounded-full">
                <FaExclamationTriangle className="text-yellow-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">📄 Mandatory Travel Documents</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• Participants must carry valid original and photocopy of government-issued ID proofs.</p>
              <p className="text-xs sm:text-sm">• One photocopy must be submitted to Travel Traces before the trip.</p>
              <p className="text-xs sm:text-sm">• Failure to present valid ID or documentation may lead to denial of service without any refund liability.</p>
            </div>
          </section>

          {/* Health Disclosure */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <FaTimesCircle className="text-red-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">❌ Health Disclosure</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• Any physical or mental disability must be disclosed at the time of booking—for yourself or anyone you're booking for.</p>
              <p className="text-xs sm:text-sm">• Failure to do so may result in termination from the trip at any stage, without refund, if it poses a risk to the individual or the group.</p>
            </div>
          </section>

          {/* Medical & Fitness Responsibility */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaInfoCircle className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">💉 Medical & Fitness Responsibility</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• It is the participant's responsibility to consult a doctor and obtain necessary vaccinations before the trip.</p>
              <p className="text-xs sm:text-sm">• Travel Traces is not liable for any health issues arising during or after the trip.</p>
            </div>
          </section>

          {/* Travel Etiquette & Group Conduct */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <FaUsers className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🧳 Travel Etiquette & Group Conduct</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• In group travel, participants must maintain respectful behavior. Any act of aggression, misbehavior, or disruption may result in removal from the group at your own expense.</p>
              <p className="text-xs sm:text-sm">• Any damage to property or discomfort caused to co-travelers may incur a penalty.</p>
            </div>
          </section>

          {/* Timely Reporting & Transportation */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-full">
                <FaCar className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🕰 Timely Reporting & Transportation</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• It is the participant's responsibility to report on time for transportation (bus, train, flight).</p>
              <p className="text-xs sm:text-sm">• Travel Traces is not liable if the participant misses a departure or fails to board the group transport.</p>
              <p className="text-xs sm:text-sm">• All participants must travel together in the assigned group vehicle unless otherwise permitted.</p>
            </div>
          </section>

          {/* Tickets & Third-Party Services */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 rounded-full">
                <FaTicketAlt className="text-orange-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🎟 Tickets & Third-Party Services</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• For bookings involving train/flight/bus tickets, any charges deducted by third-party platforms (like IRCTC, airlines, OTAs) will be borne by the participant.</p>
              <p className="text-xs sm:text-sm">• Refunds will be processed after deducting such charges as per third-party policies.</p>
            </div>
          </section>

          {/* Luggage & Personal Belongings */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-100 rounded-full">
                <FaExclamationTriangle className="text-yellow-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🧳 Luggage & Personal Belongings</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700">
              Travel Traces shall not be responsible for loss or theft of personal belongings, documents, or valuables during the trip, regardless of the cause.
            </p>
          </section>

          {/* Media & Promotional Content */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaCamera className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">📷 Media & Promotional Content</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• By participating in a Travel Traces trip, you consent to being photographed or filmed during activities, which may be used for social media or marketing purposes.</p>
              <p className="text-xs sm:text-sm">• We ensure that your privacy and safety are respected at all times.</p>
            </div>
          </section>

          {/* Substance Policy */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <FaSmokingBan className="text-red-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">📵 Substance Policy</h2>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700">
              Smoking, alcohol consumption, or use of prohibited substances (e.g., weed, hashish, etc.) is strictly forbidden during travel in transport vehicles and may result in termination from the trip without refund.
            </p>
          </section>

          {/* Accommodation & Amenities */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-full">
                <FaBed className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">🏨 Accommodation & Amenities</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• Allocation of accommodation and amenities is handled by the Travel Traces team or trip leader. Their decision will be final and binding.</p>
              <p className="text-xs sm:text-sm">• Participants should understand that trekking and adventure travel may not offer home-like comfort. Patience, flexibility, and team spirit are expected at all times.</p>
            </div>
          </section>

          {/* Force Majeure & Limitation of Liability */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <FaExclamationTriangle className="text-red-600 text-xl" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-secondary">⚠ Force Majeure & Limitation of Liability</h2>
            </div>
            
            <div className="space-y-3 text-gray-700">
              <p className="text-xs sm:text-sm">• Travel Traces does not own or control airlines, hotels, restaurants, or transport companies. Therefore, we are not liable for any schedule changes, service breakdowns, or delays caused by such third parties.</p>
              <p className="text-xs sm:text-sm">• Participants must understand the risks of adventure travel, including political, cultural, and geographical challenges, and release Travel Traces from all claims arising from such risks.</p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-secondary mb-4">Questions About Our Policies?</h2>
            <p className="text-xs sm:text-sm text-gray-700 mb-6">
              If you have any questions about our Privacy Policy or Terms & Conditions, please don't hesitate to reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@traveltraces.in"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/80 transition-colors"
              >
                <FaEnvelope />
                Contact Us
              </a>
              <a
                href="/policy"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-secondary border-2 border-secondary rounded-full font-semibold hover:bg-secondary hover:text-white transition-colors"
              >
                <FaHandshake />
                Cancellation Policy
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
