import { useEffect, useState } from "react";

const sections = [
  { id: "information-collect", title: "Information We Collect" },
  { id: "information-use", title: "How We Use Your Information" },
  { id: "data-protection", title: "Data Protection" },
  { id: "sharing", title: "Sharing Your Information" },
  { id: "cookies", title: "Cookies" },
  { id: "rights", title: "Your Rights" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Information" }
];

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState("information-collect");

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
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-3 text-indigo-100 max-w-2xl mx-auto">
          At PeopleSkillTraining, we value your privacy and are committed to protecting your personal information.
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
          <Section id="information-collect" title="Information We Collect">
            <p>
              We collect information that you provide to us directly, such as when you register for an account,
              sign up for webinars or training, or contact us.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-1">
              <li>Personal details like name, email address, and phone number</li>
              <li>Business information such as company name and job title</li>
              <li>
                Payment information for purchases or subscriptions (processed securely by third-party services)
              </li>
            </ul>
          </Section>

          <Section id="information-use" title="How We Use Your Information">
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and improve our services, including training programs and resources</li>
              <li>Communicate with you about updates, events, and promotions</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
          </Section>

          <Section id="data-protection" title="Data Protection">
            We employ a variety of security measures to protect your personal information from unauthorized access,
            alteration, or disclosure. These measures include encryption, secure servers, and regular system updates.
          </Section>

          <Section id="sharing" title="Sharing Your Information">
            We do not sell, rent, or trade your personal information. We may share your data with trusted third-party
            service providers to help us manage our services, such as payment processors or email marketing tools.
            These third parties are required to keep your information confidential and are prohibited from using it
            for any other purposes.
          </Section>

          <Section id="cookies" title="Cookies">
            Our website uses cookies to improve your user experience, track site usage, and personalize content.
            You can control cookie settings through your browser, but disabling cookies may affect the functionality
            of our website.
          </Section>

          <Section id="rights" title="Your Rights">
            <ul className="list-disc pl-6 space-y-1">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of marketing communications at any time</li>
              <li>Request that we restrict or stop using your personal data</li>
            </ul>
            <p className="mt-4">
              If you have any concerns about how we use your data or wish to exercise your rights,
              please contact us using the information below.
            </p>
          </Section>

          <Section id="changes" title="Changes to This Policy">
            We may update this privacy policy from time to time. When we make changes, we will post the updated
            policy on this page with an updated date. Please review this policy periodically to stay informed
            about how we are protecting your information.
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
