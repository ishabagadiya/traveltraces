const introText =
  "At Travel Traces, we are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This Privacy Policy outlines how we collect, use, and safeguard the data you share with us. All clauses mentioned herein are in accordance with the Information Technology Act, 2025. This document is subject to periodic updates to ensure continual improvement.";

const policySections = [
  {
    title: "Last Updated:",
    paragraphs: [
      "10th July 2025",
    ],
  },
  {
    title: "DECLARATION",
    paragraphs: [
      "Travel Traces hereby declares that we will never misuse, sell, or exploit any user data for any malicious purpose. Your privacy and trust are of utmost importance to us. However, if required by law, or upon receiving a legal notice, we are obligated to share relevant user data under the Right to Information Act or as per any legal mandate.",
      "All legal matters shall fall under the jurisdiction of Ahmedabad, Gujarat, where our firm is registered.",
    ],
  },
  {
    title: "WEBSITE PRIVACY",
    paragraphs: [
      "Our website is designed to provide seamless travel services and information to our users. To facilitate this, we may collect personal data such as name, phone number, email address, etc. This information is used solely for service facilitation and is accessed only by authorized personnel of Travel Traces.",
    ],
  },
  {
    title: "DATA COLLECTION",
    paragraphs: [
      "We collect personal information including (but not limited to) your:",
      "Name",
      "Email address",
      "Contact number",
      "Travel preferences",
      "Location/IP data (in some cases for analytics)",
      "This data is collected only to help us serve you better and ensure efficient delivery of our services.",
    ],
  },
  {
    title: "COOKIES USAGE POLICY",
    paragraphs: [
      "We use cookies to enhance your browsing experience, reduce loading times, and understand user behavior. You can choose to disable cookies through your browser settings if you prefer not to share this data. However, disabling cookies may affect your overall experience on our site.",
    ],
  },
  {
    title: "THIRD-PARTY LINKS",
    paragraphs: [
      "Our website may contain links to third-party websites for your convenience or reference. Travel Traces does not control or endorse these websites. Therefore, we are not responsible for any data breaches, losses, or issues that may arise from accessing these external links.",
    ],
  },
  {
    title: "USER DATA PROTECTION",
    paragraphs: [
      "All personal data shared with Travel Traces is:",
      "Collected transparently",
      "Stored securely",
      "Shared only with internal team members involved in your travel planning",
      "Never sold, rented, or misused",
      "We have robust digital safeguards in place to protect user information from unauthorized access or leaks.",
    ],
  },
  {
    title: "GRIEVANCE OFFICER",
    paragraphs: [
      "If you have any concerns, questions, or grievances regarding our Privacy Policy or the handling of your data, please contact our Grievance Officer:",
      "Email: contact@traveltraces.in",
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
            {section.title === "USER DATA PROTECTION" ? (
              <>
                <p className={`${paragraphClass} mt-2`}>{formatParagraph(section.paragraphs[0])}</p>
                <ul className={`${paragraphClass} mt-1 list-disc pl-6`}>
                  {section.paragraphs.slice(1, 5).map((point, idx) => (
                    <li key={`${section.title}-point-${idx}`}>{point}</li>
                  ))}
                </ul>
                <p className={`${paragraphClass} mt-1`}>{formatParagraph(section.paragraphs[5])}</p>
              </>
            ) : section.title === "DATA COLLECTION" ? (
              <>
                <p className={`${paragraphClass} mt-2`}>{formatParagraph(section.paragraphs[0])}</p>
                <ul className={`${paragraphClass} mt-1 list-disc pl-6`}>
                  {section.paragraphs.slice(1, 6).map((point, idx) => (
                    <li key={`${section.title}-point-${idx}`}>{point}</li>
                  ))}
                </ul>
                <p className={`${paragraphClass} mt-1`}>{formatParagraph(section.paragraphs[6])}</p>
              </>
            ) : (
              section.paragraphs.map((paragraph, idx) => (
                <p key={`${section.title}-${idx}`} className={`${paragraphClass} ${idx === 0 ? "mt-2" : "mt-1"}`}>
                  {formatParagraph(paragraph)}
                </p>
              ))
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
