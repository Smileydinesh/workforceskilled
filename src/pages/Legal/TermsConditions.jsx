import { useEffect, useState } from "react";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "services", title: "Services" },
  { id: "account", title: "Account Registration" },
  { id: "usage", title: "Use of Services" },
  { id: "payment", title: "Payment & Subscriptions" },
  { id: "intellectual", title: "Intellectual Property" },
  { id: "privacy", title: "Privacy" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "termination", title: "Termination" },
  { id: "amendments", title: "Amendments" },
  { id: "law", title: "Governing Law" },
  { id: "contact", title: "Contact Information" }
];

export default function TermsConditions() {
  const [activeId, setActiveId] = useState("acceptance");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-700 py-20 text-center text-white">
        <h1 className="text-4xl font-bold">Terms & Conditions</h1>
        <p className="mt-3 text-indigo-100 max-w-2xl mx-auto">
          Welcome to PeopleSkillTraining. Please review our terms carefully before using our services.
        </p>
        <p className="mt-4 text-sm text-indigo-200">
          Last updated: December 20, 2025
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* SIDEBAR */}
        <aside className="lg:col-span-1">
          <div className="sticky top-28 bg-white border rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">
              Contents
            </h3>
            <ul className="space-y-2 text-sm">
              {sections.map((sec) => (
                <li
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`cursor-pointer px-3 py-2 rounded-md transition
                    ${
                      activeId === sec.id
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:bg-indigo-50"
                    }`}
                >
                  {sec.title}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-3 space-y-12">
          <Section id="acceptance" title="Acceptance of Terms">
            By using the services provided by PeopleSkillTraining, you agree to these Terms & Conditions.
            If you do not agree with any part of these terms, you must refrain from using our website and services.
          </Section>

          <Section id="services" title="Services">
            PeopleSkillTraining provides online training, webinars, resources, and consulting services designed
            to assist businesses in maintaining compliance with relevant laws and regulations.
          </Section>

          <Section id="account" title="Account Registration">
            To access certain features, you may be required to create an account. You agree to provide accurate,
            current, and complete information and to maintain the confidentiality of your login credentials.
          </Section>

          <Section id="usage" title="Use of Services">
            You agree not to:
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Use services for illegal purposes</li>
              <li>Attempt unauthorized system access</li>
              <li>Distribute harmful or unlawful content</li>
              <li>Reproduce or sell content without permission</li>
            </ul>
          </Section>

          <Section id="payment" title="Payment & Subscriptions">
            Some services require payment. Subscription services may auto-renew until canceled.
            All applicable taxes and fees will apply.
          </Section>

          <Section id="intellectual" title="Intellectual Property">
            All content, trademarks, logos, and materials are the intellectual property of
            PeopleSkillTraining and protected by applicable laws.
          </Section>

          <Section id="privacy" title="Privacy">
            Your use of our services is governed by our Privacy Policy, which explains how
            we collect and protect personal information.
          </Section>

          <Section id="liability" title="Limitation of Liability">
            We are not liable for indirect or consequential damages. Liability shall not exceed
            the amount paid for the service.
          </Section>

          <Section id="termination" title="Termination">
            We may suspend or terminate access if these Terms & Conditions are violated.
          </Section>

          <Section id="amendments" title="Amendments">
            We reserve the right to update these terms at any time. Continued use implies acceptance.
          </Section>

          <Section id="law" title="Governing Law">
            These terms are governed by the laws of the State of California.
          </Section>

          <Section id="contact" title="Contact Information">
            <p>Email: <strong>support@peopleskilltraining.com</strong></p>
            <p className="mt-1">PeopleSkillTraining</p>
          </Section>

          <div className="text-center pt-10 text-xs text-slate-500">
            Terms last updated: December 20, 2025
          </div>
        </main>
      </div>
    </div>
  );
}

/* REUSABLE SECTION COMPONENT */
function Section({ id, title, children }) {
  return (
    <section id={id} className="bg-white border rounded-xl p-8 scroll-mt-32">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        {title}
      </h2>
      <div className="text-slate-600 leading-relaxed text-sm">
        {children}
      </div>
    </section>
  );
}
