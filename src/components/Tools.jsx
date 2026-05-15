import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const TOOLS = [
  { emoji:'🟣', name:'Claude.ai', cat:'AI Chat Interface', glow:'124,58,237',
    desc:'Chat to plan, architect, debug, and write entire features. The primary starting point for AI-driven projects.',
    uses:['Initial app planning & product spec','Explaining complex errors or systems','Generating full-file boilerplate','Architecture review & refactoring'], span:2 },
  { emoji:'⌨️', name:'Claude Code CLI', cat:'Terminal AI Agent', glow:'124,58,237',
    desc:'Runs inside your terminal, reads your entire codebase, edits files autonomously, runs tests — like a senior engineer pair-programming in your shell.',
    uses:['"Add auth" — it does the whole thing','Multi-file refactors across the repo','Auto-generates and runs test suites','Writes meaningful git commit messages'], span:2 },
  { emoji:'🖥️', name:'Cursor IDE', cat:'AI-First Editor', glow:'99,102,241',
    desc:'VS Code fork with deep AI integration. Composer edits multiple files at once with full codebase context.',
    uses:['Day-to-day coding with AI','"Explain this function" inline','Multi-file Composer edits','Context-aware autocomplete'] },
  { emoji:'🐙', name:'GitHub Copilot', cat:'In-Editor Autocomplete', glow:'16,185,129',
    desc:'Powered by Codex + GPT-4. Real-time suggestions as you type — VS Code, JetBrains, Neovim.',
    uses:['Line-by-line code suggestions','Unit tests from signatures','Auto-docstrings & comments','Language translation'] },
  { emoji:'⚡', name:'Bolt.new', cat:'Full-Stack Builder', glow:'245,158,11',
    desc:'Describe your app in plain English. Bolt builds, runs, and deploys frontend + backend + DB in the browser.',
    uses:['Zero-setup rapid prototype','React + Vite + Supabase wired','Export to GitHub when ready','"Build a todo app" in 60 seconds'] },
  { emoji:'🎨', name:'v0.dev', cat:'UI Component Generator', glow:'59,130,246',
    desc:'Vercel’s AI generates React + Tailwind UI from text. Outputs shadcn/ui code you paste directly.',
    uses:['Landing pages from descriptions','Dashboard layouts instantly','"Make it more minimal" iteration','Copy-paste shadcn + Tailwind'] },
  { emoji:'❤️', name:'Lovable', cat:'SaaS Builder', glow:'239,68,68',
    desc:'Chat to build full-stack React apps with Supabase — auth, payments, and storage pre-wired.',
    uses:['SaaS MVP in hours','Auto Supabase schema + RLS','Stripe + auth pre-wired','"Fix this bug" in plain English'] },
  { emoji:'🌊', name:'Windsurf', cat:'AI Editor (Codeium)', glow:'16,185,129',
    desc:'"Cascade" agent browses docs, edits files, and runs commands autonomously while explaining its thinking.',
    uses:['Autonomous multi-step tasks','Live web browsing for docs','Inline AI + chat panel','Generous free tier'] },
  { emoji:'🔄', name:'Replit', cat:'Cloud IDE + Host', glow:'168,85,247',
    desc:'Code, run, and host apps entirely in the browser — zero setup, built-in secrets, instant share URL.',
    uses:['Coding from any device','Instant shareable demo URL','50+ languages supported','Replit AI for generation'] },
]

function TiltCard({ tool, i }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness:300, damping:30 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness:300, damping:30 })

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onLeave() { mx.set(0); my.set(0) }

  const isWide = tool.span === 2

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ delay: i * 0.07, duration:0.5, ease:[0.22,1,0.36,1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ gridColumn: isWide ? 'span 2' : 'span 1', perspective:800 }}
    >
      <motion.div
        style={{ rotateX:rx, rotateY:ry, transformStyle:'preserve-3d', height:'100%' }}
      >
        <motion.div
          whileHover={{ boxShadow:`0 20px 60px rgba(${tool.glow},0.35)`, borderColor:`rgba(${tool.glow},0.3)` }}
          transition={{ duration:0.3 }}
          style={{ height:'100%', borderRadius:'var(--r)', padding:'1.75rem',
            background:'var(--surface)', border:'1px solid var(--border)',
            backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
            position:'relative', overflow:'hidden' }}
        >
          {/* Glow spot */}
          <div style={{ position:'absolute', top:-50, left:-50, width:200, height:200,
            background:`radial-gradient(circle, rgba(${tool.glow},0.3) 0%, transparent 70%)`,
            pointerEvents:'none' }} />

          <div style={{ position:'relative' }}>
            <div style={{ fontSize:'2.2rem', marginBottom:'0.8rem' }}>{tool.emoji}</div>
            <div style={{ fontWeight:700, fontSize:'1rem', marginBottom:'0.2rem' }}>{tool.name}</div>
            <div style={{ fontSize:'0.73rem', color:'var(--muted)', marginBottom:'0.9rem', fontWeight:500, textTransform:'uppercase', letterSpacing:'0.06em' }}>{tool.cat}</div>
            <p style={{ fontSize:'0.85rem', color:'var(--text2)', lineHeight:1.65, marginBottom:'1.25rem' }}>{tool.desc}</p>
            <div style={{ borderTop:'1px solid var(--border)', paddingTop:'1rem' }}>
              <p style={{ fontSize:'0.68rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'var(--muted)', marginBottom:'0.55rem' }}>Use it for</p>
              <ul style={{ paddingLeft:'1rem', display:'flex', flexDirection:'column', gap:'0.3rem' }}>
                {tool.uses.map(u => (
                  <li key={u} style={{ fontSize:'0.8rem', color:'var(--muted)', lineHeight:1.5 }}>{u}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Tools() {
  return (
    <section id='tools' style={{ padding:'8rem 0', position:'relative', overflow:'hidden' }}>
      <span className='bg-num'>03</span>
      <div className='section-wrap'>
        <motion.div
          initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }}
        >
          <p className='s-label'>Ecosystem</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:'0.75rem' }}>
            <span className='grad-text'>All AI Tools</span> — What Each One Does
          </h2>
          <p style={{ color:'var(--muted)', maxWidth:520, marginBottom:'3rem' }}>
            Hover any card for 3D depth. Every tool explained — what it is and exactly when to use it.
          </p>
        </motion.div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.25rem' }}>
          {TOOLS.map((t, i) => <TiltCard key={t.name} tool={t} i={i} />)}
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){
          #tools .section-wrap > div:last-of-type { grid-template-columns: repeat(2,1fr) !important }
        }
        @media(max-width:600px){
          #tools .section-wrap > div:last-of-type { grid-template-columns: 1fr !important }
          #tools [style*="span 2"] { grid-column: span 1 !important }
        }
      `}</style>
    </section>
  )
}
