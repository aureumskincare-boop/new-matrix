import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";

const VIDEO_DARK = "/assets/videos/new-engine.mp4";
const VIDEO_PINK = "/assets/videos/carlines.mp4";

const FEATURES = [
  [
    "Adaptive Suspension",
    "Real-time adjustments for instant feedback.",
    "glass",
  ],
  ["Digital Performance", "Integrated driving analytics.", "white"],
  ["Signature Lighting", "Distinctive lighting.", "glass"],
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

const Bg = ({ src, poster, className, style }) => (
  <video
    className={"fe-bg " + (className || "")}
    style={style}
    src={src}
    poster={poster}
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
  />
);

export default function Ferrari() {
  const [s, setS] = useState(0);
  const [ref, on] = useInView(0.5);
  useTicker(on, 7000, () => setS((x) => 1 - x));

  return (
    <section ref={ref} className="fe" data-scene={s}>
      <style>{css}</style>

      {/* Video backgrounds: dark scene, pink scene wipes up over it */}
      <Bg src={VIDEO_DARK} poster="/assets/images/text-marquee-1.png" />
      <Bg src={VIDEO_PINK} poster="/assets/images/text-marquee-3.png" className="fe-wipe" />
      <div className="fe-shade" />

      <header className="fe-nav">
       <img src={logo} width="120" alt="Ferrari" />
        <nav>
          {["Performance", "Technology", "Interior", "Experience"].map((l) => (
            <a key={l} href={"#" + l.toLowerCase()}>
              {l}
            </a>
          ))}
        </nav>
        <button className="fe-menu" aria-label="Menu">
          <i />
          <i />
        </button>
      </header>

      {/* Scene 1 */}
      <div className={"fe-scene fe-a " + (s ? "out" : "in")}>
        <h1>
          Velocity
          <br />
          <em>Beyond</em>
          <br />
          Limits
        </h1>
        <p className="fe-p">
          Precision engineered performance designed to redefine modern luxury
          driving experiences.
        </p>
        <button className="fe-btn">
          Explore more <span className="fe-line" />
        </button>
        <button className="fe-play" aria-label="Play film">
          <svg width="16" height="18" viewBox="0 0 16 18">
            <path d="M1 1l14 8-14 8z" fill="#fff" />
          </svg>
        </button>

        <div className="fe-model">
          <div className="fe-name">
            <svg width="12" height="16" viewBox="0 0 12 16" fill="#fff">
              <path d="M4 0c1 3 0 5-2 7 3 0 5 2 5 5 0 2-1 3-3 4 5-1 8-4 8-8S8 2 4 0z" />
            </svg>
            Ferrari <b>296 GTB</b>
          </div>
          <div className="fe-grid">
            <div className="fe-thumb">
              <video src={VIDEO_PINK} muted loop autoPlay playsInline />
            </div>
            <div className="fe-stat">
              15<small>s</small>
              <em>0–100 km/h</em>
            </div>
            <div className="fe-stat">
              300<small>km/h</small>
              <em>Top speed</em>
            </div>
            <div className="fe-stat">
              120<small>mph</small>
              <em>Cruise</em>
            </div>
          </div>
        </div>
      </div>

      {/* Scene 2 */}
      <div className={"fe-scene fe-b " + (s ? "in" : "out")}>
        <h1>
          Carbon
          <br />
          Fiber
          <br />
          Chassis
        </h1>
        <div className="fe-mini">
          <img src="/assets/images/text-marquee-1.png" alt="" />
          <img src="/assets/images/text-marquee-3.png" alt="" />
        </div>
        <p className="fe-p">
          Ultra-lightweight construction improves handling, responsiveness, and
          structural performance on every road.
        </p>
        <button className="fe-btn light">Discover velocity</button>

        <div className="fe-feats">
          {FEATURES.map(([t, d, kind], k) => (
            <article key={t} className={"fe-feat " + kind}>
              <div className="fe-ft">
                <b>{t}</b>
                <span>{d}</span>
              </div>
              <img src={`/assets/images/feat-${k + 1}.png`} alt="" />
            </article>
          ))}
        </div>
      </div>

      {/* Brand switcher (scene 1 only) */}
      <div className={"fe-brands " + (s ? "out" : "in")}>
        {[1, 2, 3, 4, 5].map((n, k) => (
          <button
            key={n}
            className={k === 0 ? "on" : ""}
            aria-label={"Brand " + n}
            onClick={() => setS(0)}
          >
            <img src={`/ferrari/brand-${n}.png`} alt="" />
          </button>
        ))}
      </div>

      <div className="fe-dots">
        {[0, 1].map((k) => (
          <button
            key={k}
            className={s === k ? "on" : ""}
            onClick={() => setS(k)}
            aria-label={"Scene " + (k + 1)}
          />
        ))}
      </div>
    </section>
  );
}

const css = `
.fe{position:relative;height:100vh;min-height:640px;overflow:hidden;background:#050505;color:#fff;font-family:"Helvetica Neue",Inter,Arial,sans-serif}
.fe *{box-sizing:border-box}
.fe-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fe-wipe{clip-path:inset(100% 0 0 0);transition:clip-path 1.3s cubic-bezier(.77,0,.18,1)}
.fe[data-scene="1"] .fe-wipe{clip-path:inset(0 0 0 0)}
.fe-shade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(0,0,0,.55),transparent 55%);transition:opacity 1s}
.fe[data-scene="1"] .fe-shade{opacity:0}

.fe-nav{position:absolute;top:0;left:0;right:0;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:22px 5vw}
.fe-nav nav{display:flex;gap:6vw;position:absolute;left:50%;transform:translateX(-10%)}
.fe-nav a{color:#fff;text-decoration:none;font-size:11px;letter-spacing:.03em;opacity:.85}
.fe-menu{background:none;border:0;display:grid;gap:4px;cursor:pointer;padding:4px}
.fe-menu i{display:block;width:16px;height:1px;background:#fff}
.fe-menu i+i{width:11px;margin-left:auto}

.fe-scene{position:absolute;inset:0;padding:16vh 5vw 0;z-index:3;transition:opacity .8s,transform .9s cubic-bezier(.22,1,.36,1)}
.fe-scene.out{opacity:0;transform:translateY(-28px);pointer-events:none}
.fe-b.out{transform:translateY(28px)}
.fe-b.in{transition-delay:.45s}
.fe-scene h1{margin:0;font-weight:300;font-size:clamp(44px,7vw,92px);line-height:.98;letter-spacing:-.025em;text-transform:uppercase}
.fe-a h1 em{font-style:italic;font-weight:300;display:inline-block;padding-left:.35em}
.fe-p{margin:3.2vh 0 3vh;max-width:430px;font-size:18px;line-height:1.6;color:rgba(255,255,255,.78)}
.fe-btn{display:inline-flex;align-items:center;gap:14px;border:0;background:#fff;color:#111;padding:13px 20px;font-size:18px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}
.fe-line{display:inline-block;width:42px;height:1px;background:#fff;position:absolute;margin-left:130px;opacity:.7}
.fe-btn:focus-visible,.fe-play:focus-visible,.fe-brands button:focus-visible{outline:2px solid #fff;outline-offset:3px}

.fe-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-30%);width:56px;height:56px;border-radius:50%;border:0;background:rgba(0,0,0,.25);backdrop-filter:blur(6px);display:grid;place-items:center;cursor:pointer}

/* model + stats */
.fe-model{position:absolute;right:5vw;bottom:9vh;width:min(36vw,400px)}
.fe-name{display:flex;gap:10px;align-items:center;justify-content:flex-end;font-size:18px;margin-bottom:14px;opacity:.9}
.fe-name b{font-weight:600}
.fe-grid{display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:84px;gap:0;background:rgba(20,20,22,.55);backdrop-filter:blur(14px)}
.fe-thumb{background:#c2185b;overflow:hidden}
.fe-thumb video{width:100%;height:100%;object-fit:cover}
.fe-stat{padding:14px 16px;font-size:30px;font-weight:300;color:rgba(255,255,255,.9);display:flex;align-items:baseline;flex-wrap:wrap;align-content:center}
.fe-stat small{font-size:11px;margin-left:4px;opacity:.5}
.fe-stat em{display:block;width:100%;font-style:normal;font-size:9px;opacity:.45;margin-top:2px}
.fe-grid .fe-stat:nth-child(2){grid-column:2}

/* scene 2 */
.fe-b h1{font-weight:300}
.fe-mini{display:flex;gap:15px;margin:24vh 0 0;position:absolute;left:5vw;bottom:23vh}
.fe-mini img{width:44px;gap:15px;height:58px;object-fit:cover;border-radius:2px;background:#d35a85}
.fe-b .fe-p{position:absolute;left:calc(5vw + 100px);bottom:20vh;max-width:200px;margin:0;font-size:18px}
.fe-b .fe-btn{position:absolute;left:5vw;bottom:9vh}
.fe-btn.light{box-shadow:0 8px 20px rgba(0,0,0,.18)}
.fe-feats{position:absolute;right:5vw;top:30vh;width:min(32vw,360px);display:grid;gap:0}
.fe-feat{display:grid;grid-template-columns:1fr 38%;min-height:92px;font-size:10px;line-height:1.35}
.fe-ft{padding:14px 14px}
.fe-ft b{display:block;font-size:13px;font-weight:500;margin-bottom:4px}
.fe-ft span{opacity:.8}
.fe-feat img{width:100%;height:100%;object-fit:cover}
.fe-feat.glass{background:rgba(255,255,255,.12);backdrop-filter:blur(10px);color:#fff}
.fe-feat.white{background:#fff;color:#111;grid-template-columns:38% 1fr;transform:translateX(-14%);box-shadow:0 10px 30px rgba(0,0,0,.14)}
.fe-feat.white img{order:-1}

/* brands + dots */
.fe-brands{position:absolute;left:5vw;bottom:9vh;z-index:4;display:flex;gap:18px;align-items:center;transition:opacity .6s}
.fe-brands.out{opacity:0;pointer-events:none}
.fe-brands button{width:30px;height:30px;border-radius:50%;border:1px solid transparent;background:none;display:grid;place-items:center;cursor:pointer;opacity:.6;padding:0}
.fe-brands button.on{width:42px;height:42px;opacity:1;border-color:rgba(255,255,255,.7)}
.fe-brands img{width:55%;height:55%;object-fit:contain;filter:brightness(0) invert(1)}
.fe-dots{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);z-index:5;display:flex;gap:8px}
.fe-dots button{width:22px;height:2px;border:0;background:rgba(255,255,255,.4);cursor:pointer;padding:0}
.fe-dots button.on{background:#fff}

@media (max-width:760px){
  .fe-nav nav{display:none}
  .fe-model{width:88vw;right:6vw;bottom:14vh}
  .fe-grid{grid-auto-rows:64px}
  .fe-feats{top:auto;bottom:16vh;width:88vw;right:6vw;grid-template-columns:1fr}
  .fe-b .fe-p,.fe-mini{display:none}
  .fe-brands{bottom:3vh}
}
@media (prefers-reduced-motion:reduce){
  .fe-wipe,.fe-scene,.fe-shade{transition:none}
}
`;
