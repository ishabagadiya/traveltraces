"use client"
import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#f5f2f7] via-[#efebfe] to-[#fbfcfc] text-purple-600 pt-0 pb-10 px-4 overflow-hidden relative">
      {/* WhatsApp Contact Section */}
      <div className="w-full flex flex-col items-center py-8 animate-fade-in-down z-10 relative">
        <span className="text-2xl font-bold mb-3 text-[#003c3a] drop-shadow-lg animate-fade-in">Have any doubts? <span className="text-[#7c3aed]">Don’t wait, contact us!</span></span>
        <a
          href="https://wa.me/918460146012"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 hover:from-purple-500 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all duration-300 text-lg animate-bounce-in"
        >
          <FaWhatsapp size={24} /> WhatsApp: 8460146012
        </a>
      </div>
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-8 animate-fade-in-up z-10 relative">
        {/* Logo and Name */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-3xl font-extrabold tracking-tight mb-2 text-[#7c3aed] animate-fade-in">TravelTraces</span>
          <span className="text-base text-purple-600 animate-fade-in">Where journeys become memories</span>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-6 text-lg font-semibold">
          <Link href="/" className="hover:text-[#e1b9ff] focus:text-[#e1b9ff] transition-all duration-200 animate-fade-in">Home</Link>
          <Link href="#destinations" className="hover:text-[#e1b9ff] focus:text-[#e1b9ff] transition-all duration-200 animate-fade-in">Destinations</Link>
          <Link href="#about" className="hover:text-[#e1b9ff] focus:text-[#e1b9ff] transition-all duration-200 animate-fade-in">About</Link>
          <Link href="#contact" className="hover:text-[#e1b9ff] focus:text-[#e1b9ff] transition-all duration-200 animate-fade-in">Contact</Link>
        </nav>
        {/* Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-[#e1b9ff]/30 focus:bg-[#e1b9ff]/40 transition-all duration-200 animate-fade-in">
            <FaInstagram size={22} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-[#7c3aed]/30 focus:bg-[#7c3aed]/40 transition-all duration-200 animate-fade-in">
            <FaFacebookF size={22} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube" className="p-2 rounded-full bg-white/10 hover:bg-red-400/30 focus:bg-red-500/40 transition-all duration-200 animate-fade-in">
            <FaYoutube size={22} />
          </a>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-purple-400 animate-fade-in-up z-10 relative">
        &copy; {new Date().getFullYear()} TravelTraces. All rights reserved.
      </div>
      {/* Decorative Animated Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#e1b9ff]/40 rounded-full blur-3xl animate-blob1 z-0" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#7c3aed]/30 rounded-full blur-3xl animate-blob2 z-0" />
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes blob1 {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(20px); }
        }
        @keyframes blob2 {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.05) translateY(-20px); }
        }
        .animate-fade-in { animation: fade-in 0.8s both; }
        .animate-fade-in-down { animation: fade-in-down 1s both; }
        .animate-fade-in-up { animation: fade-in-up 1s both; }
        .animate-bounce-in { animation: bounce-in 0.7s both; }
        .animate-blob1 { animation: blob1 8s ease-in-out infinite alternate; }
        .animate-blob2 { animation: blob2 10s ease-in-out infinite alternate; }
      `}</style>
    </footer>
  );
} 