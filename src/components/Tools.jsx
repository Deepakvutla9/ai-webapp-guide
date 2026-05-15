import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const TOOLS = [
  { emoji:'🟣', name:'Claude.ai', cat:'AI Chat Interface', glow:'rgba(124,58,237,0.35)',
    desc:'Chat to plan, architect, debug, and write entire features. The primary starting point for AI-driven projects.',
    uses:['Initial app planning & product spec','Explaining complex errors or systems','Generating full-file boilerplate','Architecture review & refactoring'], span:2 },
  { emoji:'⌨️', name:'Claude Code CLI', cat:'Terminal AI Agent', glow:'rgba(124,58,237,0.3)',
    desc:'Runs inside your terminal, reads your entire codebase, edits files autonomously, runs tests — like a senior engineer pair-programming in your shell.',
    uses:['"Add auth" — it does the whole thing','Multi-file refactors across the repo','Auto-generates and runs test suites','Writes meaningful git commit messages'], span:2 },
  { emoji:'🖥️', name:'Cursor IDE', cat:'AI-First Editor', glow:'rgba(99,102,241,0.35)',
    desc:'VS Code fork with deep AI integration. Composer edits multiple files at once with full codebase context.',
    uses:['Day-to-day coding with AI','"Explain this function" inline','Multi-file Composer edits','Context-aware autocomplete'] },
  { emoji:'🐙', name:'GitHub Copilot', cat:'In-Editor Autocomplete', glow:'rgba(16,185,129,0.3)',
    desc:'Powered by Codex + GPT-4. Real-time suggestions as you type — VS Code, JetBrains, Neovim.',
    uses:['Line-by-line code suggestions','Unit tests from signatures','Auto-docstrings','Language translation'] },
  { emoji:'⚡', name:'Bolt.new', cat:'Full-Stack Builder', glow:'rgba(245,158,11,0.3)',
    desc:'Describe your app in plain English. Bolt builds, runs, and deploys frontend + backend + DB in the browser.',
    uses:['Zero-setup rapid prototype','React + Vite + Supabase wired','Export to GitHub when ready','"Build a todo app" in 60 seconds'] },
  { emoji:'🎨', name:'v0.dev', cat:'UI Component Generator', glow:'rgba(59,130,246,0.3)',
    desc:'Vercel’s AI generates React + Tailwind UI components from text. Outputs shadcn/ui code you paste directly.',
    uses:['Landing pages from descriptions','Dashboard layouts instantly','"Make it more minimal" iteration','Copy-paste shadcn + Tailwind'] },
  { emoji:'❤️', name:'Lovable', cat:'SaaS Builder', glow:'rgba(239,68,68,0.3)',
    desc:'Chat to build full-stack React apps with Supabase — auth, payments, and storage pre-wired. Ideal for non-technical founders.',
    uses:['SaaS MVP in hours','Auto Supabase schema + RLS','Stripe + auth pre-wired','"Fix this bug" in plain English'] },
  { emoji:'🌊', name:'Windsurf', cat:'AI Editor (Codeium)', glow:'rgba(16,185,129,0.25)',
    desc:'VS Code-based editor with "Cascade" — an AI agent that browses docs, edits files, and runs commands autonomously.',
    uses:['Autonomous multi-step tasks','Live doc browsing','Inline AI + chat panel','Generous free tier'] },
  { emoji:'🔄', name:'Replit', cat:'Cloud IDE + Host', glow:'rgba(168,85,247,0.25)',
    desc:'Code, run, and host apps entirely in the browser — zero setup, built-in secrets, instant share URL.',
    uses:['Coding from any device','Instant shareable demo URL','50+ languages supported','Replit AI for generation'] },
]

function TiltCard({ tool, i }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5,0.5], [8,-8]), { stiffness:300, damping:30 })
  const ry = useSpring(useTransform(mx, [-0.5,0.5], [-8,8]), { stiffness:300, damping:30 })

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onLeave() { mx.set(0); my.set(0) }

  const colSpan = tool.span === 2 ? { gridColumn: 'span 2' } : {}

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ delay: i * 0.07, duration:0.5, ease:[0.22,1,0.36,1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...colSpan, style:'preserve-3d', perspective:800 }}
    >
      <motion.div
        style={{ rotateX:rx, rotateY:ry, transformStyle:'preserve-3d' }}
        whileHover={{ boxShadow: `0 20px 60px ${tool.glow}`, borderColor:'rgba(255,255,255,0.14)' }}
        transition={{ duration:0.3 }}
        className='glass'
        initial={{ boxShadow:'none' }}
        animate={{ boxShadow:'none' }}
        // whileHover handles the shadow
        sx={{ borderRadius:'var(--r)' }}
        tabIndex={0}
        role='article'
        aria-label={tool.name}
      >
        <div style={{ borderRadius:'var(--r)', padding:'1.75rem', height:'100%', position:'relative', overflow:'hidden' }}>
          {/* Glow background on hover */}
          <div style={{ position:'absolute', top:-60, left:-60, width:200, height:200,
            background:`radial-gradient(circle, ${tool.glow} 0%, transparent 70%)`,
            pointerEvents:'none', opacity:0.5 }} />
          <div style={{ position:'relative' }}>
            <div style={{ fontSize:'2.2rem', marginBottom:'0.75rem' }}>{tool.emoji}</div>
            <div style={{ fontWeight:700, fontSize:'1rem', marginBottom:'0.2rem' }}>{tool.name}</div>
            <div style={{ fontSize:'0.73rem', color:'var(--muted)', marginBottom:'0.9rem', fontWeight:500 }}>{tool.cat}</div>
            <p style={{ fontSize:'0.85rem', color:'var(--text2)', lineHeight:1.6, marginBottom:'1.25rem' }}>{tool.desc}</p>
            <div style={{ borderTop:'1px solid var(--border)', paddingTop:'1rem' }}>
              <p style={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--muted)', marginBottom:'0.6rem' }}>Use it for</p>
              <ul style={{ paddingLeft:'1rem', display:'flex', flexDirection:'column', gap:'0.3rem' }}>
                {tool.uses.map(u => <li key={u} style={{ fontSize:'0.8rem', color:'var(--muted)', lineHeight:1.5 }}>{u}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Tools() {
  return (
    <section id='tools' style={{ padding:'8rem 0', position:'relative', overflow:'hidden' }}>
      <span className='bg-num'>03</span>
      <div className='section-wrap'>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p className='s-label'>Ecosystem</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:'0.75rem' }}>
            <span className='grad-text'>All AI Tools</span> — What Each One Does
          </h2>
          <p style={{ color:'var(--muted)', maxWidth:520, marginBottom:'3rem' }}>Hover for 3D depth. Every tool explained — what it is, when to use it.</p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.25rem' }}>
          {TOOLS.map((t,i) => <TiltCard key={t.name} tool={t} i={i} />)}
        </div>
        <style>{`@media(max-width:900px){#tools .section-wrap > div:last-child{grid-template-columns:repeat(2,1fr)!important} #tools [style*="span 2"]{grid-column:span 2!important}} @media(max-width:560px){#tools .section-wrap > div:last-child{grid-template-columns:1fr!important} #tools [style*="span 2"]{grid-column:span 1!important}}`}</style>
      </div>
    </section>
  )
}
