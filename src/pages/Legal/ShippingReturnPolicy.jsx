import { useEffect, useState } from "react";

const sections = [
  { id: "shipping", title: "Shipping Policy" },
  { id: "returns", title: "Return & Refund Policy" },
  { id: "cancellations", title: "Cancellations" },
  { id: "technical", title: "Technical Issues" },
  { id: "request", title: "How to Request Returns" },
  { id: "exceptions", title: "Exceptions" },
  { id: "amendments", title: "Policy Amendments" },
  { id: "contact", title: "Contact Information" }
];

export default function ShippingReturnPolicy() {
  const [activeId, setActiveId] = useState("shipping");

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
        <h1 className="text-4xl font-bold">Shipping & Return Policy</h1>
        <p className="mt-3 text-indigo-100 max-w-2xl mx-auto">
          At PeopleSkillTraining, we strive to provide excellent service and make your experience as seamless as possible.
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
          <Section id="shipping" title="Shipping Policy">
            <p>
              PeopleSkillTraining provides digital products and services, including online courses, webinars,
              e-books, and other resources. As such, there are no physical products shipped to customers.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                Once payment is processed and registration is confirmed, you will receive immediate access to digital content
              </li>
              <li>
                Access will be provided through our website or via a direct link
              </li>
              <li>
                For access issues, contact <strong>support@peopleskilltraining.com</strong>
              </li>
            </ul>
          </Section>

          <Section id="returns" title="Return & Refund Policy">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Returns are not applicable for digital products
              </li>
              <li>
                You may request a full refund within 30 days of purchase
              </li>
              <li>
                After 30 days, refunds will not be granted
              </li>
            </ul>
          </Section>

          <Section id="cancellations" title="Cancellations">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Webinars: Cancellation must be made at least 48 hours in advance to be eligible for a refund
              </li>
              <li>
                Courses & Subscriptions: Cancellation takes effect at the end of the billing cycle
              </li>
              <li>
                Certain downloadable resources may be non-refundable once accessed
              </li>
            </ul>
          </Section>

          <Section id="technical" title="Technical Issues">
            <p>
              If you experience technical difficulties accessing purchased content, please contact us immediately
              at <strong>support@peopleskilltraining.com</strong>, and we will assist you promptly.
            </p>
          </Section>

          <Section id="request" title="How to Request Returns">
            <p>
              To request a refund, cancellation, or report access issues, please contact us.
            </p>
            <p className="mt-3">
              Include your order details, the product or service in question, and the reason for your request.
            </p>
          </Section>

          <Section id="exceptions" title="Exceptions">
            <ul className="list-disc pl-6 space-y-2">
              <li>If the content was accessed or downloaded</li>
              <li>If the request is beyond the refund period</li>
              <li>If there is misuse or fraudulent activity</li>
            </ul>
          </Section>

          <Section id="amendments" title="Policy Amendments">
            PeopleSkillTraining reserves the right to update or modify this Shipping & Return Policy at any time.
            Continued use of our services constitutes acceptance of the revised policy.
          </Section>

          <Section id="contact" title="Contact Information">
            <p>Email: <strong>support@peopleskilltraining.com</strong></p>
            <p className="mt-1">PeopleSkillTraining</p>
          </Section>

          <div className="text-center pt-10 text-xs text-slate-500">
            Policy last updated: December 20, 2025
          </div>
        </main>
      </div>
    </div>
  );
}

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
