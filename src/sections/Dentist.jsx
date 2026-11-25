import { useEffect, useRef, useState } from "react";

/* Put in /public/dentist/: bg.mp4 (water + island loop), optional bg.jpg poster,
   face-1..4.jpg, smile.jpg, card-smile.jpg, card-wellness.jpg                    */
const BG = "/assets/videos/beerlines2.mp4";

const CARDS = [
  {
    c: "w",
    t: "Cosmetic Dentistry",
    tag: "Get a Quote",
    p: "Gentle treatments inspired by nature, designed for lasting comfort.",
  },
  {
    c: "i",
    img: "/dentist/card-smile.jpg",
    t: "Preventive Care",
    tag: "Schedule Cleaning",
    p: "Routine cleanings and early detection keep your oral health thriving for years to come.",
  },
  {
    c: "l",
    t: "Restorative Solutions",
    tag: "Explore Options",
    p: "Crowns, implants, and bridges that look and feel completely natural.",
  },
  {
    c: "i",
    img: "/dentist/card-wellness.jpg",
    t: "Holistic Wellness",
    tag: "Learn More",
    p: "Biocompatible materials and minimally invasive techniques for whole-body health.",
  },
];
const STATS = [
  ["15+", "Years of Experience"],
  ["98%", "Satisfaction Rate"],
  ["2K+", "Happy Patients"],
];
const HEAD2 = [
  "Sustainable",
  "practices, pristine",
  "results, dentistry",
  "reimagined.",
];

function useInView(threshold = 0.5) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), {
      threshold,
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, on];
}
function useTicker(active, ms, fn) {
  const saved = useRef(fn);
  saved.current = fn;
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => saved.current(), ms);
    return () => clearInterval(id);
  }, [active, ms]);
}

const Arrow = ({ d = "right" }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    {d === "down" ? (
      <path d="M6 2v8M2.5 6.5L6 10l3.5-3.5" />
    ) : (
      <path d="M4 2l4 4-4 4" />
    )}
  </svg>
);

