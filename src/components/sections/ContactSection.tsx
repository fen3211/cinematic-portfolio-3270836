import React, { useState } from 'react';
import { KineticText } from '../ui/KineticText';
import { CINEMATOGRAPHER_PROFILE } from '../../data/portfolioData';
import { Mail, Check, Copy, Globe, Shield, MapPin, Phone } from 'lucide-react';
import { playLensClick } from '../../utils/audioSynth';

export const ContactSection: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const directEmail = CINEMATOGRAPHER_PROFILE.contact.email;

  const handleCopyEmail = async () => {
    playLensClick();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(directEmail);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2400);
    } catch {
      // Fallback
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2400);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Production Inquiries & Film End Credits"
      className="relative min-h-screen px-6 md:px-12 lg:px-20 py-24 flex flex-col justify-between bg-[#080808]"
    >
      {/* Monumental Invitation Headline */}
      <div className="max-w-6xl">
        <span className="font-mono text-xs tracking-widest text-[#888888] uppercase block mb-4">
          05 // INQUIRIES & END CREDITS CRAWL
        </span>
        <KineticText
          tag="h2"
          splitBy="words"
          triggerOnScroll
          className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl text-[#F5F5F5] uppercase leading-[0.95] tracking-tight"
        >
          LET'S CREATE SOMETHING.
        </KineticText>
        <p className="mt-6 text-base sm:text-xl text-[#E09F3E] font-medium max-w-2xl leading-relaxed">
          Available worldwide for narrative feature films, commercial campaigns, and visionary director collaborations across London, Los Angeles, and Paris.
        </p>

        {/* Quick Action Email Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${directEmail}`}
            data-cursor="link"
            className="inline-flex items-center space-x-3 px-6 py-3.5 border border-[#E09F3E] bg-[#E09F3E] hover:bg-[#c88629] text-[#080808] font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#E09F3E]"
          >
            <Mail className="w-4 h-4 text-[#080808]" />
            <span>DISPATCH PRODUCTION INQUIRY</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            data-cursor="link"
            className={`inline-flex items-center space-x-2 px-5 py-3.5 border font-mono text-xs uppercase tracking-widest transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#E09F3E] ${
              isCopied
                ? 'border-[#E09F3E] bg-[#E09F3E]/20 text-[#E09F3E]'
                : 'border-[#292929] hover:border-[#888888] bg-[#111111] text-[#F5F5F5]'
            }`}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-[#E09F3E]" />
                <span className="text-[#E09F3E]">COPIED TO CLIPBOARD // 24FPS</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#888888]" />
                <span>COPY DIRECT EMAIL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Two-Column Film End Credits Crawl Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 border-y border-[#292929] my-16">
        {/* Left Column: Representation & Direct Contacts */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#555555] uppercase block mb-3">
              WORLDWIDE REPRESENTATION
            </span>
            <div className="space-y-1.5 font-sans">
              <div className="text-xl font-bold text-[#F5F5F5]">
                {CINEMATOGRAPHER_PROFILE.representation.agency}
              </div>
              <div className="text-sm text-[#888888]">
                Literary & Cinematography Agent: {CINEMATOGRAPHER_PROFILE.representation.agent}
              </div>
              <div className="text-xs text-[#555555]">
                Territory: London (HQ) · Los Angeles · Paris
              </div>
              <a
                href={`mailto:${CINEMATOGRAPHER_PROFILE.representation.email}`}
                className="inline-flex items-center space-x-2 text-sm font-mono text-[#E09F3E] hover:underline pt-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{CINEMATOGRAPHER_PROFILE.representation.email}</span>
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-[#292929]/50">
            <span className="font-mono text-xs tracking-widest text-[#555555] uppercase block mb-3">
              DIRECT STUDIO INQUIRIES & BOOKINGS
            </span>
            <div className="space-y-2 font-sans text-sm">
              <div className="text-base font-semibold text-[#F5F5F5]">
                {CINEMATOGRAPHER_PROFILE.contact.location}
              </div>
              <div className="text-[#888888] flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#E09F3E] shrink-0 mt-0.5" />
                <span>{CINEMATOGRAPHER_PROFILE.contact.studioAddress}</span>
              </div>
              <div className="text-[#888888] flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#888888] shrink-0" />
                <span className="font-mono text-xs">{CINEMATOGRAPHER_PROFILE.contact.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Production Guild Standards & Colophon Details */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#555555] uppercase block mb-3">
              GUILD ACCREDITATION & HONORS
            </span>
            <div className="space-y-3 font-mono text-xs">
              <div className="border border-[#292929] p-3.5 bg-[#111111]/40 flex items-center justify-between">
                <div>
                  <span className="text-[#F5F5F5] font-semibold block">BSC ACCREDITATION</span>
                  <span className="text-[#888888] text-[11px]">British Society of Cinematographers</span>
                </div>
                <span className="text-[#E09F3E]">ACTIVE FELLOW</span>
              </div>

              <div className="border border-[#292929] p-3.5 bg-[#111111]/40 flex items-center justify-between">
                <div>
                  <span className="text-[#F5F5F5] font-semibold block">AFC ACCREDITATION</span>
                  <span className="text-[#888888] text-[11px]">Association Française des directeurs de la photographie</span>
                </div>
                <span className="text-[#E09F3E]">HONORARY</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#292929]/50">
            <span className="font-mono text-xs tracking-widest text-[#555555] uppercase block mb-3 flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-[#E09F3E]" />
              <span>PRODUCTION TELEMETRY & LOCATIONS</span>
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono text-[#888888]">
              <div className="border border-[#292929] p-2.5 bg-[#111111]/30">
                <span className="text-[#F5F5F5] block font-semibold">LONDON</span>
                <span className="text-[10px] text-[#555555]">GMT +0</span>
              </div>
              <div className="border border-[#292929] p-2.5 bg-[#111111]/30">
                <span className="text-[#F5F5F5] block font-semibold">LOS ANGELES</span>
                <span className="text-[10px] text-[#555555]">PST -8</span>
              </div>
              <div className="border border-[#292929] p-2.5 bg-[#111111]/30">
                <span className="text-[#F5F5F5] block font-semibold">PARIS</span>
                <span className="text-[10px] text-[#555555]">CET +1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Privacy & Compliance Notice (152-FZ / GDPR) */}
      <div className="mb-8 p-4 border border-[#292929] bg-[#0d0d0d] text-[11px] font-mono text-[#666666] leading-relaxed flex items-start space-x-3">
        <Shield className="w-4 h-4 text-[#E09F3E] shrink-0 mt-0.5" />
        <div>
          <span className="text-[#888888] font-semibold uppercase block mb-1">
            PRIVACY & DATA COMPLIANCE DISCLOSURE // GDPR & 152-FZ
          </span>
          <p>
            This portfolio operates in strict compliance with Regulation (EU) 2016/679 (GDPR) and Federal Law No. 152-FZ &ldquo;On Personal Data&rdquo;. No unsolicited tracking cookies, fingerprinting pixels, or behavioral advertising scripts are executed. Transmissions initiated via email or copy actions are used exclusively for legitimate professional production correspondence.
          </p>
        </div>
      </div>

      {/* Bottom Colophon Slate */}
      <footer className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#555555] tracking-widest uppercase">
        <div>
          © {new Date().getFullYear()} ROHAN VANCE · ALL RIGHTS RESERVED
        </div>
        <div className="flex items-center space-x-4">
          <span>ULTRA-PANAVISION 70 FORMAT</span>
          <span>·</span>
          <span>COLOR BY TECHNICOLOR</span>
          <span>·</span>
          <span className="text-[#E09F3E]">24FPS THEATRICAL CADENCE</span>
        </div>
      </footer>
    </section>
  );
};
