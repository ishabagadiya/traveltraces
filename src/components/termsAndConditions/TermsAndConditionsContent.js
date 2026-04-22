"use client";

const introParagraphs = [
  "Welcome to TravelTraces! Before you embark on your unforgettable experiences, kindly read and familiarize yourself with our Terms & Conditions:",
];

const sections = [
  {
    title: "Agreement to Terms:",
    paragraphs: [
      "By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.",
      "If you do not agree to these terms, please refrain from using the website.",
    ],
  },
  {
    title: "Use of Website:",
    paragraphs: [
      "This website is provided for informational and booking purposes only and is intended for personal, non-commercial use only.",
      "You agree to use it responsibly and not engage in any activity that may disrupt or interfere with its operation, nor for any illegal or unauthorized purpose.",
    ],
  },
  {
    title: "Booking Information:",
    paragraphs: [
      "While we strive to provide accurate and up-to-date information, we do not guarantee the availability or accuracy of travel products, services, prices, or other details listed on the website.",
      "All bookings are subject to availability and the terms and conditions of the respective service providers.",
    ],
  },
  {
    title: "Booking Confirmation & Payment:",
    paragraphs: [
      "All travellers must provide accurate personal information at the time of booking.",
      "To reserve a tour or travel experience, you must provide us with all necessary details and payments as requested.",
      "The booking is considered confirmed only after we have received the full payment or the specified advance amount.",
      "Payments can be made through various methods such as UPI, credit/debit cards, bank transfers, cash, or any other payment option mentioned by our company.",
    ],
  },
  {
    title: "Travel Documents:",
    paragraphs: [
      "It is the responsibility of each traveller to obtain and carry all required travel documents, such as passports, visas, health certificates, and any other necessary permits.",
      "We will provide general information and assistance regarding travel documents, but we are not liable for any issues arising from incomplete or incorrect documentation.",
    ],
  },
  {
    title: "Changes to Itinerary:",
    paragraphs: [
      "We reserve the right to modify/cancel the itinerary, including accommodation, transportation, and activities, due to unforeseen circumstances, safety concerns, or external factors.",
      "We shall not be liable for any failure or delay in performing our obligations due to events beyond our control, including but not limited to natural disasters, acts of terrorism, civil unrest, or government restrictions.",
      "In the event of any significant changes, we will notify you as soon as possible and offer suitable alternatives or a refund, depending on the situation.",
    ],
  },
  {
    title: "Health and Fitness:",
    paragraphs: [
      "It is essential that travellers have the appropriate health and fitness level to fully enjoy the experience. If you have any health concerns or medical conditions, please consult your physician before booking and also inform us at the time of booking.",
      "We reserve the right to deny participation in certain activities if we believe it may endanger your health or safety and disrupt the group.",
    ],
  },
  {
    title: "Personal Belongings:",
    paragraphs: [
      "We are not responsible for any loss, damage, or theft of personal belongings. It is your personal responsibility to take care of your belongings at all times.",
    ],
  },
  {
    title: "Safety:",
    paragraphs: [
      "We prioritize the safety of every traveller and follow all necessary safety protocols during the trips/activities.",
    ],
  },
  {
    title: "Punctuality & Discipline:",
    paragraphs: [
      "Participants are expected to maintain strict punctuality throughout the tour/activity, arriving at designated meeting points and departure times as per the itinerary.",
      "Adherence to the schedule is vital to ensure the smooth execution of activities and to cover all planned destinations.",
      "Failure to comply with these requirements may result in the traveller's exclusion from certain activities or termination of their participation without any entitlement to refunds or compensation.",
    ],
  },
  {
    title: "Behavior and Compliance:",
    paragraphs: [
      "Participants are expected to behave responsibly and respectfully towards fellow travellers, guides, local communities, and the environment. Also, follow the instructions of the guides and representatives and respect local customs and regulations.",
      "We reserve the right to remove any traveller from a tour or experience if their behavior jeopardizes the safety or enjoyment of others, without providing a refund.",
    ],
  },
  {
    title: "Limitation of Liability:",
    paragraphs: [
      "We and our affiliates shall not be held liable for any losses, damages, injuries, delays, accidents, inconveniences, or other irregularities caused by any circumstances.",
      "Participants undertake the tours at their own risk, and we recommend exercising caution and following our guide's instructions during activities.",
    ],
  },
  {
    title: "Photo and Video Usage:",
    paragraphs: [
      "We reserve the right to take photos/videos of traveller and can use those shared by them through email, Whatsapp, or any website link for promotional purposes.",
      "By booking or participating with us, they automatically grant us a royalty-free, perpetual, worldwide, and irrevocable license for using their images in photographs and videos that may be used for promotional material, website, social media, collateral, and any other marketing and publicity materials.",
      "We do not require their prior consent and do not need to compensate them for such use of their photographs and videos.",
    ],
  },
  {
    title: "Restrictions:",
    paragraphs: [
      "Alcohol, smoking, tobacco, drugs, and abusive language are strictly prohibited. If anyone is found to be involved in such cases, their participation will be terminated, and no further services or refunds will be provided.",
    ],
  },
  {
    title: "Complaints and Disputes:",
    paragraphs: [
      "We value your feedback and aim to provide exceptional travel experiences. If you encounter any issues during your tour/activity, please inform us promptly, either on the tour/activity or shortly after its completion. This allows us to address your concerns promptly and find a satisfactory solution.",
      "To ensure a smooth resolution process, we kindly request that you report complaints within a reasonable timeframe after the tour/activity. While we will still do our best to assist with delayed complaints, resolving issues becomes more challenging when reported at a later stage.",
      "If necessary, we are open to exploring mediation or alternative dispute resolution methods.",
      "For all disputes related to these terms, the governing jurisdiction shall be Ahmedabad, Gujarat. Any legal proceedings will take place in the appropriate jurisdiction according to the prevailing laws.",
    ],
  },
  {
    title: "Payment Policy",
    paragraphs: [
      "This Payment Policy governs all bookings made with TravelTraces (traveltraces.in) and applies to all travellers unless otherwise specified in writing.",
    ],
  },
  {
    title: "Group Trips - Payment Schedule",
    paragraphs: [
      "Domestic Group Trips: Full payment must be received at least 20 days prior to the scheduled travel date.",
      "International Group Trips: Full payment must be received at least 30 days prior to the scheduled travel date.",
      "Failure to complete full payment within the specified timeline may result in automatic cancellation of the booking, without further notice, and applicable cancellation charges will apply.",
    ],
  },
  {
    title: "Payment at the Time of Booking",
    paragraphs: [
      "At the time of booking, travellers are required to pay an advance amount as per the specific destination or trip policy communicated by TravelTraces.",
      "In addition, 100% payment is required at the time of booking for the following services: Flight tickets, additional or optional services, and any non-refundable services.",
    ],
  },
  {
    title: "Private Trips - Payment Schedule",
    paragraphs: [
      "At the time of booking, travellers must pay: 100% payment for flights, visas, activities, and all non-refundable services, and 50% of the total land package amount.",
      "The remaining 50% balance of the land package must be cleared at least 30 days prior to the date of departure.",
      "Failure to complete full payment within the specified timeline may result in automatic cancellation of the booking, without further notice, along with applicable cancellation charges.",
    ],
  },
  {
    title: "Mode of Payment",
    paragraphs: [
      "Online Payments: Payments can be made through our authorised online payment gateway or TravelTraces bank account. Payment gateway charges may apply based on the selected payment mode.",
      "Cash Payments: Cash payments are accepted at our registered Ahmedabad office, subject to limits prescribed under applicable Indian laws and regulations, including the Income Tax Act.",
    ],
  },
  {
    title: "General Payment Terms",
    paragraphs: [
      "All payments must be made in Indian Rupees (INR) unless otherwise agreed in writing.",
      "A booking is considered confirmed only upon receipt of the required payment as per the applicable payment schedule.",
      "TravelTraces reserves the right to revise payment timelines or policies based on airline, hotel, visa embassy, supplier, or destination-specific requirements.",
      "Any waiver or exception to this Payment Policy must be approved in writing by an authorised representative of TravelTraces.",
    ],
  },
  {
    title: "Cancellation & Refund Policy",
    paragraphs: [
      "This Cancellation & Refund Policy is applicable to all bookings made with TravelTraces (traveltraces.in). All cancellations must be communicated in writing.",
    ],
  },
  {
    title: "Group Trips - Domestic Group Trips Cancellation Charges",
    paragraphs: [
      "Booking amount: Non-refundable.",
      "Last 15 days before departure: No refund.",
      "15–30 days before departure: 50% of the total trip cost will be deducted.",
      "31–45 days before departure: 25% of the total trip cost will be deducted.",
      "More than 45 days before departure: 10% of the total trip cost will be deducted.",
    ],
  },
  {
    title: "Group Trips - International Group Trips Cancellation Charges",
    paragraphs: [
      "Booking amount: Non-refundable.",
      "Last 30 days before departure: No refund.",
      "31–45 days before departure: 50% of the total trip cost will be deducted.",
      "More than 45 days before departure: 25% of the total trip cost will be deducted.",
    ],
  },
  {
    title: "Free Rescheduling",
    paragraphs: [
      "Free rescheduling is allowed up to 30 days before departure for Domestic Group Trips.",
      "Free rescheduling is allowed up to 45 days before departure for International Group Trips.",
      "One (1) complimentary reschedule is permitted.",
      "Actual costs incurred for non-refundable components such as flights, trains, buses, visa fees, permits, and vendor penalties will be charged.",
      "Rescheduling is subject to availability.",
      "The revised travel date must be within 12 months from the original departure date.",
      "Indirect travel arrangements such as flights, visa processing or insurance will be governed by the respective vendor policies and are typically non-refundable.",
    ],
  },
  {
    title: "Private Trips - Flights, Hotels, Trains, Buses, Activities & Experiences",
    paragraphs: [
      "Non-refundable bookings: Once booked, these services are not eligible for any refund.",
      "Refundable bookings: Refunds will be processed strictly as per the respective service provider's cancellation policy.",
      "TravelTraces Pvt. Ltd. is not responsible for delays or cancellations by airlines, hotels, trains, buses, or any third-party service providers.",
      "For international travel, travellers must ensure they hold a valid passport with a minimum validity of 12 months from the travel date.",
      "Most hotels are non-refundable within the last 20 days prior to check-in; last-minute changes or refunds may not be possible.",
    ],
  },
  {
    title: "Visa Services",
    paragraphs: [
      "TravelTraces provides visa assistance services only, including documentation support and guidance. The final decision regarding visa approval or rejection lies solely with the respective embassy or consulate.",
      "Visa fees are non-refundable under all circumstances.",
      "In case a visa is not approved before the travel date, the trip cost will be non-refundable as per the applicable cancellation policy.",
    ],
  },
  {
    title: "Land Packages",
    paragraphs: [
      "Domestic private trips: Land packages are non-refundable within the last 20 days prior to departure.",
      "International private trips: Land packages are non-refundable within the last 30 days prior to departure.",
      "Cancellations made before the above timelines will be processed as per respective service provider and vendor charges.",
    ],
  },
  {
    title: "Cancellation by TravelTraces Pvt. Ltd.",
    paragraphs: [
      "In the event of a trip being cancelled or modified due to government restrictions, natural calamities, protests, or any other circumstances beyond our control, TravelTraces may be required to alter or cancel the tour itinerary. Any refunds or credit vouchers in such situations will be governed by the respective vendor policies and what is practically feasible. No refunds will be issued for indirect travel services (such as flights, visas, or insurance) that are impacted by such changes.",
      "Indirect travel arrangements such as flights, visa processing or insurance will be governed by the respective vendor policies and are typically non-refundable.",
    ],
  },
  {
    title: "Refund",
    paragraphs: [
      "Refunds will be processed to the bank account or the original mode of payment used for the booking.",
      "Refund processing time is 7 to 14 working days from the date of cancellation confirmation.",
      "In case of cancellation of international trips, the value of credit vouchers/partial refund will be calculated based on the Rate of Exchange (ROE) prevailing on the date of cancellation.",
      "For cancellations and refund-related queries, please contact our customer support at contact@traveltraces.in or +91 90 99 599 336.",
    ],
  },
  {
    title: "Credit Voucher",
    paragraphs: [
      "Credit Vouchers are valid for 12 months from the date of issuance and can be used for future bookings with TravelTraces.",
      "Credit Vouchers are non-transferable and cannot be sold or redeemed for cash.",
      "Credit Vouchers can be redeemed only for package bookings with TravelTraces and cannot be used for flights, trains, buses, visa fees, permits, or other independent arrangements.",
      "The entire Credit Voucher amount must be used in a single transaction and cannot be split across multiple bookings. Carryover or partial usage is allowed only in specific cases with prior written approval from TravelTraces.",
    ],
  },
];

const headingClass = "mt-5 text-lg font-bold text-secondary";
const paragraphClass = "text-sm leading-7 text-black";
const bulletListClass = "mt-2 list-disc space-y-1 pl-5";

export default function TermsAndConditionsContent() {
  return (
    <main className="w-full bg-[#efefef] py-8 sm:py-10">
      <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <h1 className="mb-3 text-lg font-bold text-secondary sm:text-xl">Terms & Conditions</h1>

        {introParagraphs.map((paragraph, idx) => (
          <p key={`intro-${idx}`} className={`${paragraphClass} ${idx === 0 ? "" : "mt-1"}`}>
            {paragraph}
          </p>
        ))}

        {sections.map((section) => (
          <div key={section.title}>
            <h2 className={headingClass}>{section.title}</h2>
            <ul className={bulletListClass}>
              {section.paragraphs.map((paragraph, idx) => (
                <li key={`${section.title}-${idx}`} className={paragraphClass}>
                  {paragraph}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