export default function Dentist() {
  const [s, setS] = useState(0);
  const [ref, on] = useInView(0.5);
  useTicker(on, 4500, () => setS((x) => 1 - x));

  return (
    <section ref={ref} className="dn" data-s={s}>
      <style>{css}</style>
      <video
        className="dn-bg"
        src={BG}
        poster="/dentist/bg.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

    
      <div className="dn-rail">
        <i />
      </div>

      {/* Scene A */}
      <div className={"dn-a " + (s ? "out" : "in")}>
        <small className="dn-eyebrow">Your Smile, Rooted in Care</small>
        <h1>
          A fresh
          <br />
          approach
          <br />
          <span className="ind">
            to <em>dental</em>
          </span>
          <br />
          wellness
        </h1>
        <p className="dn-sub">
          Gentle treatments inspired by nature, designed for lasting comfort.
        </p>
        <div className="dn-cta">
          <button className="dn-book">
            Book Now!{" "}
            <b>
              <Arrow />
            </b>
          </button>
          <button className="dn-ghost">Contact us</button>
        </div>

        <div className="dn-stats">
          {STATS.map(([n, l]) => (
            <div key={l}>
              <strong>{n}</strong>
              <span>{l}</span>
            </div>
          ))}
        </div>

        <aside className="dn-side">
          <div className="dn-av">
            {[1, 2, 3, 4].map((n) => (
              <img key={n} src={`/dentist/face-${n}.jpg`} alt="" />
            ))}
          </div>
          <h3>
            Precision crafted for every <em>smile</em>
          </h3>
          <p>Advanced care in a space that feels like a breath of fresh air.</p>
          <div className="dn-smile">
            <img src="/dentist/smile.jpg" alt="" />
            <button aria-label="More">+</button>
          </div>
        </aside>
      </div>

      {/* Scene B */}
      <div className={"dn-b " + (s ? "in" : "out")}>
        <h2>
          {HEAD2.map((l, i) => (
            <span key={l} style={{ "--i": i }}>
              {l}
            </span>
          ))}
        </h2>
        <div className="dn-cards">
          {CARDS.map((c, i) => (
            <article
              key={c.t}
              className={"dn-card " + c.c}
              style={{ "--i": i }}
            >
              {c.img && <img src={c.img} alt="" />}
              <span className="tag">{c.tag}</span>
              <button className="plus" aria-label="Open">
                +
              </button>
              <div className="txt">
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        className="dn-down"
        aria-label="Scroll down"
        onClick={() => setS(1 - s)}
      >
        <Arrow d="down" />
      </button>
    </section>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500&family=Figtree:wght@300;400;500&display=swap');
.dn{--lime:#e4ff9a;position:relative;height:100vh;min-height:680px;overflow:hidden;color:#fff;background:#3d6b7d;font-family:Figtree,Arial,sans-serif}
.dn *{box-sizing:border-box}
.dn-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.dn em{font-style:italic;color:var(--lime)}
.dn h1,.dn h2,.dn h3{font-family:Unbounded,Arial,sans-serif;font-weight:400;text-transform:uppercase;margin:0}

.dn-nav{position:absolute;z-index:6;top:0;left:0;right:0;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:16px 28px;font-size:11px}
.dn-l{display:flex;gap:16px;align-items:center}
.dn-burger{background:none;border:0;display:grid;gap:3px;padding:4px;cursor:pointer}
.dn-burger i{display:block;width:13px;height:1px;background:#fff}
.dn-nav nav{display:flex;gap:min(9vw,140px)}
.dn-nav a{color:#fff;text-decoration:none}
.dn-r{display:flex;justify-content:flex-end;align-items:center;gap:8px}
.dn-soc{width:24px;height:24px;border-radius:50%;border:1px solid rgba(255,255,255,.5);display:grid;place-items:center;font-size:9px}
.dn-book{display:inline-flex;align-items:center;gap:14px;border:0;border-radius:99px;background:var(--lime);color:#17210a;padding:5px 5px 5px 18px;font:500 12px Figtree,sans-serif;cursor:pointer}
.dn-book b{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.75);display:grid;place-items:center}
.dn-book.dark{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.6);margin-left:6px;backdrop-filter:blur(8px)}
.dn-book.dark b{background:var(--lime);color:#17210a}
.dn-rail{position:absolute;z-index:5;top:56px;left:0;right:0;border-top:1px dotted rgba(255,255,255,.45)}
.dn-rail i{position:absolute;top:-3px;left:0;width:5px;height:5px;border-radius:50%;background:#fff;animation:dnrail 4.5s linear infinite alternate}
@keyframes dnrail{to{left:100%}}

.dn-a,.dn-b{position:absolute;inset:0;z-index:3;transition:opacity .7s,transform .9s cubic-bezier(.22,1,.36,1)}
.dn-a.out{opacity:0;transform:translateY(-24px);pointer-events:none}
.dn-b.out{opacity:0;pointer-events:none}

.dn-eyebrow{position:absolute;left:5vw;top:15vh;font-size:9px;opacity:.9}
.dn-a h1{position:absolute;left:5vw;top:19vh;font-size:clamp(34px,5.1vw,76px);line-height:1.02;letter-spacing:-.01em}
.dn-a h1 .ind{display:inline-block;padding-left:1.6em}
.dn-sub{position:absolute;left:5vw;top:56vh;max-width:250px;margin:0;font-size:12px;line-height:1.5;opacity:.9}
.dn-cta{position:absolute;left:5vw;top:68vh;display:flex;gap:10px}
.dn-ghost{border:1px solid rgba(255,255,255,.65);background:none;color:#fff;border-radius:99px;padding:0 18px;height:36px;font:400 12px Figtree,sans-serif;cursor:pointer}

.dn-stats{position:absolute;left:50%;bottom:8vh;display:flex;gap:6px}
.dn-stats div{width:clamp(80px,8.5vw,120px);aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.14);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.18);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:10px}
.dn-stats strong{font:400 clamp(16px,1.6vw,22px) Unbounded,sans-serif}
.dn-stats span{font-size:7px;opacity:.7;margin-top:4px}

.dn-side{position:absolute;right:2vw;top:12vh;bottom:2vh;width:min(22vw,290px);display:flex;flex-direction:column}
.dn-av{display:flex;justify-content:flex-end;margin-bottom:6vh}
.dn-av img{width:26px;height:26px;border-radius:50%;object-fit:cover;border:2px solid #fff;margin-left:-6px;background:#b88}
.dn-side h3{font-size:clamp(14px,1.3vw,19px);line-height:1.12;text-align:right}
.dn-side p{margin:12px 0 0 auto;max-width:200px;font-size:10px;line-height:1.5;opacity:.7;text-align:left}
.dn-smile{position:relative;margin-top:auto;height:26vh;border-radius:22px;overflow:hidden;background:#c9a}
.dn-smile img{width:100%;height:100%;object-fit:cover}
.dn-smile button{position:absolute;left:10px;bottom:10px;width:30px;height:30px;border-radius:50%;border:0;background:rgba(255,255,255,.4);backdrop-filter:blur(8px);color:#fff;font-size:16px;cursor:pointer}

.dn-down{position:absolute;left:18px;bottom:18px;z-index:6;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.6);background:rgba(255,255,255,.08);color:#fff;display:grid;place-items:center;cursor:pointer}

/* scene B */
.dn-b h2{position:absolute;left:5vw;top:14vh;font-size:clamp(20px,2.6vw,38px);line-height:1.04;max-width:62vw}
.dn-b h2 span{display:block;opacity:0;filter:blur(8px);transform:translateY(14px);transition:opacity .8s,filter .8s,transform .8s}
.dn-b.in h2 span{opacity:1;filter:blur(0);transform:none;transition-delay:calc(var(--i)*.14s + .15s)}
.dn-cards{position:absolute;left:5vw;right:2vw;bottom:2vh;height:50vh;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;align-items:end}
.dn-card{position:relative;border-radius:26px;overflow:hidden;padding:16px;display:flex;flex-direction:column;justify-content:flex-end;color:#fff;height:88%;opacity:0;transform:translateY(40px);transition:opacity .7s,transform .9s cubic-bezier(.22,1,.36,1)}
.dn-card.w,.dn-card.l{height:100%}
.dn-b.in .dn-card{opacity:1;transform:none;transition-delay:calc(var(--i)*.1s + .35s)}
.dn-card.w{background:#f3f1ee;color:#1d2125}
.dn-card.l{background:var(--lime);color:#1d2125}
.dn-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.dn-card>*:not(img){position:relative;z-index:1}
.dn-card .tag{position:absolute;top:16px;left:16px;font-size:8px;border:1px solid currentColor;border-radius:99px;padding:3px 9px}
.dn-card.w .tag{color:#c0622e}
.dn-card .plus{position:absolute;top:14px;right:14px;width:28px;height:28px;border-radius:50%;border:0;background:rgba(255,255,255,.85);color:#222;font-size:16px;cursor:pointer}
.dn-card h3{font-size:clamp(11px,1.05vw,14px);line-height:1.1;margin-bottom:8px}
.dn-card p{margin:0;font-size:9px;line-height:1.45;opacity:.85}

.dn-nav a:focus-visible,.dn-book:focus-visible,.dn-ghost:focus-visible,.dn-down:focus-visible,.dn-card button:focus-visible{outline:2px solid #fff;outline-offset:3px}
@media (max-width:820px){
  .dn-nav nav,.dn-soc,.dn-stats,.dn-eyebrow{display:none}
  .dn-a h1{font-size:34px;top:14vh}
  .dn-side{display:none}
  .dn-sub{top:52vh}.dn-cta{top:64vh}
  .dn-b h2{max-width:90vw;font-size:18px}
  .dn-cards{grid-template-columns:1fr 1fr;height:62vh;bottom:1vh}
  .dn-card{height:100%!important}.dn-card p{display:none}
}
@media (prefers-reduced-motion:reduce){.dn *{transition:none!important;animation:none!important}}
`;
