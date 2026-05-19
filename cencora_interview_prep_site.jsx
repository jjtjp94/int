import React, { useEffect, useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Keyboard, Star, Zap, Layers3, ShieldCheck, Building2, Menu, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const interviewData = {
  narrative: {
    title: "Strategic narrative",
    subtitle: "Use this for 'Tell me about yourself' or any opening.",
    body: [
      "You have been the person Cencora's clients are. You have run central pharmacy operations at a major academic medical center. You have taken pharmacy operations through massive construction, technology transformation, and workflow redesign.",
      "You know what breaks, what works, and what health system leaders need to hear before they approve change. That operational credibility is what you bring to every client engagement.",
    ],
  },
  gap: {
    title: "Gap to address proactively",
    body: [
      "You have not run a standalone CSC. Say it before they ask.",
      "Then bridge immediately: your central pharmacy operations at Cedars-Sinai perform the same functions a CSC does: inventory optimization, repackaging, distribution, automation, shortage mitigation. The difference is branding, not substance.",
      "Your advantage is that you understand the downstream client's world because you've lived in it.",
    ],
  },
  themes: [
    { icon: ShieldCheck, title: "Operational credibility", text: "You've done the work, not studied it." },
    { icon: Layers3, title: "Data-driven decision making", text: "Metrics, business cases, and ROI framing." },
    { icon: Building2, title: "Stakeholder influence", text: "Move people without authority." },
  ],
  qa: [
    {
      q: "Walk us through your experience managing central pharmacy operations.",
      tags: ["operations", "leadership", "central pharmacy"],
      a: [
        "At Cedars-Sinai, I manage a large central pharmacy operation supporting inpatient, outpatient, and specialty workflows across a major academic medical center.",
        "I led through a major facility expansion and technology modernization effort, keeping dispensing continuity while we reconfigured clean room infrastructure, IV workflow zones, and automation placement.",
        "I also led implementation and optimization of automation and information systems, built processes around them, trained staff, and tracked outcomes.",
        "The lesson: strong central pharmacy performance usually comes down to workflow design, space utilization, automation integration, and sequencing change without breaking operations.",
      ],
    },
    {
      q: "What's your experience with pharmacy automation and technology implementation?",
      tags: ["technology", "automation", "ROI"],
      a: [
        "I have led pharmacy technology implementations from planning through go-live and optimization.",
        "At Cedars-Sinai, I manage central pharmacy operations that rely on carousel-based automated dispensing systems, IV workflow management software, and barcode verification at dispensing points.",
        "At BayCare, I oversaw ADC optimization across inpatient units, improving par levels, reducing waste, and closing diversion gaps through technology controls.",
        "My graduate training helped me evaluate ROI and build business cases, while my operations experience taught me what actually works on the floor.",
      ],
    },
    {
      q: "How have you managed a large-scale construction or renovation project in a pharmacy setting?",
      tags: ["construction", "renovation", "workflow"],
      a: [
        "At Cedars-Sinai, I led the pharmacy through a multi-phase construction project that redesigned the central pharmacy footprint while keeping 24/7 operations running.",
        "I started with a current-state assessment, mapped every workflow, measured throughput, and identified layout bottlenecks.",
        "I aligned pharmacy, nursing, facilities, infection control, and contractors before walls moved, then sequenced execution so we always maintained a functional dispensing core.",
        "The result was a layout that increased throughput, improved ergonomics, and positioned us for future automation integration.",
      ],
    },
    {
      q: "What's your approach to assessing a health system's supply chain operations and identifying improvement opportunities?",
      tags: ["assessment", "supply chain", "data"],
      a: [
        "I use a structured progression from discovery to recommendation.",
        "First, I gather current-state input through interviews, direct observation, and data collection. Then I review dispensing, inventory turns, waste, diversion, labor, and fill-rate data.",
        "Next, I map workflows, identify bottlenecks, compare against benchmarks, and prioritize gaps by risk, cost, and capacity impact.",
        "Finally, I build tiered recommendations: quick wins plus longer-horizon structural changes with a business case behind each one.",
      ],
    },
    {
      q: "How do you build stakeholder buy-in when recommending operational changes?",
      tags: ["influence", "stakeholders", "buy-in"],
      a: [
        "I start by listening before advocating.",
        "On a central pharmacy renovation, I met pharmacy leadership, nursing, facilities, infection control, and finance individually to understand concerns before presenting anything formal.",
        "When I presented, I framed the project in operational, clinical, and financial layers so each stakeholder heard the part that mattered most to them.",
        "I build trust by showing I understand their pressures before I ask them to change anything.",
      ],
    },
    {
      q: "Tell us about a time you had to manage through a drug shortage.",
      tags: ["shortage", "crisis", "inventory"],
      a: [
        "During the GLP-1 shortage, I activated our shortage response protocol immediately.",
        "I projected days-on-hand under multiple supply scenarios, convened P&T quickly, and created a tiered conservation plan with restrictions, therapeutic alternatives, and alternate sourcing.",
        "I built a live tracking dashboard so leadership had daily visibility into inventory and transitions.",
        "We preserved therapy for high-risk patients and reduced waste through utilization controls.",
      ],
    },
    {
      q: "Why are you interested in transitioning from a health system role to a consulting role?",
      tags: ["why consulting", "motivation", "impact"],
      a: [
        "My career has been built inside the operations. I have run central pharmacy through construction, redesign, and technology change under real constraints.",
        "I want to multiply that impact. Consulting lets the same operational instincts help dozens of health systems instead of just one.",
        "Cencora is compelling because it combines consulting with real distribution data and implementation infrastructure.",
        "I am early enough to build consulting skills properly, but experienced enough that I am not starting from theory.",
      ],
    },
    {
      q: "What experience do you have with 340B programs?",
      tags: ["340B", "compliance", "operations"],
      a: [
        "Both institutions I have worked at were 340B-covered entities.",
        "My exposure is operational: split billing environments, audit readiness, eligibility documentation, and workflow coordination with compliance teams.",
        "I also understand the tension between 340B optimization and centralized supply chain models, especially when inventory controls and system configurations need to preserve compliance.",
        "I was not the program director, and I am direct about that. My value is in how 340B intersects with daily pharmacy operations and supply chain structure.",
      ],
    },
    {
      q: "How would you approach evaluating whether a health system should centralize pharmacy services?",
      tags: ["centralization", "CSC", "financial model"],
      a: [
        "I would start with a current-state assessment of geography, facilities, volume, and duplicated work.",
        "Then I would build the financial model: labor, inventory inefficiency, carrying costs, and the capital and operating costs of centralization.",
        "Technology readiness and staffing transition are critical gates. I would sequence services, starting with high-volume, lower-complexity functions to build confidence.",
        "The result is a phased recommendation with a financial case, technology pathway, and change plan leadership can approve.",
      ],
    },
    {
      q: "Describe a situation where you had to influence decision-makers without direct authority.",
      tags: ["influence", "leadership", "pilot"],
      a: [
        "At Cedars-Sinai, I identified leakage in our 340B contract pharmacy program that required buy-in from leaders outside my reporting line.",
        "I built the business case using six months of data, targeted a receptive medical director, framed it as a patient-care issue, and proposed a 90-day pilot.",
        "The pilot improved capture rate quickly, and I used those results to secure broader approval.",
        "The authority came from evidence and relationships, not the org chart.",
      ],
    },
    {
      q: "What do you know about CSC operations, and how does your central pharmacy experience translate?",
      tags: ["CSC", "operations", "bridge"],
      a: [
        "A CSC is a centralized hub for unit-dose repackaging, low unit-of-move distribution, forward buying, NDC optimization, and inventory management.",
        "At Cedars-Sinai, I have managed the operational backbone of a large central pharmacy: inventory optimization, shortage management, and multi-site workflow redesign.",
        "I have hands-on experience with unit-dose operations, compliance controls, automation, and labor modeling.",
        "I have not managed a standalone CSC branded as such, but I have run the operational equivalent and understand the downstream client's world intimately.",
      ],
    },
    {
      q: "How do you use data to drive operational improvements in pharmacy?",
      tags: ["metrics", "analytics", "improvement"],
      a: [
        "I track inventory turns, fill rates, expiration waste, cost per dose, shortage frequency, and ADC par levels.",
        "I use daily data from pharmacy systems and ERP tools, then visualize trends in dashboards for both clinical and finance leadership.",
        "One example: after a census shift, I recalibrated par levels using demand-weighted analysis and improved fill rates while reducing waste.",
        "Data only matters when it leads to a decision. My focus is always on connecting the insight to the intervention.",
      ],
    },
  ],
  askThem: [
    "What does a typical client engagement look like from the first call to final deliverable?",
    "How does the team of four divide work across engagements?",
    "What is the biggest challenge the team is facing right now?",
    "What attracted you both to consulting instead of staying in health system operations?",
    "How does this team interact with the broader Accelerate Pharmacy Solutions group?",
    "What does success look like in the first 6 to 12 months?",
    "How do you measure the impact of your consulting work with clients?",
    "What misconception do health systems most often have about centralizing pharmacy services?",
  ],
  tactics: [
    { label: "45-minute timing", value: "First 5 min introductions, next 25-30 min their questions, final 10 min your questions." },
    { label: "Opening move", value: "Mention the USF connection naturally and keep moving." },
    { label: "Best rehearse first", value: "Q11 CSC bridge and Q7 why consulting." },
    { label: "Answer length", value: "Keep answers to 2-3 minutes. Offer to go deeper if needed." },
    { label: "Closing", value: "Thank them by name and reference one specific thing they said." },
  ],
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SectionCard({ title, subtitle, children, icon: Icon }) {
  return (
    <Card className="border-slate-200/70 shadow-sm rounded-3xl bg-white/90 backdrop-blur">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-3">
          {Icon ? <Icon className="h-5 w-5 text-slate-700" /> : null}
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
        </div>
        {subtitle ? <CardDescription className="text-sm md:text-base">{subtitle}</CardDescription> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function InterviewPrepSite() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return interviewData.qa;
    return interviewData.qa.filter((item) => {
      const hay = [item.q, ...(item.tags || []), ...item.a].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  useEffect(() => {
    if (!filtered.length) return;
    if (selected >= filtered.length) setSelected(0);
  }, [filtered, selected]);

  const current = filtered[selected] || filtered[0];

  useEffect(() => {
    const onKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const typing = activeTag === "input" || activeTag === "textarea";
      if (e.key === "?" && !typing) {
        e.preventDefault();
        setShowShortcuts((v) => !v);
        return;
      }
      if (e.key === "/" && !typing) {
        e.preventDefault();
        document.getElementById("search-box")?.focus();
        return;
      }
      if (e.key === "Escape") {
        setShowShortcuts(false);
        setMenuOpen(false);
        return;
      }
      if (typing) return;
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "n") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "p") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (/^[1-9]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        if (filtered[idx]) setSelected(idx);
      }
      if (e.key === "0") {
        if (filtered[9]) setSelected(9);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-[1600px] px-4 py-4 md:px-6 md:py-6">
        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <aside className={cn("lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]", menuOpen ? "block" : "hidden lg:block") }>
            <Card className="h-full rounded-3xl border-slate-200 shadow-sm bg-white/95 backdrop-blur">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                      <Zap className="h-3.5 w-3.5" />
                      Cencora interview vault
                    </div>
                    <CardTitle className="mt-3 text-2xl leading-tight md:text-3xl">Interview prep website</CardTitle>
                    <CardDescription className="mt-2 text-sm md:text-base">
                      Fast navigation. Clean layout. Keyboard-first.
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="search-box"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelected(0);
                    }}
                    placeholder="Search questions, themes, or keywords..."
                    className="h-11 rounded-2xl pl-9"
                  />
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                  <Badge variant="secondary" className="rounded-full">/ search</Badge>
                  <Badge variant="secondary" className="rounded-full">j/k next</Badge>
                  <Badge variant="secondary" className="rounded-full">n/p move</Badge>
                  <Badge variant="secondary" className="rounded-full">1-9 jump</Badge>
                  <Badge variant="secondary" className="rounded-full">? shortcuts</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 overflow-y-auto lg:max-h-[calc(100vh-14rem)]">
                <SectionCard title={interviewData.narrative.title} subtitle={interviewData.narrative.subtitle} icon={Star}>
                  <div className="space-y-3 text-sm leading-6 text-slate-700">
                    {interviewData.narrative.body.map((line) => <p key={line}>{line}</p>)}
                  </div>
                </SectionCard>

                <SectionCard title={interviewData.gap.title} subtitle="Say it before they ask, then bridge hard." icon={ShieldCheck}>
                  <div className="space-y-3 text-sm leading-6 text-slate-700">
                    {interviewData.gap.body.map((line) => <p key={line}>{line}</p>)}
                  </div>
                </SectionCard>

                <div className="grid gap-3">
                  {interviewData.themes.map((theme) => {
                    const Icon = theme.icon;
                    return (
                      <Card key={theme.title} className="rounded-2xl border-slate-200">
                        <CardContent className="flex items-start gap-3 p-4">
                          <div className="rounded-2xl bg-slate-100 p-2">
                            <Icon className="h-4 w-4 text-slate-700" />
                          </div>
                          <div>
                            <div className="font-medium">{theme.title}</div>
                            <div className="mt-1 text-sm text-slate-600">{theme.text}</div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <SectionCard title="Interview tactics" subtitle="The parts that matter under time pressure." icon={Keyboard}>
                  <div className="space-y-2 text-sm text-slate-700">
                    {interviewData.tactics.map((item) => (
                      <div key={item.label} className="flex gap-3">
                        <span className="min-w-28 font-medium text-slate-900">{item.label}</span>
                        <span className="text-slate-600">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </CardContent>
            </Card>
          </aside>

          <main className="space-y-4">
            <div className="flex items-center justify-between gap-3 lg:hidden">
              <Button variant="outline" className="rounded-2xl" onClick={() => setMenuOpen((v) => !v)}>
                <Menu className="mr-2 h-4 w-4" />
                Menu
              </Button>
              <Button variant="outline" className="rounded-2xl" onClick={() => setShowShortcuts(true)}>
                <Keyboard className="mr-2 h-4 w-4" />
                Hotkeys
              </Button>
            </div>

            <Card className="rounded-3xl border-slate-200 shadow-sm bg-white/95 backdrop-blur">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Q&A navigator</div>
                    <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">{current?.q || "No matching question"}</h1>
                    <p className="mt-2 max-w-3xl text-sm md:text-base text-slate-600">
                      Use the sidebar, search, or keyboard shortcuts to move quickly through every answer.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" className="rounded-2xl" onClick={() => setSelected((s) => Math.max(s - 1, 0))} disabled={selected === 0}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Prev
                    </Button>
                    <Button variant="outline" className="rounded-2xl" onClick={() => setSelected((s) => Math.min(s + 1, filtered.length - 1))} disabled={selected >= filtered.length - 1}>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
              <Card className="rounded-3xl border-slate-200 shadow-sm bg-white/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-base">Questions</CardTitle>
                  <CardDescription>
                    {filtered.length} matched. Use number keys to jump.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  {filtered.map((item, idx) => (
                    <button
                      key={item.q}
                      onClick={() => setSelected(idx)}
                      className={cn(
                        "w-full rounded-2xl border px-3 py-3 text-left transition",
                        selected === idx
                          ? "border-slate-900 bg-slate-900 text-white shadow-md"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-medium uppercase tracking-[0.2em] opacity-70">Q{idx + 1}</div>
                          <div className="mt-1 text-sm font-medium leading-5">{item.q}</div>
                        </div>
                        <Badge variant={selected === idx ? "secondary" : "outline"} className="rounded-full shrink-0">
                          {idx + 1}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-4">
                {current ? (
                  <Card className="rounded-3xl border-slate-200 shadow-sm bg-white/95 backdrop-blur">
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          {current.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="rounded-full capitalize">{tag}</Badge>
                          ))}
                        </div>
                        <Badge variant="outline" className="rounded-full">Q{selected + 1}</Badge>
                      </div>
                      <CardTitle className="text-xl md:text-3xl leading-tight">{current.q}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        {current.a.map((item, idx) => (
                          <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                            {item}
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                        Open with a 1–2 sentence bridge, then expand with one example, one metric, and one takeaway.
                      </div>
                    </CardContent>
                  </Card>
                ) : null}

                <div className="grid gap-4 lg:grid-cols-2">
                  <SectionCard title="Questions to ask them" subtitle="Pick 4, not all 8.">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {interviewData.askThem.map((q) => (
                        <div key={q} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700">
                          {q}
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  <SectionCard title="Closing tactics" subtitle="Use this in the last 1-2 minutes.">
                    <div className="space-y-3 text-sm leading-6 text-slate-700">
                      <p>Thank them by name.</p>
                      <p>Reference one specific thing they said.</p>
                      <p>Reinforce interest in the team, not just the company.</p>
                      <p>Example: "The way you described [specific thing] confirms this is where I want to be."</p>
                    </div>
                  </SectionCard>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {showShortcuts ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" onClick={() => setShowShortcuts(false)}>
          <Card className="w-full max-w-lg rounded-3xl border-slate-200 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Keyboard shortcuts</CardTitle>
              <CardDescription>Fast movement through the interview deck.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <div className="flex justify-between"><span>/</span><span>Focus search</span></div>
              <div className="flex justify-between"><span>j / ↓</span><span>Next question</span></div>
              <div className="flex justify-between"><span>k / ↑</span><span>Previous question</span></div>
              <div className="flex justify-between"><span>n / p</span><span>Next / previous</span></div>
              <div className="flex justify-between"><span>1-9, 0</span><span>Jump to question</span></div>
              <div className="flex justify-between"><span>?</span><span>Toggle this panel</span></div>
              <div className="flex justify-between"><span>Esc</span><span>Close overlays</span></div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
