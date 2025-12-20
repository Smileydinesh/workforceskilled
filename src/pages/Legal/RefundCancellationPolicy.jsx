import { useEffect, useState } from "react";

const sections = [
  { id: "training", title: "Training & Course Subscriptions" },
  { id: "webinars", title: "Webinars & Events" },
  { id: "consulting", title: "Consulting Services" },
  { id: "general", title: "General Terms" },
  { id: "request", title: "How to Request Refunds" },
  { id: "exceptions", title: "Exceptions" },
  { id: "amendments", title: "Policy Amendments" },
  { id: "contact", title: "Contact Information" }
];

export default function RefundCancellationPolicy() {
  const [activeId, setActiveId] = useState("training");

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
        <h1 className="text-4xl font-bold">Refund & Cancellation Policy</h1>
        <p className="mt-3 text-indigo-100 max-w-2xl mx-auto">
          At PeopleSkillTraining, we are committed to providing high-quality training and compliance solutions.
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
          <Section id="training" title="Training & Course Subscriptions">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                We offer a 5 working day refund policy for online courses and subscriptions. If for any reason you
                are not satisfied with the course or training you purchased, you can request a full refund within
                5 working days of your purchase
              </li>
              <li>After the 5 working day period, refunds will not be granted</li>
              <li>
                If you wish to cancel a course subscription after the initial 5 working day period, you may do so
                by contacting us. Cancellations will be processed at the end of the current billing cycle, and no
                further charges will be applied
              </li>
              <li>However, no refunds will be issued for prior payments</li>
            </ul>
          </Section>

          <Section id="webinars" title="Webinars & Events">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                If you cancel your registration for a live webinar or event at least 48 hours before the scheduled
                start time, you will receive a full refund
              </li>
              <li>Cancellations made within 48 hours of the event are non-refundable</li>
              <li>If you do not attend a scheduled webinar or event, no refund will be issued</li>
              <li>
                If PeopleSkillTraining cancels or reschedules an event, you may be eligible for a full refund or an
                alternative event at no additional cost
              </li>
            </ul>
          </Section>

          <Section id="consulting" title="Consulting Services">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Refunds for consulting services are only issued if no consultation session has been provided
              </li>
              <li>
                Cancellations must be made at least 48 hours in advance to avoid charges
              </li>
              <li>
                If cancellation occurs within 48 hours of the scheduled session, a cancellation fee may apply
              </li>
            </ul>
          </Section>

          <Section id="general" title="General Terms">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Refund requests are typically processed within 5 working days of receipt
              </li>
              <li>
                Refunds will be issued to the original payment method used at the time of purchase
              </li>
              <li>
                Some services, such as downloadable resources, may be non-refundable once delivered
              </li>
            </ul>
          </Section>

          <Section id="request" title="How to Request Refunds">
            <p>
              To request a refund or cancellation, please contact our customer support team.
            </p>
            <p className="mt-3">
              Please include your order or registration details and the reason for your request to help us process
              it as quickly as possible.
            </p>
          </Section>

          <Section id="exceptions" title="Exceptions">
            <ul className="list-disc pl-6 space-y-2">
              <li>Misuse or fraudulent activities related to purchases</li>
              <li>If you attend a webinar or use a service after requesting cancellation</li>
              <li>Failure to comply with the Code of Conduct</li>
            </ul>
          </Section>

          <Section id="amendments" title="Policy Amendments">
            PeopleSkillTraining reserves the right to modify or update this Refund & Cancellation Policy at any
            time. Continued use of our services constitutes acceptance of the revised policy.
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
