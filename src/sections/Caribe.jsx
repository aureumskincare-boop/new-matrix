import { useEffect, useState } from "react";
import { Img, Nav, useInView } from "../ui";
const D = [
  ["Paradise", "Caribe", "caribe", "Endless beachfront bliss."],
  ["Aurora", "Tromso", "tromso", "Northern lights journey."],
  ["Wild", "Amazon", "amazon", "Into wild nature."],
  ["Ocean", "Maldiva", "maldiva", "Beneath crystal waters."],
  ["Beyond", "Alaska", "alaska", "Beyond frozen horizons."],
];
export default function Caribe() {
  const [i, setI] = useState(0),
    [mini, setMini] = useState(false),
    [ref, on] = useInView(0.5);
  useEffect(() => {
    if (!on) return;
    let t;
    const run = () => {
      setMini(true);
      t = setTimeout(() => {
        setI((x) => (x + 1) % D.length);
        t = setTimeout(() => {
          setMini(false);
          t = setTimeout(run, 3200);
        }, 1000);
      }, 1000);
    };
    t = setTimeout(run, 3200);
    return () => clearTimeout(t);
  }, [on]);
  const jump = () => {
    setMini(true);
    setTimeout(() => setI((x) => (x + 1) % D.length), 900);
    setTimeout(() => setMini(false), 1900);
  };
  return (
    <section ref={ref} className={"sec cb " + (mini ? "mini" : "")}>
      <Nav
        cls="cb-nav"
        left={<b>✦ Paradise</b>}
        links={["Destinations", "Experiences", "Gallery"]}
        right={<span>⌕ ≡</span>}
      />
      <div className="cb-track" style={{ "--i": i }}>
        {D.map(([k, n, f, d]) => (
          <div key={n}>
            <Img className="bg" src={`caribe/${f}.jpg`} />
            <div className="cb-t">
              <small>{k}</small>
              <h1>{n}</h1>
              <p>{d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cb-count">
        0{i + 1}
        <span>… 0{D.length}</span>
        <button onClick={jump} aria-label="Next">
          →
        </button>
      </div>
    </section>
  );
}
