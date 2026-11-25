import { useEffect, useRef, useState } from "react";

/* Put in /public/axtra/: hero.mp4 (chair scene), room.mp4 (room scene),
   optional posters hero.jpg / room.jpg, thumb-1..3.jpg, shell.jpg, conch.jpg,
   rocker.jpg, nautilus.jpg, and OPTIONAL chair-cutout.png (transparent PNG of the
   chair, same framing as the hero video) so "AXTRA" sits behind the chair.       */
const HERO = "/assets/videos/innovation.mp4";
const ROOM = "/assets/videos/dc-hero.mp4";

const P = [
  ["The Shell", "shell"],
  ["The Conch", "conch"],
  ["The Rocker", "rocker"],
  ["The Nautilus", "nautilus"],
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

const Social = () => (
  <div className="ax-social">
    {["f", "◎", "in"].map((x) => (
      <a key={x} href="#" aria-label={x}>
        {x}
      </a>
    ))}
  </div>
);

export default function Axtra() {
  const [s, setS] = useState(0);
  const [ref, on] = useInView(0.5);
  useTicker(on, 6000, () => setS((x) => 1 - x));

  return (
    <section ref={ref} className="ax" data-s={s}>
      <style>{css}</style>

      <video
        className="ax-bg"
        src={HERO}
        poster="/axtra/hero.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <video
        className="ax-bg ax-room-bg"
        src={ROOM}
        poster="/axtra/room.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="ax-vig" />

 

      {/* Scene 1 */}
      <div className={"ax-hero " + (s ? "out" : "in")}>
        <div className="ax-letters" aria-label="Axtra">
          {"AXTRA".split("").map((l, i) => (
            <span key={i} style={{ transitionDelay: i * 0.08 + "s" }}>
              {l}
            </span>
          ))}
        </div>
        <img
          className="ax-cut"
          src="/axtra/chair-cutout.png"
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="ax-tag">
          <h4>Featuring various sections for easy access.</h4>
          <p>
            Picture a modern, sophisticated chair named Axtra, designed for
            style and comfort.
          </p>
        </div>
        <div className="ax-thumbs">
          {[1, 2, 3].map((n) => (
            <img
              key={n}
              src={`/axtra/thumb-${n}.jpg`}
              alt=""
              style={{ transitionDelay: 0.5 + n * 0.1 + "s" }}
            />
          ))}
        </div>
        <button
          className="ax-scroll"
          onClick={() => setS(1)}
          aria-label="Scroll down"
        >
          <svg viewBox="0 0 100 100" width="64" height="64">
            <defs>
              <path
                id="axc"
                d="M50 50m-34 0a34 34 0 1 1 68 0a34 34 0 1 1-68 0"
              />
            </defs>
            <text fill="#fff" fontSize="9" letterSpacing="3">
              <textPath href="#axc">SCROLL DOWN · SCROLL DOWN ·</textPath>
            </text>
          </svg>
          <i />
        </button>
      </div>

      {/* Scene 2 */}
      <div className={"ax-room " + (s ? "in" : "out")}>
        <h2>Experience elegance with our sleek modern luxury chair.</h2>
        <p>
          Introducing the Axtra chair, a luxurious blend of modern design and
          unparalleled comfort. Its sleek lines and premium materials make it a
          statement piece for any contemporary space, ensuring both style and
          relaxation in your home.
        </p>
        <div className="ax-cards">
          {P.map(([t, f], i) => (
            <article key={f} className="ax-card" style={{ "--i": i }}>
              <b>{t}</b>
              <img src={`/axtra/${f}.jpg`} alt="" />
            </article>
          ))}
        </div>
      </div>

      <Social />
    </section>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=Inter:wght@300;400;500&display=swap');
.ax{position:relative;height:100vh;min-height:640px;overflow:hidden;background:#15110e;color:#fff;font-family:Inter,Arial,sans-serif}
.ax *{box-sizing:border-box}
.ax-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ax-room-bg{opacity:0;transition:opacity 1.2s ease}
.ax[data-s="1"] .ax-room-bg{opacity:1}
.ax-vig{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.35),transparent 22%,transparent 70%,rgba(0,0,0,.3))}

.ax-nav{position:absolute;z-index:6;top:0;left:0;right:0;display:grid;grid-template-columns:auto 1fr auto;align-items:center;padding:14px 24px;font-size:10px}
.ax-nav nav{display:flex;justify-content:space-between;margin:0 4vw 0 12vw;padding-right:6vw}
.ax-nav a{color:#fff;text-decoration:none}
.ax-pre{display:inline-flex;align-items:center;gap:10px;background:#fff;color:#111;border:0;border-radius:99px;padding:8px 14px;font:500 10px Inter,sans-serif;cursor:pointer}
.ax-pre i{font-style:normal;font-size:12px}

.ax-hero,.ax-room{position:absolute;inset:0;z-index:3}
.ax-room{transition:opacity .8s;transition-delay:.3s}
.ax-hero{transition:opacity .7s}
.ax-hero.out,.ax-room.out{opacity:0;pointer-events:none;transition-delay:0s}

.ax-letters{position:absolute;left:5vw;right:5vw;top:12vh;display:flex;justify-content:space-between;font:400 clamp(110px,19vw,290px)/1 "Bodoni Moda",serif;letter-spacing:-.02em}
.ax-letters span{display:block;transition:transform 1.1s cubic-bezier(.22,1,.36,1),opacity .9s}
.ax-hero.out .ax-letters span{opacity:0;transform:translateY(-60px)}
.ax-hero.in .ax-letters span{opacity:1;transform:none}
.ax-cut{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}

.ax-tag{position:absolute;left:3vw;bottom:19vh;width:min(18vw,230px)}
.ax-tag h4{margin:0 0 10px;text-align:right;text-transform:uppercase;font:300 clamp(12px,1.25vw,17px)/1.15 Inter,sans-serif;letter-spacing:.02em}
.ax-tag p{margin:0;width:56%;font-size:8px;line-height:1.5;opacity:.85}

.ax-thumbs{position:absolute;right:2vw;bottom:2vh;display:flex;gap:6px}
.ax-thumbs img{width:clamp(44px,4.4vw,62px);height:clamp(44px,4.4vw,62px);border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.85);background:#ddd;transition:transform .8s cubic-bezier(.22,1,.36,1),opacity .6s}
.ax-hero.out .ax-thumbs img{opacity:0;transform:translateX(30px)}

.ax-scroll{position:absolute;left:50%;bottom:2vh;transform:translateX(-50%);background:none;border:0;cursor:pointer;display:grid;place-items:center;padding:0}
.ax-scroll svg{animation:axspin 14s linear infinite}
.ax-scroll i{position:absolute;width:8px;height:12px;border:1px solid #fff;border-radius:5px}
@keyframes axspin{to{transform:rotate(360deg)}}

.ax-social{position:absolute;z-index:6;left:20px;bottom:18px;display:flex;gap:6px}
.ax-social a{width:20px;heightq:20px;border-radius:50%;border:1px solid rgba(255,255,255,.6);color:#fff;display:grid;place-items:center;font-size:8px;text-decoration:none}

/* scene 2 */
.ax-room h2{position:absolute;left:8.5vw;top:20vh;margin:0;max-width:34vw;text-transform:uppercase;font:400 clamp(18px,2vw,30px)/1.18 "Bodoni Moda",serif;letter-spacing:.015em}
.ax-room>p{position:absolute;left:18.5vw;top:34vh;width:min(22vw,310px);margin:0;font-size:8px;line-height:1.55;opacity:.9}
.ax-room h2,.ax-room>p{opacity:0;transform:translateY(16px);transition:opacity .9s,transform 1s cubic-bezier(.22,1,.36,1)}
.ax-room.in h2{opacity:1;transform:none;transition-delay:.5s}
.ax-room.in>p{opacity:1;transform:none;transition-delay:.7s}

.ax-cards{position:absolute;left:29vw;right:-4vw;bottom:4vh;display:flex;gap:1vw}
.ax-card{position:relative;flex:0 0 17.5vw;aspect-ratio:.9;border-radius:28px;overflow:hidden;background:rgba(255,255,255,.14);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.12);opacity:0;transform:translateX(60px);transition:opacity .8s,transform 1s cubic-bezier(.22,1,.36,1)}
.ax-room.in .ax-card{opacity:1;transform:none;transition-delay:calc(var(--i)*.12s + .6s)}
.ax-card b{position:absolute;z-index:2;top:16px;left:16px;font:400 12px "Bodoni Moda",serif;text-transform:uppercase;letter-spacing:.03em}
.ax-card img{position:absolute;left:0;right:0;bottom:0;width:100%;height:78%;object-fit:cover;border-radius:24px 24px 0 0;-webkit-mask-image:linear-gradient(180deg,transparent,#000 22%);mask-image:linear-gradient(180deg,transparent,#000 22%)}

.ax-pre:focus-visible,.ax-scroll:focus-visible,.ax-nav a:focus-visible,.ax-social a:focus-visible{outline:2px solid #fff;outline-offset:3px}
@media (max-width:820px){
  .ax-nav nav{display:none}
  .ax-letters{top:14vh;font-size:21vw}
  .ax-tag{bottom:16vh;width:46vw}
  .ax-room h2{left:6vw;max-width:88vw;top:16vh;font-size:20px}
  .ax-room>p{left:6vw;width:80vw;top:30vh}
  .ax-cards{left:6vw;bottom:8vh}.ax-card{flex-basis:46vw}
}
@media (prefers-reduced-motion:reduce){.ax *{transition:none!important;animation:none!important}}
`;
