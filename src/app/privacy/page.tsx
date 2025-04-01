/**
 * Privacy Policy Page
 * 
 * This page displays the Privacy Policy for ExileOrbs.
 * It includes information about data collection, usage, and user rights.
 */

'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white font-cinzel tracking-wide mb-4">
          Privacy Policy
        </h1>

        <div className="bg-slate-900/80 border border-slate-800/50 rounded-lg p-6 space-y-6 text-slate-400">
          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Introduction
            </h2>
            <p>
              This Privacy Policy describes how ExileOrbs ("we", "us", or "our") collects, uses, and shares your personal information when you use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Information We Collect
            </h2>
            <p className="mb-2">
              We currently collect minimal personal information:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Information you provide when contacting us via email</li>
              <li>Basic usage data through Google Analytics (if enabled)</li>
              <li>Information from Discord if you join our community</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              How We Use Your Information
            </h2>
            <p className="mb-2">
              We use the collected information for:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Responding to your inquiries</li>
              <li>Improving our website and services</li>
              <li>Communicating with you about our services</li>
              <li>Providing support through our Discord community</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Third-Party Services
            </h2>
            <p className="mb-2">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Google Analytics (if enabled) - for website analytics</li>
              <li>Discord - for community communication</li>
              <li>Google AdSense (if approved) - for advertising</li>
            </ul>
            <p className="mt-2">
              These services may collect and process your data according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Your Rights
            </h2>
            <p className="mb-2">
              Under applicable data protection laws, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                our contact page
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 