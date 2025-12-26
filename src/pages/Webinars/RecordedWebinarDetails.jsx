import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiClock,
  FiHash,
  FiCheckCircle,
  FiVideo,
  FiShield,
} from "react-icons/fi";

/* ================= PAGE ================= */
export default function RecordedWebinarDetails() {
  const { webinar_id } = useParams(); // MUST match route param
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH DETAILS ---------- */
  useEffect(() => {
    if (!webinar_id) return;

    fetch(`http://127.0.0.1:8000/api/recorded-webinars/${webinar_id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Recorded webinar not found");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [webinar_id]);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950 text-yellow-400">
        Loading recorded webinar…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-950 text-red-400">
        Webinar not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-emerald-950 text-emerald-50">

      {/* ================= HERO ================= */}
      <section className="relative">
        <img
          src={data.cover_image}
          className="w-full h-[420px] object-cover opacity-40"
          alt={data.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <span className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm mb-4">
            <FiVideo /> RECORDED WEBINAR
          </span>

          <h1 className="text-4xl md:text-5xl font-bold max-w-4xl mb-4">
            {data.title}
          </h1>

          <div className="mt-6 grid sm:grid-cols-3 gap-4 bg-emerald-900/60 border border-emerald-800 rounded-xl p-6">
            <Info label="Access Status" value="Purchase required for access" />
            <Info label="Format" value={data.format} />
            <Info
              label="Webinar ID"
              value={webinar_id}
              mono
            />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-[1fr_380px] gap-10">

        {/* -------- LEFT -------- */}
        <div className="space-y-10">

          {/* Overview */}
          <Block title="Webinar Overview">
            {data.overview
                .split("\n")
                .filter(Boolean)
                .map((p, i) => (
                    <p key={i} className="leading-relaxed mb-3">
                    {p}
                    </p>
                ))}
          </Block>

          {/* Why Attend */}
          <Points
            title="Why You Should Attend"
            items={data.why_attend_points}
          />

          {/* Who Will Benefit */}
          <Points
            title="Who Will Benefit?"
            items={data.who_benefit_points}
          />

          {/* Areas Covered */}
          <Points
            title="Areas Covered in the Session"
            items={data.areas_covered_points}
          />

          {/* Instructor */}
          <Block title="Meet Your Speaker">
            <div className="flex gap-5">
              <img
                src={data.instructor.photo}
                className="w-24 h-24 rounded-full border-2 border-yellow-400"
                alt={data.instructor.name}
              />
              <div>
                <h4 className="font-bold text-lg">
                  {data.instructor.name}
                </h4>
                <p className="text-yellow-400">
                  {data.instructor.designation} · {data.instructor.company}
                </p>
                <p className="mt-3 text-sm text-emerald-300">
                  {data.instructor.bio}
                </p>
              </div>
            </div>
          </Block>
        </div>

        {/* -------- RIGHT / PRICING -------- */}
        <aside className="sticky top-24 bg-emerald-900/60 border border-emerald-800 rounded-2xl p-6 h-fit">

          <h3 className="font-semibold text-lg mb-4">
            Recorded Version
          </h3>

          <p className="text-3xl font-bold text-yellow-400">
            {data.pricing?.single
                ? `$${data.pricing.single}`
                : "Free"}
          </p>

          <button className="w-full mt-6 py-3 bg-yellow-400 text-emerald-950 rounded-lg font-semibold">
            Add to Cart
          </button>

          <button className="w-full mt-3 py-3 bg-green-600 rounded-lg font-semibold">
            Buy Now
          </button>

          <div className="mt-6 pt-6 border-t border-emerald-800 text-sm space-y-2">
            <p className="flex items-center gap-2">
              <FiShield className="text-green-400" />
              {data.refund_policy}
            </p>
            <p className="flex items-center gap-2">
              <FiCheckCircle className="text-green-400" />
              Available 24/7
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

/* ================= HELPERS ================= */

function Info({ label, value, mono }) {
  return (
    <div>
      <p className="text-xs text-emerald-400">{label}</p>
      <p className={`font-medium ${mono ? "font-mono text-yellow-400" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-emerald-900/60 border border-emerald-800 rounded-xl p-8"
    >
      <h3 className="font-bold text-xl mb-4 text-yellow-400">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

function Points({ title, items }) {
  return (
    <Block title={title}>
      <ul className="space-y-2">
        {items?.map((p, i) => (
          <li key={i} className="flex gap-2">
            <FiCheckCircle className="text-green-400 mt-1" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </Block>
  );
}
