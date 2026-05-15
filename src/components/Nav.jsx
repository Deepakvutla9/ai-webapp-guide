import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [['Claude vs Codex','#compare'],['Workflow','#workflow'],['Tools','#tools'],['Try It','#try']]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'none',
        background: scrolled ? 'rgba(7,7,26,0.85)' : 'transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:10, fontWeight:800, fontSize:'1.05rem', textDecoration:'none' }}>
        <span style={{ fontSize:'1.5rem' }}>🤖</span>
        <span className='grad-text'>AI App Builder</span>
        <span style={{ color:'var(--muted)', fontWeight:400, fontSize:'0.9rem' }}>Guide</span>
      </div>
      <ul style={{ display:'flex', gap:'2.5rem', listStyle:'none' }}>
        {LINKS.map(([label, href]) => (
          <li key={href}>
            <motion.a
              href={href}
              whileHover={{ color: 'var(--text)' }}
              style={{ color:'var(--muted)', textDecoration:'none', fontSize:'0.88rem', fontWeight:500 }}
            >{label}</motion.a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
