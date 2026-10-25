"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/section-heading";
import { fetchTimetable, type TimetableEntry } from "@/lib/admin-api";
import { FALLBACK_TIMETABLE } from "@/data/site-config";

// Ops timeline. Admin timetable wins; the fallback grid keeps the
// section populated when the API is unreachable.
export default function TimetableSection() {
  const [entries, setEntries] = useState<TimetableEntry[] | null>(null);

  useEffect(() => {
    fetchTimetable()
      .then((data) => {
        setEntries(data.length > 0 ? data : FALLBACK_TIMETABLE);
      })
      .catch(() => {
        setEntries(FALLBACK_TIMETABLE);
      });
  }, []);

  const schedule = [...(entries ?? [])].sort(
    (first, second) => first.sortOrder - second.sortOrder,
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionHeading
        kicker="Ops timeline // 02"
        title="Operations schedule"
        blurb="Multi-day competitive continuum across the BIT collegiate campus. All times indexed to Indian Standard Time (IST)."
      />
      <div className="space-y-2">
        {entries === null
          ? [1, 2, 3].map((i) => (
              <div
                key={i}
                className="cx-sched-row h-24 animate-pulse"
                aria-hidden="true"
              />
            ))
          : schedule.map((s) => (
              <div key={s.id} className="cx-sched-row">
                <span className="cx-sched-time">
                  {s.day} · {s.time}
                </span>
                <div>
                  <h3 className="cx-sched-title">{s.title}</h3>
                  <p className="cx-sched-detail">{s.detail}</p>
                </div>
                <div className="cx-sched-chips">
                  <span className="cx-chip">{s.venue}</span>
                  <span className="cx-chip cx-chip--mode">[{s.mode}]</span>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
