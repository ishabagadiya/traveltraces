const introText =
  "At TravelTraces, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you access and use our website for travel booking services. By using our website, you consent to the practices described in this policy.";

const policySections = [
  {
    title: "Information We Collect:",
    paragraphs: [
      "Personal Information: We may collect personal information such as your name, email address, phone number, and billing details when you make a booking or interact with our website's features. Booking Information: We gather information related to your travel preferences, including destination choices, travel dates, accommodation preferences, and other relevant details to facilitate your booking experience.",
      "Log Data: Our servers automatically collect log data, including your IP address, browser type, device information, access times, and pages visited. This information is used for website analytics and to enhance your browsing experience.",
    ],
  },
  {
    title: "How We Use Your Information:",
    paragraphs: [
      "Booking and Reservation: We use the collected information to process and manage your bookings, send confirmations, and provide customer support throughout your travel journey. Communication: We may contact you via email or phone to update you about your bookings, share relevant travel information, and inform you about promotions or special offers if you opt-in to receive such communications. Improve User Experience: Your data helps us analyze website performance, identify trends, and make improvements to our services and user interface to enhance your overall experience.",
      "Legal Compliance: We may use your information to comply with legal obligations, enforce our terms of service, and protect our rights, privacy, safety, and property.",
    ],
  },
  {
    title: "Data Sharing:",
    paragraphs: [
      "Third-Party Service Providers: We may share your information with trusted third-party partners who assist us in delivering our services, such as airlines, hotels, tour operators, and payment processors. These partners have access to the data required to fulfill your bookings but are not allowed to use it for other purposes.",
      "Legal Requirements: We may disclose your information in response to legal requests or to comply with applicable laws, regulations, or government orders.",
    ],
  },
  {
    title: "Data Security:",
    paragraphs: [
      "We implement strict security measures to protect your data from unauthorized access, alteration, or disclosure. However, no data transmission over the internet can be guaranteed to be 100% secure. Therefore, while we strive to protect your information, we cannot guarantee its absolute security.",
    ],
  },
  {
    title: "Cookies and Tracking Technologies:",
    paragraphs: [
      "We use cookies and similar tracking technologies to enhance your browsing experience and collect data about how you interact with our website. You can adjust your browser settings to refuse cookies, but it may limit some website functionalities.",
    ],
  },
  {
    title: "Changes to Privacy Policy:",
    paragraphs: [
      "We may update this Privacy Policy periodically to reflect changes in our practices. We will post the revised version with the effective date on our website. Your continued use of the website constitutes your acceptance of the updated policy. For any questions, concerns, or requests related to your privacy, please contact us.",
      "Thank you for choosing TravelTraces. We are dedicated to ensuring a safe and enjoyable journey for all our valued users.",
    ],
  },
];

const sectionHeadingClass = "mt-5 text-lg font-extrabold text-secondary";
const paragraphClass = "text-sm leading-7 text-gray-700";

const boldLabelRegex = /(^| )([A-Za-z][A-Za-z /-]*:)/g;

const formatParagraph = (text) => {
  const parts = text.split(boldLabelRegex).filter(Boolean);

  return parts.map((part, index) => {
    const isLabel = /[A-Za-z][A-Za-z /-]*:$/.test(part.trim());
    if (isLabel) {
      return (
        <span key={`${part}-${index}`} className="font-semibold">
          {part}
        </span>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
};

export default function PrivacyPolicyContent() {
  return (
    <main className="w-full bg-[#dfdfdf] py-8 sm:py-10">
      <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <h1 className="mb-3 text-lg font-extrabold text-secondary sm:text-xl">Privacy Policy</h1>
        <p className={paragraphClass}>{introText}</p>

        {policySections.map((section) => (
          <div key={section.title}>
            <h2 className={sectionHeadingClass}>{section.title}</h2>
            {section.paragraphs.map((paragraph, idx) => (
              <p key={`${section.title}-${idx}`} className={`${paragraphClass} ${idx === 0 ? "mt-2" : "mt-1"}`}>
                {formatParagraph(paragraph)}
              </p>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
