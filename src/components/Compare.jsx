import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TAB = {
  claude: {
    key:'claude', emoji:'🟣', name:'Claude', org:'Anthropic',
    color:'#7c3aed', colorL:'#a78bfa', colorXL:'#c4b5fd', tagCls:'tag-p',
    desc:'200K context window. Plans entire app architectures, refactors whole codebases, and writes production-quality code through conversation.',
    tags:['claude.ai','Claude Code CLI','Claude API','Cursor + Claude'],
    bestFor:'Architecture planning, long-context refactoring, test generation, deep code review, and complex debugging sessions.',
    bestTags:['Architecture','Long files','Debugging','Test gen','Docs'],
    cliTitle:'Claude Code CLI',
    cliCode:'# Install\nnpm install -g @anthropic-ai/claude-code\n\n# Run inside your project\ncd my-app && claude\n\n# One-shot task\nclaude "Add JWT auth + refresh tokens"',
    apiTitle:'Claude API (Anthropic SDK)',
    apiCode:'import Anthropic from "@anthropic-ai/sdk"\n\nconst client = new Anthropic()\nconst msg = await client.messages.create({\n  model: "claude-opus-4-7",\n  max_tokens: 1024,\n  messages: [{ role: "user",\n    content: "Build a REST API" }]\n})\nconsole.log(msg.content)',
  },
  codex: {
    key:'codex', emoji:'🟢', name:'Codex', org:'OpenAI',
    color:'#06b6d4', colorL:'#67e8f9', colorXL:'#a5f3fc', tagCls:'tag-c',
    desc:'Powers GitHub Copilot and ChatGPT. Trained on billions of lines of code — excels at real-time inline completions and function-level generation.',
    tags:['GitHub Copilot','ChatGPT','OpenAI API','Windsurf'],
    bestFor:'Real-time autocomplete while typing, boilerplate generation, language translation, and quick function implementations.',
    bestTags:['Autocomplete','Boilerplate','In-editor','Function gen','Translation'],
    cliTitle:'GitHub Copilot CLI',
    cliCode:'# Install extension in VS Code\n# Search: "GitHub Copilot"\n\n# Or via gh CLI:\ngh extension install github/gh-copilot\n\n# Ask for suggestions:\ngh copilot suggest "create a React hook"',
    apiTitle:'OpenAI API (GPT-4o)',
    apiCode:'from openai import OpenAI\n\nclient = OpenAI()\nresponse = client.chat.completions.create(\n  model="gpt-4o",\n  messages=[{\n    "role": "user",\n    "content": "Build a FastAPI server"\n  }]\n)\nprint(response.choices[0].message.content)',
  }
}

function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div>
      <p style={{ fontSize:'0.78rem', color:'var(--muted)', marginBottom:'0.5rem', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase' }}>{label}</p>
      <div className='code-block'>
        <button className='copy-btn' onClick={copy}>{copied ? 'Copied!' : 'Copy'}</button>
        {code}
      </div>
    </div>
  )
}

export default function Compare() {
  const [active, setActive] = useState('claude')
  const d = TAB[active]

  return (
    <section id='compare' style={{ padding:'8rem 0', position:'relative', overflow:'hidden' }}>
      <span className='bg-num'>01</span>
      <div className='section-wrap'>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}>
          <p className='s-label'>AI Assistants</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:'0.75rem' }}>
            <span className='grad-text'>Claude vs Codex</span><br/>
            <span style={{ color:'var(--text2)', fontWeight:500, fontSize:'0.6em' }}>What’s the difference, and when to use each?</span>
          </h2>
        </motion.div>

        {/* Tab Selector */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.15, duration:0.5 }}
          style={{ display:'flex', gap:'1rem', margin:'2.5rem 0', flexWrap:'wrap' }}
        >
          {Object.values(TAB).map(t => (
            <motion.button key={t.key}
              onClick={() => setActive(t.key)}
              whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
              style={{
                flex:1, minWidth:220, padding:'1.25rem 1.5rem',
                borderRadius:'var(--r)', cursor:'pointer',
                border: active===t.key ? `1px solid ${t.color}` : '1px solid var(--border)',
                background: active===t.key ? `rgba(${t.key==='claude'?'124,58,237':'6,182,212'},0.1)` : 'var(--surface)',
                display:'flex', alignItems:'center', gap:'1rem', textAlign:'left',
                transition:'all 0.25s',
              }}
            >
              <span style={{ fontSize:'2.2rem' }}>{t.emoji}</span>
              <div>
                <div style={{ fontWeight:700, fontSize:'1rem', color: active===t.key ? t.colorXL : 'var(--text)' }}>{t.name}</div>
                <div style={{ fontSize:'0.78rem', color:'var(--muted)' }}>by {t.org}</div>
              </div>
              {active===t.key && (
                <motion.div layoutId='tab-indicator'
                  style={{ marginLeft:'auto', width:8, height:8, borderRadius:'50%', background:t.colorL }}
                />)}
            </motion.button>
          ))}
        </motion.div>

        {/* Panel */}
        <AnimatePresence mode='wait'>
          <motion.div key={active}
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-16 }}
            transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
            style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.25rem' }}
          >
            {/* About */}
            <div className='glass' style={{ borderRadius:'var(--r)', padding:'1.75rem', borderColor: `rgba(${active==='claude'?'124,58,237':'6,182,212'},0.2)` }}>
              <h3 style={{ fontSize:'1rem', fontWeight:700, marginBottom:'0.6rem' }}>{d.emoji} About {d.name}</h3>
              <p style={{ color:'var(--muted)', fontSize:'0.88rem', marginBottom:'1rem', lineHeight:1.7 }}>{d.desc}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                {d.tags.map(t => <span key={t} className={`tag ${d.tagCls}`}>{t}</span>)}
              </div>
            </div>

            {/* Best for */}
            <div className='glass' style={{ borderRadius:'var(--r)', padding:'1.75rem' }}>
              <h3 style={{ fontSize:'1rem', fontWeight:700, marginBottom:'0.6rem' }}>✅ Best For</h3>
              <p style={{ color:'var(--muted)', fontSize:'0.88rem', marginBottom:'1rem', lineHeight:1.7 }}>{d.bestFor}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                {d.bestTags.map(t => <span key={t} className='tag'>{t}</span>)}
              </div>
            </div>

            {/* CLI */}
            <div className='glass' style={{ borderRadius:'var(--r)', padding:'1.75rem' }}>
              <CodeBlock label={d.cliTitle} code={d.cliCode} />
            </div>

            {/* API */}
            <div className='glass' style={{ borderRadius:'var(--r)', padding:'1.75rem' }}>
              <CodeBlock label={d.apiTitle} code={d.apiCode} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
