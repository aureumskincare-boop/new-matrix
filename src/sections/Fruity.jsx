import {useState} from 'react'
import {Img,Nav,useInView,useTicker} from '../ui'
const S=[
 {n:'Apple',bg:'#fda4bd',ink:'#c0392b',can:'fruity/apple-can.png',f:['apple-1','apple-2','apple-3']},
 {n:'Exotic',bg:'#b9b4fb',ink:'#4b3fb5',can:'fruity/exotic-can.png',f:['exotic-1','exotic-2','exotic-3']},
 {n:'Pear',bg:'#c5e384',ink:'#2f7d32',can:'fruity/pear-can.png',f:['pear-1','pear-2','pear-3']}]
const Slide=({s,cls})=><div className={'fr-slide '+cls} style={{background:s.bg}}>
 <h1>{s.n}</h1>
 {s.f.map((f,k)=><Img key={f} className={'fr-f f'+(k+1)} src={`fruity/${f}.png`}/>)}</div>
export default function Fruity(){
 const[i,setI]=useState(0),[p,setP]=useState(null),[ref,on]=useInView(.4)
 const[rot,setRot]=useState(0),[faces,setFaces]=useState([0,1])
 const go=n=>{n=(n+S.length)%S.length;if(n===i)return
  const hidden=1-((rot/180)%2)
  setFaces(f=>{const g=[...f];g[hidden]=n;return g})
  setRot(r=>r+180);setP(i);setI(n)}
 useTicker(on,3500,()=>go(i+1))
 const s=S[i]
 return<section ref={ref} className="sec fr">
  {p!==null&&<Slide key={'o'+p+'-'+i} s={S[p]} cls="out"/>}
  <Slide key={'i'+i} s={s} cls="in"/>
  <div className="fr-stage"><div className="fr-spin" style={{transform:`rotateY(${rot}deg)`}}>
   {[0,1].map(k=><div key={k} className="fr-face" style={{transform:k?'rotateY(180deg)':'none'}}><Img className="fr-can" src={S[faces[k]].can}/></div>)}
  </div></div>
  <Nav cls="fr-nav" left={<span className="fr-logo" style={{color:s.ink}}>Fruity</span>} links={['Shop','About','Careers','Partnership','Contact']} right={<><a href="#!">My Cart</a><span>|</span><a href="#!">Register</a></>}/>
  <button className="fr-btn" style={{color:s.ink}}>Shop Taste</button>
  <div className="fr-dots">{S.map((_,k)=><i key={k} className={k===i?'on':''} onClick={()=>go(k)}/>)}</div>
 </section>}
