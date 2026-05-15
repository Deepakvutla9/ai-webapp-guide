import { motion } from 'framer-motion'

const ROWS = [
  [
    { label:'👤 You', sub:'Developer', cls:'user', color:'rgba(245,158,11,0.15)', border:'rgba(245,158,11,0.3)', text:'#fbbf24' },
    null,
    { label:'🟣 Claude / GPT', sub:'AI Planning Layer', cls:'ai', color:'rgba(124,58,237,0.15)', border:'rgba(124,58,237,0.3)', text:'#c4b5fd' },
    null,
    { label:'🖥️ Cursor / Copilot', sub:'AI-Powered Editor', cls:'tool', color:'rgba(6,182,212,0.1)', border:'rgba(6,182,212,0.25)', text:'#67e8f9' },
  ],
  [
    { label:'🌐 Frontend', sub:'React / Next.js', cls:'out', color:'rgba(59,130,246,0.1)', border:'rgba(59,130,246,0.25)', text:'#60a5fa' },
    null,
    { label:'⚙️ Backend', sub:'Node / FastAPI', cls:'out', color:'rgba(59,130,246,0.1)', border:'rgba(59,130,246,0.25)', text:'#60a5fa' },
    null,
    { label:'🗄️ Database', sub:'Supabase / PG', cls:'out', color:'rgba(59,130,246,0.1)', border:'rgba(59,130,246,0.25)', text:'#60a5fa' },
  ],
  [
    { label:'🧪 AI Tests', sub:'Claude writes tests', cls:'tool', color:'rgba(16,185,129,0.1)', border:'rgba(16,185,129,0.25)', text:'#6ee7b7' },
    null,
    { label:'🚀 Deploy', sub:'Vercel / Railway', cls:'ai', color:'rgba(124,58,237,0.1)', border:'rgba(124,58,237,0.25)', text:'#c4b5fd' },
    null,
    { label:'✅ Live App', sub:'Ship it!', cls:'user', color:'rgba(245,158,11,0.12)', border:'rgba(245,158,11,0.28)', text:'#fbbf24' },
  ],
]

function Node({ n, i, rowIdx }) {
  if (!n) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', fontSize:'1.4rem' }}>{rowIdx===1 ? '+' : '→'}</div>
  return (
    <motion.div
      initial={{ opacity:0, scale:0.8 }}
      whileInView={{ opacity:1, scale:1 }}
      viewport={{ once:true }}
      transition={{ delay: rowIdx*0.15 + i*0.08, duration:0.4, ease:[0.22,1,0.36,1] }}
      whileHover={{ scale:1.06, boxShadow:`0 0 30px ${n.border}` }}
      style={{ background:n.color, border:`1px solid ${n.border}`, borderRadius:12,
        padding:'0.85rem 1.1rem', textAlign:'center', cursor:'default' }}
    >
      <div style={{ fontSize:'0.88rem', fontWeight:700, color:n.text, whiteSpace:'nowrap' }}>{n.label}</div>
      <div style={{ fontSize:'0.7rem', color:'var(--muted)', marginTop:3 }}>{n.sub}</div>
    </motion.div>
  )
}

export default function Architecture() {
  return (
    <section id='architecture' style={{ padding:'8rem 0', position:'relative', overflow:'hidden' }}>
      <span className='bg-num'>04</span>
      <div className='section-wrap'>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p className='s-label'>Architecture</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:'0.75rem' }}>
            How It All <span className='grad-text'>Connects</span>
          </h2>
          <p style={{ color:'var(--muted)', maxWidth:500, marginBottom:'3rem' }}>From your idea to a live app — AI-assisted at every stage of the pipeline.</p>
        </motion.div>

        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ delay:0.2, duration:0.6 }}
          className='glass'
          style={{ borderRadius:'var(--r)', padding:'2.5rem', display:'flex', flexDirection:'column', gap:'1.5rem', alignItems:'center' }}
        >
          {ROWS.map((row, ri) => (
            <div key={ri} style={{ width:'100%' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr auto 1fr', gap:'0.75rem', alignItems:'center' }}>
                {row.map((n, i) => <Node key={i} n={n} i={i} rowIdx={ri} />)}
              </div>
              {ri < ROWS.length-1 && (
                <motion.div
                  initial={{ scaleY:0 }}
                  whileInView={{ scaleY:1 }}
                  viewport={{ once:true }}
                  transition={{ delay:ri*0.2+0.4, duration:0.5 }}
                  style={{ height:40, width:2, background:'linear-gradient(to bottom, rgba(124,58,237,0.5), rgba(6,182,212,0.5))', margin:'0 auto', transformOrigin:'top' }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
