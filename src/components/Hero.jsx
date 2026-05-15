import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Zap } from 'lucide-react'

const MARQUEE = ['Claude AI','OpenAI Codex','GitHub Copilot','Cursor IDE','Bolt.new','v0.dev','Lovable','Windsurf','Replit','React Native','Flutter','Vercel','Next.js','Supabase']
const CHIPS = ['Claude AI','Codex','GitHub Copilot','Cursor','Bolt.new','v0.dev','React Native','Flutter']
const WORDS = ['Build','Web','&','Mobile','Apps','with','AI']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] })
  const y   = useTransform(scrollYProgress, [0,1], ['0%','40%'])
  const op  = useTransform(scrollYProgress, [0,0.65], [1,0])

  return (
    <section ref={ref} id='hero' style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', paddingTop:64 }}>

      {/* Grid */}
      <div className='grid-bg' style={{ position:'absolute', inset:0, pointerEvents:'none' }} />

      {/* Radial gradient backdrop */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 90% 65% at 50% -5%, rgba(124,58,237,0.32) 0%, transparent 70%), radial-gradient(ellipse 55% 45% at 90% 90%, rgba(6,182,212,0.16) 0%, transparent 60%)' }} />

      {/* Animated aurora blobs */}
      <motion.div animate={{ x:[0,50,0], y:[0,-35,0], scale:[1,1.12,1] }}
        transition={{ duration:9, repeat:Infinity, ease:'easeInOut' }}
        style={{ position:'absolute', width:700, height:700, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
          top:'5%', left:'10%', filter:'blur(90px)', pointerEvents:'none' }}
      />
      <motion.div animate={{ x:[0,-60,0], y:[0,45,0], scale:[1,1.15,1] }}
        transition={{ duration:11, repeat:Infinity, ease:'easeInOut', delay:3 }}
        style={{ position:'absolute', width:600, height:600, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
          bottom:'5%', right:'8%', filter:'blur(90px)', pointerEvents:'none' }}
      />
      <motion.div animate={{ x:[0,30,0], y:[0,25,0] }}
        transition={{ duration:13, repeat:Infinity, ease:'easeInOut', delay:6 }}
        style={{ position:'absolute', width:400, height:400, borderRadius:'50%',
          background:'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
          top:'40%', right:'25%', filter:'blur(80px)', pointerEvents:'none' }}
      />

      {/* Main content with parallax */}
      <motion.div style={{ y, opacity:op, position:'relative', zIndex:1,
        display:'flex', flexDirection:'column', alignItems:'center',
        textAlign:'center', maxWidth:980, padding:'0 2rem', width:'100%' }}
      >
        <motion.div
          initial={{ opacity:0, y:-12, scale:0.95 }}
          animate={{ opacity:1, y:0, scale:1 }}
          transition={{ duration:0.6, delay:0.1 }}
          className='badge'
          style={{ marginBottom:'2.25rem' }}
        >
          <span className='badge-dot' />
          Interactive Visual Guide · Claude & Codex
        </motion.div>

        <h1 style={{ fontSize:'clamp(3rem,7.5vw,6.2rem)', fontWeight:900, lineHeight:1.04, marginBottom:'1.5rem', letterSpacing:'-0.04em' }}>
          {WORDS.map((word, i) => (
            <motion.span key={i}
              initial={{ opacity:0, y:70, filter:'blur(14px)' }}
              animate={{ opacity:1, y:0, filter:'blur(0px)' }}
              transition={{ delay:0.2 + i*0.08, duration:0.7, ease:[0.22,1,0.36,1] }}
              style={{ display:'inline-block', marginRight:'0.22em' }}
              className={i <= 4 ? 'grad-text' : ''}
            >{word}</motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.9, duration:0.6, ease:[0.22,1,0.36,1] }}
          style={{ fontSize:'1.2rem', color:'var(--text2)', maxWidth:620, marginBottom:'2.5rem', lineHeight:1.75 }}
        >
          A complete visual walkthrough of how to create apps using AI assistants — from first prompt to deployed product, with every tool explained.
        </motion.p>

        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:1.05, duration:0.6 }}
          style={{ display:'flex', gap:'1rem', flexWrap:'wrap', justifyContent:'center', marginBottom:'3.5rem' }}
        >
          <motion.a href='#workflow' className='btn-primary'
            whileHover={{ scale:1.04, boxShadow:'0 0 40px rgba(124,58,237,0.55)' }}
            whileTap={{ scale:0.97 }}
          >See the Workflow <ArrowRight size={16} /></motion.a>
          <motion.a href='#tools' className='btn-glass'
            whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
          ><Zap size={16} /> Explore Tools</motion.a>
        </motion.div>

        <motion.div style={{ display:'flex', flexWrap:'wrap', gap:'0.65rem', justifyContent:'center' }}>
          {CHIPS.map((t,i) => (
            <motion.span key={t}
              initial={{ opacity:0, scale:0.75 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ delay:1.2+i*0.055, type:'spring', stiffness:200 }}
              whileHover={{ scale:1.1, borderColor:'rgba(124,58,237,0.5)' }}
              style={{ padding:'5px 14px', borderRadius:999, fontSize:'0.78rem',
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                color:'var(--muted)', cursor:'default', transition:'border-color 0.2s' }}
            >{t}</motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.8, duration:1 }}
        style={{ position:'absolute', bottom:0, left:0, right:0, overflow:'hidden',
          borderTop:'1px solid var(--border)',
          background:'rgba(7,7,26,0.85)', backdropFilter:'blur(20px)' }}
      >
        <div style={{ padding:'1rem 0', overflow:'hidden' }}>
          <div className='marquee-track'>
            {[...MARQUEE,...MARQUEE].map((t,i) => (
              <span key={i} style={{ color:'var(--muted)', fontSize:'0.82rem', fontWeight:500, display:'flex', alignItems:'center', gap:'2.5rem' }}>
                {t}
                <span style={{ color:'rgba(124,58,237,0.6)', fontWeight:700 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
