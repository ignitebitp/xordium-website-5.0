"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FestEvent } from "@/lib/events";
import { getRegistrationHref } from "@/data/events";
import { accentFor } from "@/data/register-events";

const carouselOffsets = [-1, 0, 1, 2] as const;

function statusLabel(e: FestEvent): string {
  switch (e.entry) {
    case "contact":
      return "Contact entry";
    case "walk-in":
      return "Walk-in";
    default:
      return "Registration open";
  }
}

function EventCard({
  event: e,
  index,
  accent,
  className,
  style,
  "aria-hidden": ariaHidden,
}: {
  event: FestEvent;
  index: number;
  accent: string;
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}) {
  return (
    <article
      className={`cx-event-carousel-card cx-corners ${className ?? ""}`}
      style={{ ["--accent" as string]: accent, ...style }}
      aria-hidden={ariaHidden}
    >
      {/* HUD bar */}
      <header className="cx-dos-bar">
        <span className="cx-dos-idx" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="cx-tag">{e.category}</span>
        <span className="cx-tag cx-tag--ghost">{e.tag}</span>
        <span className="cx-dos-status">{statusLabel(e)}</span>
      </header>

      {/* Poster - large 4:5 aspect */}
      <div className="cx-event-carousel-media">
        <img
          src={e.image}
          alt={`${e.title} poster`}
          className="cx-event-carousel-img"
          decoding="async"
        />
        <span className="cx-dos-ghost" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Briefing */}
      <div className="cx-event-carousel-content">
        <h3 className="cx-dos-title">{e.title}</h3>
        <p className="cx-dos-blurb">{e.description}</p>
        {e.longDescription ? <p className="cx-dos-long">{e.longDescription}</p> : null}

        {e.highlights && e.highlights.length > 0 ? (
          <div className="cx-dos-hl">
            <p className="cx-dos-hl-head">// Key signals</p>
            <ul>
              {e.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <dl className="cx-dos-meta">
          {e.venue && (
            <div>
              <dt>Venue</dt>
              <dd>{e.venue}</dd>
            </div>
          )}
          {e.format && (
            <div>
              <dt>Format</dt>
              <dd>{e.format}</dd>
            </div>
          )}
          {e.schedule && (
            <div>
              <dt>Window</dt>
              <dd>{e.schedule}</dd>
            </div>
          )}
          {e.teamSize && (
            <div>
              <dt>Team</dt>
              <dd>{e.teamSize}</dd>
            </div>
          )}
        </dl>

        <p className="cx-dos-prize">Prize pool // {e.prizePool}</p>
        {e.prizeNote && <p className="cx-event-note">{e.prizeNote}</p>}

        {/* Footer actions */}
        <footer className="cx-dos-foot">
          {e.entry === "contact" || e.entry === "walk-in" ? (
            <div className="cx-dos-entry">
              <span className="cx-dos-entry-tag">No registration required</span>
              {e.contact ? (
                <span className="cx-dos-entry-contact">{e.contact}</span>
              ) : (
                <span className="cx-dos-entry-contact">Walk in on-site</span>
              )}
            </div>
          ) : (
            <Link
              href={getRegistrationHref(e.slug)}
              className="cx-btn cx-btn--acid"
            >
              {e.cta || "Register"} →
            </Link>
          )}
          <Link href={`/events/${e.slug}`} className="cx-btn cx-btn--ghost">
            Full briefing →
          </Link>
        </footer>
      </div>
    </article>
  );
}

export default function EventCarousel({ events }: { events: FestEvent[] }) {
  const [index, setIndex] = useState(0);

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => a.title.localeCompare(b.title, "en", { sensitivity: "base" })),
    [events]
  );

  const move = useCallback((direction: -1 | 1) => {
    setIndex((current) => (current + direction + sortedEvents.length) % sortedEvents.length);
  }, [sortedEvents.length]);

  if (sortedEvents.length === 0) {
    return (
      <p className="border border-[#33343b] bg-[#0c0e14] p-5 text-sm text-[#8f96a3]">
        No event protocols available.
      </p>
    );
  }

  return (
    <section className="space-y-4" aria-roledescription="carousel">
      <div className="flex items-center justify-between border-b border-[#33343b] pb-3">
        <h3 className="font-headline-md uppercase text-white">Event Protocols</h3>
      </div>

      <div className="relative mx-auto h-[100vh] min-h-[1000px] max-w-[2800px] overflow-hidden lg:h-[120vh] xl:max-w-[3200px] 2xl:max-w-[3600px]">
        <button
          type="button"
          aria-label="Previous event"
          onClick={() => move(-1)}
          disabled={sortedEvents.length < 2}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 border border-[#33343b] bg-[#0c0e14]/95 p-3 text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#191b22] transition-colors"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        {carouselOffsets.map((offset) => {
          const eventIndex = (index + offset + sortedEvents.length) % sortedEvents.length;
          const event = sortedEvents[eventIndex];
          const accent = accentFor(event.slug);
          // Positions for 3 visible cards: 3%, 50%, 97% - center card dominates
          const positions = [3, 50, 97];
          const pos = positions[offset + 1] ?? 50;
          return (
            <EventCard
              key={`${offset}-${event.slug}-${index}`}
              event={event}
              index={eventIndex}
              accent={accent}
              aria-hidden={offset === -1 || offset === 2}
              className="cx-event-carousel-enter"
              style={{ ["--pos" as string]: `${pos}%` }}
            />
          );
        })}

        <button
          type="button"
          aria-label="Next event"
          onClick={() => move(1)}
          disabled={sortedEvents.length < 2}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 border border-[#33343b] bg-[#0c0e14]/95 p-3 text-white disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[#191b22] transition-colors"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4" aria-label="Event pagination">
        {sortedEvents.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to event ${i + 1}`}
            aria-current={i === index ? "true" : "false"}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index
                ? "bg-[#cdf200] w-6"
                : "bg-[#33343b] hover:bg-[#4a4d57]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}