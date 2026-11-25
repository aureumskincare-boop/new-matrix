import { useEffect, useRef, useState } from "react";

/* Put in /public/primal/ (or change paths):
   tiger.mp4  - tiger walking toward the camera (scene 1, starts paused on its first frame)
   snow.mp4   - tiger walking in snow (scene 2)
   tiger.jpg / snow.jpg (optional posters), face.jpg, necklace.jpg,
   icon-1.jpg, icon-2.jpg, jewel-1.jpg .. jewel-3.jpg                                   */
const TIGER = "/assets/videos/cheetah1.mp4";
const SNOW = "/assets/videos/cheetah2.mp4";

const START_MS = 3000; // title sits whole, video paused, then video plays + word splits
const SNOW_AT = START_MS + 9000; // crossfade to the snow scene
const LOOP_AT = SNOW_AT + 8000; // restart the sequence

const JEWELS = [
  ["Ocean Heart", "A dazzling sapphire ring that echoes deep waters."],
  ["Sapphire Tide", "Layered stones that ripple with every movement."],
  ["Crystal Drop", "Clear cut crystal drops designed to catch the light."],
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

export default function Matrix() {
  const [ref, on] = useInView(0.5);
  const [ph, setPh] = useState(0); // 0 intro, 1 split + playing, 2 snow scene
  const [cycle, setCycle] = useState(0);
  const tiger = useRef(null);

  useEffect(() => {
    const v = tiger.current;
    setPh(0);
    if (v) {
      v.pause();
      try {
        v.currentTime = 0;
      } catch (e) {}
    }
    if (!on) return;
    const t1 = setTimeout(() => {
      setPh(1);
      if (v) v.play().catch(() => {});
    }, START_MS);
    const t2 = setTimeout(() => setPh(2), SNOW_AT);
    const t3 = setTimeout(() => setCycle((c) => c + 1), LOOP_AT);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [on, cycle]);

  return (
    <section ref={ref} className="mx" data-p={ph}>
      <style>{css}</style>

      <video
        ref={tiger}
        className="mx-bg"
        src={TIGER}
        poster="/primal/tiger.jpg"
        muted
        playsInline
        preload="auto"
      />
      <video
        className="mx-bg mx-snow"
        src={SNOW}
        poster="/primal/snow.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* The title: whole for 3s, then splits apart */}
      <h1 className="mx-word" aria-label="Matrix">
        <span className="half l" aria-hidden="true">
          {"MAT".split("").map((c, i) => (
            <b key={i} style={{ "--i": i }}>
              {c}
            </b>
          ))}
        </span>
        <span className="half r" aria-hidden="true">
          {"RIX".split("").map((c, i) => (
            <b key={i} style={{ "--i": i + 3 }}>
              {c}
            </b>
          ))}
        </span>
      </h1>

      {/* Scene 1 copy */}
      <div className="mx-copy">
        <h3>Unleash your inner beast.</h3>
        <p>
          Discover elegance and resilience with our exquisite jewelry
          collection, designed to inspire and shine.
        </p>
      </div>

      <div className="mx-cards">
        <img src="/primal/face.jpg" alt="" />
        <img src="/primal/necklace.jpg" alt="" />
      </div>

      <button className="mx-explore" aria-label="Explore">
        <span>Explore</span>
      </button>

      {/* Scene 2 */}
      <div className="mx-s2">
        <h2>Unleash yourself</h2>
        <div className="mx-jewels">
          {JEWELS.map(([t, d], i) => (
            <article key={t} style={{ "--i": i }}>
              <img src={`/primal/jewel-${i + 1}.jpg`} alt="" />
              <i>+</i>
              <h4>{t}</h4>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-circ">
        <button aria-label="Ring">
          <img src="/primal/icon-1.jpg" alt="" />
        </button>
        <button aria-label="Gem">
          <img src="/primal/icon-2.jpg" alt="" />
        </button>
      </div>
    </section>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Italiana&family=Jost:wght@300;400;500&display=swap');
.mx{--ink:#12303d;position:relative;height:100vh;min-height:620px;overflow:hidden;background:#b9c6d2;color:var(--ink);font-family:Jost,Arial,sans-serif}
.mx *{box-sizing:border-box}
.mx-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.mx-snow{opacity:0;transition:opacity 1.4s ease}
.mx[data-p="2"] .mx-snow{opacity:1}

.mx-nav{position:absolute;z-index:8;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:16px 26px}
.mx-r{display:flex;align-items:center;gap:8px}
.mx-r button{background:none;border:0;padding:4px;cursor:pointer;display:grid;place-items:center}
.mx-buy{display:inline-flex!important;gap:8px;background:#fff!important;border-radius:99px;padding:7px 12px!important;font:500 9px Jost,sans-serif;text-transform:uppercase;letter-spacing:.04em;color:var(--ink)}

/* ---- split title ---- */
.mx-word{position:absolute;z-index:4;left:0;right:0;top:50%;margin:0;transform:translateY(-62%);display:flex;justify-content:center;font:400 clamp(90px,19vw,300px)/1 Italiana,serif;letter-spacing:.01em;white-space:nowrap;pointer-events:none;transition:opacity 1.2s ease}
.half{display:flex;transition:transform 2.6s cubic-bezier(.65,0,.2,1)}
.half b{font-weight:400;opacity:0;transform:translateY(40px);transition:opacity 1s ease,transform 1.2s cubic-bezier(.22,1,.36,1);transition-delay:calc(var(--i)*.1s);
  background:linear-gradient(180deg,#ffffff 10%,#ffffff 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
.mx-word b:nth-child(3),.half.r b:nth-child(1){background-image:linear-gradient(180deg,#ffffff 5%,#ffffff 50%,#ffffff 95%)}
.half.r b:nth-child(2){background-image:linear-gradient(180deg,#ffffff,#ffffff)}
.half.r b:nth-child(3){background-image:linear-gradient(180deg,#ffffff,#ffffff)}
.mx:not([data-p="0"]) .half b,.mx[data-p="0"] .half b{opacity:1;transform:none}
.mx[data-p="0"] .half b{opacity:1;transform:none}
.mx[data-p="1"] .half.l{transform:translateX(-24vw) scale(1.08)}
.mx[data-p="1"] .half.r{transform:translateX(24vw) scale(1.08)}
.mx[data-p="2"] .mx-word{opacity:0}
.mx[data-p="2"] .half.l{transform:translateX(-40vw)}
.mx[data-p="2"] .half.r{transform:translateX(40vw)}

/* ---- scene 1 copy ---- */
.mx-copy{position:absolute;z-index:5;left:3.5vw;bottom:8vh;display:flex;gap:2.4vw;align-items:flex-start;opacity:0;transform:translateY(20px);transition:opacity 1s .4s,transform 1.2s .4s cubic-bezier(.22,1,.36,1)}
.mx-copy h3{margin:0;width:8vw;min-width:96px;font:400 clamp(16px,1.7vw,24px)/1.1 Italiana,serif}
.mx-copy p{margin:0;width:21vw;min-width:130px;font-size:16px;line-height:1.5;color:#ffffff}
.mx[data-p="1"] .mx-copy{opacity:1;transform:none}
.mx[data-p="1"]:not(:hover) .mx-copy{opacity:1}

.mx-cards{position:absolute;z-index:5;right:6.5vw;top:46vh;display:flex;gap:10px;align-items:flex-start;opacity:0;transform:translateX(30px);transition:opacity 1s .7s,transform 1.2s .7s cubic-bezier(.22,1,.36,1)}
.mx-cards img{width:clamp(66px,6.6vw,96px);aspect-ratio:.82;object-fit:cover;border-radius:18px;background:#cdb}
.mx-cards img+img{margin-top:2.6vh}
.mx[data-p="1"] .mx-cards{opacity:1;transform:none}

.mx-explore{position:absolute;z-index:6;left:50%;bottom:6vh;transform:translateX(-50%);width:68px;height:68px;border-radius:50%;border:0;background:#fff;color:var(--ink);font:500 8px Jost,sans-serif;text-transform:uppercase;letter-spacing:.05em;cursor:pointer;transition:opacity .8s}
.mx-explore::after{content:"";position:absolute;inset:-9px;border-radius:50%;border:1px solid rgba(255,255,255,.7);animation:mxp 2.4s ease-out infinite}
@keyframes mxp{from{transform:scale(.85);opacity:1}to{transform:scale(1.25);opacity:0}}
.mx[data-p="2"] .mx-explore{opacity:0;pointer-events:none}

.mx-circ{position:absolute;z-index:6;right:2.8vw;bottom:5vh;display:flex;gap:8px}
.mx-circ button{width:34px;height:34px;border-radius:50%;border:0;background:#fff;padding:0;overflow:hidden;display:grid;place-items:center;cursor:pointer}
.mx-circ img{width:70%;height:70%;object-fit:contain}

/* ---- scene 2 ---- */
.mx-s2{position:absolute;inset:0;z-index:5;pointer-events:none}
.mx-s2 h2{position:absolute;left:0;right:0;top:11vh;margin:0;text-align:center;text-transform:uppercase;font:400 clamp(26px,3.3vw,50px)/1 Italiana,serif;letter-spacing:.03em;opacity:0;transform:translateY(14px);transition:opacity 1s .6s,transform 1.2s .6s cubic-bezier(.22,1,.36,1)}
.mx-jewels{position:absolute;left:32vw;bottom:0;display:flex;gap:10px}
.mx-jewels article{position:relative;width:clamp(92px,9.4vw,136px);padding:10px 10px 14px;border-radius:18px;background:#fff;pointer-events:auto;
  -webkit-mask:radial-gradient(circle 14px at calc(100% - 20px) 20px,transparent 97%,#000);mask:radial-gradient(circle 14px at calc(100% - 20px) 20px,transparent 97%,#000);
  transform:translateY(120%);transition:transform 1.2s cubic-bezier(.22,1,.36,1);transition-delay:calc(var(--i)*.12s + .9s)}
.mx-jewels img{width:100%;aspect-ratio:1.5;object-fit:contain;margin-top:12px}
.mx-jewels i{position:absolute;top:8px;right:10px;font:300 13px Jost,sans-serif;font-style:normal;color:var(--ink)}
.mx-jewels h4{margin:8px 0 4px;font:400 14px/1 Italiana,serif}
.mx-jewels p{margin:0;font-size:6.5px;line-height:1.45;color:#40545e}
.mx[data-p="2"] .mx-s2 h2{opacity:1;transform:none}
.mx[data-p="2"] .mx-jewels article{transform:translateY(34%)}
.mx[data-p="2"] .mx-copy,.mx[data-p="2"] .mx-cards{opacity:0}

.mx button:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
@media (max-width:820px){
  .mx-copy{display:none}
  .mx-cards{right:4vw;top:58vh}
  .mx[data-p="1"] .half.l{transform:translateX(-30vw)}.mx[data-p="1"] .half.r{transform:translateX(30vw)}
  .mx-jewels{left:4vw}
}
@media (prefers-reduced-motion:reduce){.mx *,.mx *::after{transition:none!important;animation:none!important}}
`;
