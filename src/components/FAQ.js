"use client"
import React, { useState } from 'react';
import { FaSuitcase, FaMapMarkedAlt, FaCreditCard, FaHeadset } from 'react-icons/fa';

const faqTabs = [
    {
        name: 'Booking',
        icon: <FaSuitcase className="text-xl mr-2 text-[#7c3aed]" />,
        faqs: [
            {
                question: 'How do I book a trip on TravelTraces?',
                answer: 'Browse destinations, select your trip, and follow the booking instructions on the destination page.'
            },
            {
                question: 'Can I modify my booking after confirmation?',
                answer: 'Yes, contact our support team at least 48 hours before your trip to modify your booking.'
            },
        ]
    },
    {
        name: 'Destinations',
        icon: <FaMapMarkedAlt className="text-xl mr-2 text-[#a78bfa]" />,
        faqs: [
            {
                question: 'How do I find the best destinations for my interests?',
                answer: 'Use our filters and recommendations to discover destinations tailored to your preferences.'
            },
            {
                question: 'Are all destinations verified?',
                answer: 'Yes, all destinations are verified by our team and reviewed by travelers.'
            },
        ]
    },
    {
        name: 'Payments',
        icon: <FaCreditCard className="text-xl mr-2 text-[#8c78d7]" />,
        faqs: [
            {
                question: 'Is my payment information secure?',
                answer: 'We use industry-standard encryption to protect your payment details.'
            },
            {
                question: 'Can I get a refund?',
                answer: 'Refunds are available as per our cancellation policy. Please check the policy or contact support.'
            },
        ]
    },
    {
        name: 'Support',
        icon: <FaHeadset className="text-xl mr-2 text-[#e1b9ff]" />,
        faqs: [
            {
                question: 'How do I contact support?',
                answer: 'Reach us via the "Contact Us" page or email support@traveltraces.com.'
            },
            {
                question: 'What if I have an emergency during my trip?',
                answer: 'Our 24/7 helpline is available for all travelers. The number is in your booking confirmation.'
            },
        ]
    },
];

export default function FAQ() {
    const [activeTab, setActiveTab] = useState(0);
    const [flipped, setFlipped] = useState(Array(faqTabs[activeTab].faqs.length).fill(false));

    // Reset flip state when tab changes
    React.useEffect(() => {
        setFlipped(Array(faqTabs[activeTab].faqs.length).fill(false));
    }, [activeTab]);

    const handleFlip = idx => {
        setFlipped(f => f.map((val, i) => (i === idx ? !val : val)));
    };

    return (
        <section className="w-full py-16 px-4 md:px-16 bg-gradient-to-br from-[#8c78d7] via-[#e1b9ff] to-[#7c3aed]">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-tight">FAQs</h2>
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {faqTabs.map((tab, idx) => (
                        <button
                            key={tab.name}
                            className={`flex items-center px-6 py-2 rounded-full font-semibold text-lg transition-all border-2 shadow-md focus:outline-none
                ${activeTab === idx
                                    ? 'bg-white text-[#7c3aed] border-[#7c3aed] scale-105'
                                    : 'bg-white/30 text-white border-white/40 hover:bg-white/60 hover:text-[#7c3aed]'}
              `}
                            onClick={() => setActiveTab(idx)}
                        >
                            {tab.icon}
                            {tab.name}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                    {faqTabs[activeTab].faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="perspective"
                            style={{ perspective: '1200px' }}
                        >
                            <div
                                className={`relative w-full h-56 transition-transform duration-700 transform-style-preserve-3d cursor-pointer group ${flipped[idx] ? 'rotate-y-180' : ''}`}
                                onClick={() => handleFlip(idx)}
                            >
                                {/* Front */}
                                <div className="absolute inset-0 bg-white/90 rounded-2xl shadow-xl border-2 border-[#a78bfa] flex flex-col items-center justify-center gap-4 p-6 backface-hidden group-hover:scale-105 transition-transform duration-300">
                                    <div className="mb-2">{faqTabs[activeTab].icon}</div>
                                    <div className="text-lg font-bold text-[#7c3aed] text-center">{faq.question}</div>
                                    <span className="mt-4 text-xs text-gray-400">Click to reveal</span>
                                </div>
                                {/* Back */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#a78bfa] to-[#8c78d7] rounded-2xl shadow-xl border-2 border-[#e1b9ff] flex flex-col items-center justify-center gap-4 p-6 rotate-y-180 backface-hidden">
                                    <div className="text-white text-base font-semibold text-center">{faq.answer}</div>
                                    <span className="mt-4 text-xs text-white/70">Click to go back</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
        .perspective { perspective: 1200px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
        </section>
    );
} 