"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, Gamepad2, MessageSquare } from "lucide-react";
import SectionHeading from "@/components/section-heading";
import {
  president,
  vicePresidents,
  otherCoreExecutives,
  seniorCoordinators,
  juniorCoordinators,
  type CoreMember,
  type CoordinatorMember,
} from "@/data/team";
import { FALLBACK_EVENTS, heroStats } from "@/data/site-config";

const carouselOffsets = [-1, 0, 1, 2] as const;

function OfficerCarousel({ title, officers }: { title: string; officers: CoordinatorMember[] }) {
  const [index, setIndex] = useState(0);
  const sortedOfficers = useMemo(
    () => [...officers].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" })),
    [officers]
  );

  const move = (direction: -1 | 1) => {
    setIndex((current) => (current + direction + sortedOfficers.length) % sortedOfficers.length);
  };

  if (sortedOfficers.length === 0) {
    return (
      <p className="border border-white/10 bg-white/5 p-5 text-sm text-white/60">
        No {title.toLowerCase()} profiles have been added yet.
      </p>
    );
  }

  return (
    <section className="space-y-4" aria-roledescription="carousel">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="font-display text-lg font-bold uppercase text-white">{title}</h3>
      </div>
      <div className="relative mx-auto h-[28rem] max-w-4xl overflow-hidden sm:h-[30rem] lg:h-[32rem]">
        <button
          type="button"
          aria-label={`Previous ${title.toLowerCase()}`}
          onClick={() => move(-1)}
          disabled={sortedOfficers.length < 2}
          className="absolute left-1 top-1/2 z-10 -translate-y-1/2 border border-white/10 bg-black/50 p-3 text-white disabled:cursor-not-allowed disabled:opacity-40 sm:left-2 sm:p-4"
        >
          <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" />
        </button>
        {carouselOffsets.map((offset) => {
          const officerIndex = (index + offset + sortedOfficers.length) % sortedOfficers.length;
          const officer = sortedOfficers[officerIndex];
          return (
            <article
              key={`${offset}-${officer.name}-${index}`}
              aria-hidden={offset === -1 || offset === 2}
              className="officer-carousel-enter absolute top-0 w-[32%] border border-white/10 bg-[#191b22]"
              style={{ left: `${17 + offset * 34}%` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#111319]">
                <Image
                  src={officer.image}
                  alt={officer.name}
                  fill
                  sizes="(max-width: 768px) 38vw, 384px"
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="min-h-24 border-t border-white/10 p-3 sm:p-4">
                <h4 className="truncate font-display text-sm font-bold uppercase text-white">{officer.name}</h4>
                <p className="mt-1 truncate font-mono text-xs uppercase text-red-500">{officer.post}</p>
                <p className="mt-1 truncate text-xs text-white/50">Roll No: {officer.rollNo}</p>
              </div>
            </article>
          );
        })}
        <button
          type="button"
          aria-label={`Next ${title.toLowerCase()}`}
          onClick={() => move(1)}
          disabled={sortedOfficers.length < 2}
          className="absolute right-1 top-1/2 z-10 -translate-y-1/2 border border-white/10 bg-black/50 p-3 text-white disabled:cursor-not-allowed disabled:opacity-40 sm:right-2 sm:p-4"
        >
          <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" />
        </button>
      </div>
    </section>
  );
}

function CoreExecutiveGrid({ officers }: { officers: CoreMember[] }) {
  const leadership = officers
    .filter((officer) => ["president", "vice president"].includes(officer.post.trim().toLowerCase()))
    .sort((a, b) => {
      const order = (role: string) => (role.trim().toLowerCase() === "president" ? 0 : 1);
      return order(a.post) - order(b.post) || a.name.localeCompare(b.name);
    });
  const heads = officers
    .filter((officer) => !["president", "vice president"].includes(officer.post.trim().toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  function OfficerCard({ officer }: { officer: CoreMember }) {
    return (
      <article className="border border-white/10 bg-[#191b22]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#111319]">
          <Image
            src={officer.image}
            alt={officer.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
            unoptimized
            className="object-contain"
          />
        </div>
        <div className="min-h-24 border-t border-white/10 p-3 sm:p-4">
          <h4 className="truncate font-display text-sm font-bold uppercase text-white">{officer.name}</h4>
          <p className="mt-1 truncate font-mono text-xs uppercase text-red-500">{officer.post}</p>
          <p className="mt-1 truncate text-xs text-white/50">Roll No: {officer.rollNo}</p>
        </div>
      </article>
    );
  }

  return (
    <section className="space-y-4">
      <div className="border-b border-white/10 pb-3">
        <h3 className="font-display text-lg font-bold uppercase text-white">Core Executive</h3>
      </div>
      {officers.length === 0 ? (
        <p className="border border-white/10 bg-white/5 p-5 text-sm text-white/60">
          No Core Executive profiles have been added yet.
        </p>
      ) : (
        <div className="space-y-8">
          {leadership.length > 0 && (
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
              {leadership.map((officer) => <OfficerCard key={officer.name} officer={officer} />)}
            </div>
          )}
          {heads.length > 0 && (
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {heads.map((officer) => <OfficerCard key={officer.name} officer={officer} />)}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

const clubPillars = [
  {
    code: "IGN-01",
    title: "Technical Arenas",
    description: "Hands-on workshops, hackathons, open-source sprints and project build nights run entirely by students. Ignite owns the technical arenas: the 12-hour hackathon, competitive programming, the Gen AI lab and the Technocrat crown.",
    metaLeft: "WING-01",
    metaRight: "IGNITE",
  },
  {
    code: "IGN-02",
    title: "Esports Circuits",
    description: "LAN tournaments, squad brackets and mainstage arena production. The eSports Society runs competitive gaming circuits year-round. Together with Ignite, it forms the dual-guild structure behind Xordium: code on one side, controllers on the other.",
    metaLeft: "WING-02",
    metaRight: "ARENA",
  },
  {
    code: "IGN-03",
    title: "Creative Tracks",
    description: "Gen AI poster duels, Ad-Mad content sprints, Midnight treasure hunts and Aerial drone soccer. Creative competitions where artistic vision meets technical execution under live constraints.",
    metaLeft: "WING-03",
    metaRight: "CREATIVE",
  },
  {
    code: "IGN-04",
    title: "Open Protocols",
    description: "Cross-campus competitive circuits, walk-in fun events and community showcases. No registration barriers — just show up, compete and connect. The open protocols ensure anyone can participate.",
    metaLeft: "WING-04",
    metaRight: "OPEN",
  },
];

export default function AboutPage() {
  const [officers, setOfficers] = useState([
    president,
    ...vicePresidents,
    ...otherCoreExecutives,
  ]);

  useEffect(() => {
    let active = true;
    fetch("/api/officers", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load committee information.");
        const data = await response.json();
        if (active && Array.isArray(data.officers)) {
          const databaseOfficers = data.officers;
          const databaseNames = new Set(
            databaseOfficers.map((officer: { name: string }) => officer.name.trim().toLocaleLowerCase("en"))
          );
          const coreOfficers = [
            president,
            ...vicePresidents,
            ...otherCoreExecutives,
          ];
          setOfficers([
            ...databaseOfficers.map((officer: { name: string; post: string }) => ({
              ...officer,
              post: officer.post ?? (["President", "Senior Coordinator", "Junior Coordinator"].includes(officer.post) ? officer.post : "Core Executive"),
            })),
            ...coreOfficers.filter((officer) => !databaseNames.has(officer.name.toLocaleLowerCase("en"))),
          ]);
        }
      })
      .catch((error: unknown) => {
        console.error("Unable to refresh officers:", error instanceof Error ? error.name : "Unknown error");
      });
    return () => { active = false; };
  }, []);

  const allOfficers = [
    president,
    ...vicePresidents,
    ...otherCoreExecutives,
  ];

  return (
    <main className="flex-grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-16">
      {/* 1. PAGE HEADER & STORY SECTION */}
      <section className="border border-white/10 bg-gradient-to-b from-[#16090b] to-[#0a0c10] p-6 sm:p-8 md:p-12 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/50 px-3 py-1">
              <span className="w-2 h-2 bg-red-500"></span>
              <span className="font-mono text-xs text-red-500 uppercase tracking-wider">
                OFFICIAL CHARTERED STUDENT ORGANIZATION
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-none font-black tracking-tight uppercase">
              XORDIUM <span className="text-red-500">5.0</span>
            </h1>
            <p className="font-mono text-sm sm:text-base leading-relaxed text-white/60 max-w-2xl">
              The convergence of open hardware, algorithmic dominance, underground cyberpunk culture and esports warfare — staged annually at Birla Institute of Technology, Patna.
            </p>
          </div>
        </div>

        {/* 3 photo grid */}
        <div className="mt-10 border border-white/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-[#101218]">
          {heroStats.slice(0, 3).map((stat, i) => (
            <div key={stat.value} className="relative h-64 overflow-hidden group">
              <div className="w-full h-full bg-gradient-to-br from-red-600/20 via-[#1a1c24] to-[#0a0c10] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="font-display text-4xl font-black text-red-500">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. CLUB PILLARS / WHAT WE DO */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-3">
          <div>
            <span className="font-mono text-xs text-red-500 uppercase">CORE PURPOSE</span>
            <h2 className="font-display text-xl font-bold uppercase text-white">WHAT WE DO // CLUB PILLARS</h2>
          </div>
          <span className="font-mono text-xs text-white/50 hidden sm:inline-block">
            PROGRAM ARCHITECTURE [4 STACKS]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubPillars.map((pillar) => (
            <div
              key={pillar.code}
              className="border border-white/10 bg-[#101218] p-6 flex flex-col justify-between hover:border-red-500 transition-colors duration-150"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-bold text-red-500">{pillar.code}</span>
                  <Gamepad2 className="w-5 h-5 text-white/50 group-hover:text-red-500 transition-colors" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-white">{pillar.title}</h3>
                <p className="font-mono text-sm leading-relaxed text-white/60">{pillar.description}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-white/50 font-mono text-xs">
                <span>{pillar.metaLeft}</span>
                <span className="text-red-500">{pillar.metaRight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXECUTIVE BOARD & OFFICERS */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-white/10 pb-3">
          <div>
            <span className="font-mono text-xs text-red-500 uppercase">STUDENT LEADERSHIP</span>
            <h2 className="font-display text-xl font-bold uppercase text-white">EXECUTIVE BOARD & OFFICERS</h2>
          </div>
          <span className="font-mono text-xs text-white/50">ELECTED BY MEMBERSHIP</span>
        </div>

        <div className="space-y-10">
          <CoreExecutiveGrid officers={[president, ...vicePresidents, ...otherCoreExecutives]} />
          <OfficerCarousel title="Senior Coordinator" officers={seniorCoordinators} />
          <OfficerCarousel title="Junior Coordinator" officers={juniorCoordinators} />
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="border-2 border-red-500 bg-[#0a0c10] p-8 md:p-16 text-center space-y-4 relative">
        <div className="max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-xs text-red-500 uppercase tracking-widest block">JOIN THE COMMUNITY</span>
          <h2 className="font-display text-3xl font-bold uppercase text-white leading-tight">WANT TO GET INVOLVED?</h2>
          <p className="font-mono text-sm leading-relaxed text-white/60">
            Join our weekly general body meetings or drop into our Discord. Whether you&apos;re looking to compete on varsity, learn stream production, or just play casual games after class, you have a spot here.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            className="bg-red-500 text-black font-mono px-8 py-3.5 uppercase font-bold tracking-wider hover:bg-red-400 transition-colors flex items-center gap-2 text-sm"
            href="https://www.instagram.com/ignite_bitp"
            target="_blank"
            rel="noreferrer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>JOIN THE CLUB DISCORD</span>
          </a>
          <Link
            className="border border-white/10 bg-white/5 text-white font-mono px-8 py-3.5 uppercase font-bold tracking-wider hover:border-white transition-colors flex items-center gap-2 text-sm"
            href="/events"
          >
            <Calendar className="w-4 h-4 text-red-500" />
            <span>VIEW EVENTS SCHEDULE</span>
          </Link>
        </div>
      </section>
    </main>
  );
}