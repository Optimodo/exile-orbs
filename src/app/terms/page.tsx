'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white font-cinzel tracking-wide mb-4">
          Terms of Service
        </h1>

        <div className="space-y-6 text-slate-400">
          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Agreement to Terms
            </h2>
            <p>
              By accessing or using ExileOrbs, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Intellectual Property
            </h2>
            <p>
              The service and its original content, features, and functionality are owned by ExileOrbs and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              User Responsibilities
            </h2>
            <p className="mb-2">
              Users of our service agree to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate information when contacting us</li>
              <li>Not use the service for any illegal purposes</li>
              <li>Not attempt to access restricted areas of the service</li>
              <li>Not interfere with or disrupt the service</li>
              <li>Not use the service to distribute malware or harmful code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Third-Party Services
            </h2>
            <p>
              Our service may contain links to third-party websites or services that are not owned or controlled by ExileOrbs. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Disclaimer
            </h2>
            <p>
              The service is provided "as is" without any warranties, either express or implied. We do not warrant that the service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Limitation of Liability
            </h2>
            <p>
              In no event shall ExileOrbs be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to modify or replace these terms at any time. We will notify you of any changes by posting the new terms on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-500 font-cinzel tracking-wide mb-3">
              Contact Information
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300">
                our contact page
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 