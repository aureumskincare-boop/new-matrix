import { useEffect, useRef, useState } from "react";
export const A = (p) => `${import.meta.env.BASE_URL}assets/${p}`;
export function useInView(th = 0.5) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => setV(e.isIntersecting), {
      threshold: th,
    });
    o.observe(ref.current);
    return () => o.disconnect();
  }, [th]);
  return [ref, v];
}
export function useTicker(on, ms, fn) {
  const f = useRef(fn);
  f.current = fn;
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => f.current(), ms);
    return () => clearInterval(t);
  }, [on, ms]);
}
export const Img = ({ src, ...p }) => (
  <img
    src={A(src)}
    alt=""
    draggable="false"
    onError={(e) => (e.currentTarget.style.visibility = "hidden")}
    {...p}
  />
);
export const Vid = ({ src, ...p }) => (
  <video className="bg" src={A(src)} autoPlay muted loop playsInline {...p} />
);
export const Nav = ({ links, left, right, cls = "" }) => (
  <nav className={"nav " + cls}>
    <div>{left}</div>
    <ul>
      {links.map((l) => (
        <li key={l}>
          <a href="#!">{l}</a>
        </li>
      ))}
    </ul>
    <div>{right}</div>
  </nav>
);
