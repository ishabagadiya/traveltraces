"use client";

const introParagraphs = [
  "By confirming a booking with Travel Traces, the participant acknowledges having read, understood, and agreed to the following terms and conditions in full.",
  "At Travel Traces, your satisfaction and trust are our top priorities. While we would love to see you on every trip, we understand that plans can change. Our transparent cancellation and refund policies are designed to offer flexibility while allowing us to maintain fair operational standards.",
];

const sections = [
  {
    title: "Booking Confirmation",
    paragraphs: [
      "A trek or trip with Travel Traces is considered confirmed only after an official confirmation email is issued.",
      "By booking any travel service with Travel Traces, it is assumed that the participant unconditionally accepts all terms and conditions outlined herein.",
    ],
  },
  {
    title: "Adventure Activities and Risk Acknowledgement",
    paragraphs: [
      "All adventure activities (trekking, camping, river crossing, etc.) are complementary in nature, even when mentioned in the itinerary.",
      "In the event of unforeseen conditions like bad weather, political unrest, natural calamities, or other force majeure, if any activity is canceled, no refund shall be applicable.",
      "Adventure travel involves inherent personal and physical risk, including potential injury, illness, or death. By booking, the participant assumes full responsibility and releases Travel Traces from all liabilities related to such risks.",
    ],
  },
  {
    title: "Trip Alterations or Cancellations",
    paragraphs: [
      "Travel Traces reserves the right to modify or cancel any part of the itinerary due to circumstances beyond our control (weather, strikes, operational issues, etc.).",
      "In such events, any additional costs incurred (accommodation, transport, food, etc.) shall be borne by the participant.",
      "If the trip is carried on under a revised itinerary, it will be considered that the participant has accepted the changes.",
    ],
  },
  {
    title: "Package Inclusions and Cost Breakdown",
    paragraphs: [
      "Travel Traces does not provide a detailed cost breakup for the package price.",
      "All packages must be fully paid prior to the start of the journey.",
    ],
  },
  {
    title: "Mandatory Travel Documents",
    paragraphs: [
      "Participants must carry valid original and photocopy of government-issued ID proofs.",
      "One photocopy must be submitted to Travel Traces before the trip.",
      "Failure to present valid ID or documentation may lead to denial of service without any refund liability.",
    ],
  },
  {
    title: "Health Disclosure",
    paragraphs: [
      "Any physical or mental disability must be disclosed at the time of booking for yourself or anyone you are booking for.",
      "Failure to do so may result in termination from the trip at any stage, without refund, if it poses a risk to the individual or the group.",
    ],
  },
  {
    title: "Medical and Fitness Responsibility",
    paragraphs: [
      "It is the participant's responsibility to consult a doctor and obtain necessary vaccinations before the trip.",
      "Travel Traces is not liable for any health issues arising during or after the trip.",
    ],
  },
  {
    title: "Travel Etiquette and Group Conduct",
    paragraphs: [
      "In group travel, participants must maintain respectful behavior. Any act of aggression, misbehavior, or disruption may result in removal from the group at your own expense.",
      "Any damage to property or discomfort caused to co-travelers may incur a penalty.",
    ],
  },
  {
    title: "Timely Reporting and Transportation",
    paragraphs: [
      "It is the participant's responsibility to report on time for transportation (bus, train, flight).",
      "Travel Traces is not liable if the participant misses a departure or fails to board the group transport.",
      "All participants must travel together in the assigned group vehicle unless otherwise permitted.",
    ],
  },
  {
    title: "Tickets and Third-Party Services",
    paragraphs: [
      "For bookings involving train, flight, or bus tickets, any charges deducted by third-party platforms (like IRCTC, airlines, or OTAs) will be borne by the participant.",
      "Refunds will be processed after deducting such charges as per third-party policies.",
    ],
  },
  {
    title: "Luggage and Personal Belongings",
    paragraphs: [
      "Travel Traces shall not be responsible for loss or theft of personal belongings, documents, or valuables during the trip, regardless of the cause.",
    ],
  },
  {
    title: "Media and Promotional Content",
    paragraphs: [
      "By participating in a Travel Traces trip, you consent to being photographed or filmed during activities, which may be used for social media or marketing purposes.",
      "We ensure that your privacy and safety are respected at all times.",
    ],
  },
  {
    title: "Substance Policy",
    paragraphs: [
      "Smoking, alcohol consumption, or use of prohibited substances (for example weed or hashish) is strictly forbidden during travel in transport vehicles and may result in termination from the trip without refund.",
    ],
  },
  {
    title: "Accommodation and Amenities",
    paragraphs: [
      "Allocation of accommodation and amenities is handled by the Travel Traces team or trip leader. Their decision will be final and binding.",
      "Participants should understand that trekking and adventure travel may not offer home-like comfort. Patience, flexibility, and team spirit are expected at all times.",
    ],
  },
  {
    title: "Force Majeure and Limitation of Liability",
    paragraphs: [
      "Travel Traces does not own or control airlines, hotels, restaurants, or transport companies. Therefore, we are not liable for any schedule changes, service breakdowns, or delays caused by such third parties.",
      "Participants must understand the risks of adventure travel, including political, cultural, and geographical challenges, and release Travel Traces from all claims arising from such risks.",
    ],
  },
  {
    title: "Cancellation Policy",
    paragraphs: [
      "30 days or more before departure: 90% of total package cost is refundable.",
      "21 to 29 days before departure: 75% of total package cost is refundable.",
      "15 to 19 days before departure: 50% of total package cost is refundable.",
      "14 days or less before departure: No refund.",
      "The booking token amount (INR 500) per person is strictly non-refundable, regardless of the cancellation timeline.",
      "Cancellations must be communicated via email or phone only.",
    ],
  },
  {
    title: "Refund Policy for Train and Flight Bookings",
    paragraphs: [
      "If your package includes train or flight tickets, the refund for train or flight tickets will be processed as per the respective airline or IRCTC cancellation policy.",
      "The ticket amount will be refunded to your original bank account or payment source after 30 days from the date of trip completion (as per IRCTC processing timelines).",
      "The remaining refundable amount from the travel package will be credited to your Travel Traces Wallet within 72 working hours after cancellation.",
      "If your package does not include train or flight tickets, the entire refundable amount (as per the cancellation slab) will be credited to your Travel Traces Wallet within 72 working hours.",
      "Refunds are processed only during working days (Monday to Friday). National holidays and weekends may extend processing time.",
    ],
  },
  {
    title: "Important Financial Notes",
    paragraphs: [
      "GST amount paid is non-refundable as per government regulations.",
      "Ticket cancellation charges plus agent charges are applicable as per IRCTC or airline and agency policies, and these will be deducted from your refundable amount.",
      "Travel Traces Wallet amount cannot be transferred to a bank account or shared with another individual. It can only be used for future bookings with Travel Traces.",
    ],
  },
  {
    title: "Rescheduling Policy",
    paragraphs: [
      "Rescheduling within the same trip is allowed by paying 25% of the package cost.",
      "Rescheduling is subject to availability and must be requested at least 15 days before the departure date.",
      "For short duration trips (less than 7 days), rescheduling requests within 15 days of departure cannot be accommodated, and such requests will be treated as cancellations.",
      "Once a booking is rescheduled, the option to cancel that booking is not available.",
      "If train or flight tickets were booked using the Travel Traces Wallet, any refund related to cancellation of those tickets will be credited back only to the wallet, not to your bank.",
    ],
  },
  {
    title: "How to Cancel or Reschedule",
    paragraphs: [
      "Call us: +91 84601 46012 (Monday to Saturday | 11:00 AM to 07:00 PM).",
      "Email us: contact@traveltraces.in.",
      "Online: Visit the Booking History section on our website and raise a cancellation or rescheduling request.",
    ],
  },
  {
    title: "Refund Processing Timeline",
    paragraphs: [
      "Package (excluding tickets): Travel Traces Wallet, within 72 working hours.",
      "Train ticket refund: Bank account (via IRCTC), within 30 days after trip completion.",
      "Flight ticket refund: Bank account (as per airline), subject to airline processing time.",
    ],
  },
  {
    title: "Summary of Key Terms",
    paragraphs: [
      "Booking token of INR 500 per person is non-refundable.",
      "Refunds are partial or full based on cancellation date.",
      "Train and flight ticket refunds follow external provider timelines.",
      "Wallet refunds are non-transferable and valid for future Travel Traces bookings only.",
      "Rescheduling incurs a 25% charge and forfeits cancellation rights post-change.",
      "GST is non-refundable under any circumstances.",
      "If you have any questions, please do not hesitate to reach out.",
      "We are here to help you travel with ease and clarity.",
    ],
  },
];

const headingClass = "mt-5 text-lg font-bold text-secondary";
const paragraphClass = "text-sm leading-7 text-black";
const bulletListClass = "mt-2 list-disc space-y-1 pl-5";

export default function TermsAndConditionsContent() {
  return (
    <main className="w-full bg-[#dfdfdf] py-8 sm:py-10">
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
