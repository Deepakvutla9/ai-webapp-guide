import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Copy, Check } from 'lucide-react'

const STACKS = {
  'Web App (React + Node)': 'React 18 + Vite, Node.js + Express, Supabase (DB + Auth), Tailwind CSS + shadcn/ui — deploy on Vercel + Railway',
  'Mobile App (React Native)': 'React Native + Expo, Supabase backend, React Navigation v6, Zustand state — deploy via EAS Build',
  'Mobile App (Flutter)': 'Flutter 3, Dart, Supabase backend, GetX state management — deploy via flutter build',
  'Full-Stack SaaS': 'Next.js 14 App Router, Supabase, Stripe for payments, Tailwind + shadcn/ui — deploy on Vercel',
  'Landing Page': 'Next.js + Tailwind + Framer Motion animations — deploy on Vercel with Edge network',
  'REST API / Backend': 'Node.js + Express (or FastAPI), Supabase/PostgreSQL, JWT auth, Zod validation — deploy on Railway',
}

const HINTS = {
  'Claude.ai': 'Go to claude.ai and paste this in a new conversation.',
  'Claude Code CLI': 'Run `claude` in your project directory, then paste this.',
  'ChatGPT / GPT-4o': 'Go to chatgpt.com and paste in a new chat.',
  'GitHub Copilot': 'Open Copilot Chat (Ctrl+Shift+I) in VS Code and paste.',
  'Cursor IDE': 'Open Cursor Composer (Ctrl+K / Cmd+K) and paste.',
  'Bolt.new': 'Go to bolt.new and type this in the prompt box.',
  'v0.dev': 'Go to v0.dev and paste this prompt.',
}

export default function PromptBuilder() {
  const [type, setType] = useState(Object.keys(STACKS)[0])
  const [tool, setTool] = useState(Object.keys(HINTS)[0])
  const [desc, setDesc] = useState('')
  const [feat, setFeat] = useState('')
  const [prompt, setPrompt] = useState('')
  const [copied, setCopied] = useState(false)
  const [generated, setGenerated] = useState(false)

  function generate() {
    const d = desc || 'a task management app for teams'
    const f = feat ? `\nKey feature: ${feat}` : ''
    const p = `📍 Tool: ${tool}\n💡 ${HINTS[tool]}\n\n${'─'.repeat(44)}\n\nI want to build ${d}.\n\nApp type: ${type}\nTech stack: ${STACKS[type]}${f}\n\nPlease:\n1. Write a concise product spec (2–3 sentences)\n2. Confirm or adjust the stack for my use case\n3. Create the full folder/file structure\n4. Write initial setup code to get started\n5. List the 5 most important things to build first\n\nBe specific, write real code, and explain your choices briefly.`
    setPrompt(p)
    setGenerated(true)
  }

  function copy() {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const sel = { width:'100%', background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:10, padding:'0.75rem 1rem', color:'var(--text)', fontSize:'0.9rem', outline:'none', fontFamily:'Inter,sans-serif', cursor:'pointer', appearance:'none' }
  const lbl = { fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)', display:'block', marginBottom:'0.45rem' }

  return (
    <section id='try' style={{ padding:'8rem 0', position:'relative', overflow:'hidden' }}>
      <span className='bg-num'>05</span>
      <div className='section-wrap'>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p className='s-label'>Interactive</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:'0.75rem' }}>
            Build Your First <span className='grad-text'>AI Prompt</span>
          </h2>
          <p style={{ color:'var(--muted)', maxWidth:520, marginBottom:'3rem' }}>Fill in the fields and get a ready-to-paste AI prompt tailored to your project.</p>
        </motion.div>

        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ delay:0.2, duration:0.6 }}
          className='glass'
          style={{ borderRadius:20, padding:'2.5rem', border:'1px solid var(--border)' }}
        >
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2.5rem' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
              <div>
                <label style={lbl}>App type</label>
                <select style={sel} value={type} onChange={e => setType(e.target.value)}>
                  {Object.keys(STACKS).map(k => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>AI tool to use</label>
                <select style={sel} value={tool} onChange={e => setTool(e.target.value)}>
                  {Object.keys(HINTS).map(k => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>What is your app about?</label>
                <input style={{ ...sel, cursor:'text' }} type='text' value={desc} onChange={e => setDesc(e.target.value)} placeholder='e.g. a task manager for remote teams' />
              </div>
              <div>
                <label style={lbl}>Key feature (optional)</label>
                <input style={{ ...sel, cursor:'text' }} type='text' value={feat} onChange={e => setFeat(e.target.value)} placeholder='e.g. real-time collaboration' />
              </div>
              <motion.button
                onClick={generate}
                className='btn-primary'
                whileHover={{ scale:1.03, boxShadow:'0 0 40px rgba(124,58,237,0.5)' }}
                whileTap={{ scale:0.97 }}
                style={{ width:'100%', justifyContent:'center', padding:'0.9rem' }}
              >
                <Sparkles size={16} /> Generate AI Prompt
              </motion.button>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--muted)' }}>Generated Prompt</span>
                {generated && (
                  <motion.button
                    onClick={copy}
                    initial={{ opacity:0 }} animate={{ opacity:1 }}
                    whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                    style={{ display:'flex', alignItems:'center', gap:6, background:'var(--surface-h)', border:'1px solid var(--border)', borderRadius:8, padding:'4px 12px', color: copied ? '#6ee7b7' : 'var(--muted)', fontSize:'0.78rem', cursor:'pointer', transition:'color 0.2s' }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </motion.button>
                )}
              </div>
              <div style={{ background:'#050510', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'1.25rem', fontFamily:'JetBrains Mono,monospace', fontSize:'0.8rem', color:'#c9d1d9', minHeight:320, lineHeight:1.9, overflowY:'auto', whiteSpace:'pre-wrap', position:'relative' }}>
                <AnimatePresence mode='wait'>
                  {generated ? (
                    <motion.span key='prompt' initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4 }}>
                      {prompt}
                    </motion.span>
                  ) : (
                    <motion.span key='placeholder' style={{ color:'var(--muted)' }}>
                      Your customized AI prompt will appear here.{`\n\n`}Fill in your app type, AI tool, and description above, then click Generate. 🚀
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
        <style>{`@media(max-width:700px){#try .glass > div{grid-template-columns:1fr!important}}`}</style>
      </div>
    </section>
  )
}
