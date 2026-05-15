import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WEB = [
  { icon:'💡', n:1, title:'Idea & Spec', sub:'Define what to build',
    h:'Step 1 — Idea & Product Spec',
    desc:'Describe your app to Claude — who it’s for, what problem it solves, and the 3 core features. Claude will write a full spec back.',
    code:'# Paste into Claude.ai or Claude Code:\n\nI want to build a web app for [target user].\nCore problem: [one sentence]\n\n3 main features:\n  1. [feature 1]\n  2. [feature 2]\n  3. [feature 3]\n\nCreate a product spec, recommend a tech stack\n(prefer React + Supabase), and list DB tables.' },
  { icon:'🏗️', n:2, title:'Architecture', sub:'Stack & structure',
    h:'Step 2 — Architecture Planning',
    desc:'Ask Claude to finalize the tech stack, create the full folder structure, and design the database schema with relationships.',
    code:'Given this spec, provide:\n\n1. Final tech stack (React 18, Vite, Express,\n   Supabase, Tailwind, shadcn/ui)\n2. Complete folder/file structure\n3. Database schema with all relationships\n4. List of npm packages to install\n5. Auth strategy (Supabase Auth + RLS)' },
  { icon:'🎨', n:3, title:'UI Design', sub:'Generate components',
    h:'Step 3 — UI via v0.dev or Claude',
    desc:'Describe your screens to v0.dev or Claude. Get production-ready React + Tailwind components with shadcn/ui you can paste directly.',
    code:'# v0.dev or Claude prompt:\n\nCreate a React dashboard page with:\n- Sidebar nav (Home, Analytics, Settings)\n- Top header with avatar + notification bell\n- 4 stat cards (users, revenue, growth, churn)\n- Recent activity table below\nUse Tailwind CSS + shadcn/ui. Dark theme.' },
  { icon:'⚙️', n:4, title:'Backend', sub:'API & database',
    h:'Step 4 — Backend & API Routes',
    desc:'Have Claude write your Express routes, Supabase queries, and row-level security policies in one go.',
    code:'Write a Node.js/Express API with:\n- POST /api/users     — create user\n- GET  /api/users/:id — get profile\n- PUT  /api/users/:id — update\n- DELETE /api/users/:id\n\nUse Supabase client, zod validation,\nJWT middleware, and proper error handling.' },
  { icon:'🧪', n:5, title:'Testing', sub:'AI-written tests',
    h:'Step 5 — AI-Generated Tests',
    desc:'Paste any function into Claude and get full Vitest + supertest coverage — success, edge cases, and error paths.',
    code:'Write Vitest unit tests for this function:\n[paste function here]\n\nAlso write supertest integration tests\nfor the /api/users endpoints.\nCover: 200s, 400s, 401s, 404s, 500s.' },
  { icon:'🚀', n:6, title:'Deploy', sub:'Go live',
    h:'Step 6 — Deploy to Production',
    desc:'Claude gives you exact deployment steps — environment variables, build commands, domain config, and Supabase connection strings.',
    code:'Give me step-by-step deploy instructions:\n- Frontend (React/Vite) → Vercel\n- Backend (Express)    → Railway\n\nInclude: env vars, build commands,\ncustom domain setup, Supabase connection,\nand a CI/CD GitHub Actions workflow.' },
]

const MOBILE = [
  { icon:'📋', n:1, title:'App Concept', sub:'Platform & features',
    h:'Step 1 — App Concept & Platform',
    desc:'Tell Claude target platform, native features needed (camera, GPS, push), and user persona. Get a React Native vs Flutter recommendation.',
    code:'I want to build a mobile app for [iOS/Android/both].\nUsers: [describe audience]\nCore features: [list 3-5]\nNative: [camera/GPS/notifications/payments?]\n\nReact Native or Flutter — which fits better?\nGive me a project scaffold + folder structure.' },
  { icon:'🛠️', n:2, title:'Framework', sub:'RN or Flutter',
    h:'Step 2 — Framework & Navigation',
    desc:'Scaffold the project with Expo (React Native) or Flutter CLI, set up navigation, state management, and TypeScript types.',
    code:'# React Native with Expo:\nnpx create-expo-app MyApp --template\n\n# Then ask Claude:\nSet up React Navigation v6 with:\n- Bottom tab (Home, Profile, Settings)\n- Stack navigator inside Home\n- TypeScript route types\n- Zustand for global state' },
  { icon:'📐', n:3, title:'Screens', sub:'Nav & layout',
    h:'Step 3 — Screens & Layouts',
    desc:'Generate each screen with Claude. Describe the layout, data to display, and user interactions — get complete React Native JSX back.',
    code:'Create a React Native profile screen with:\n- Avatar (from camera roll)\n- Name, bio, follower stats\n- Edit Profile button\n- 3-column posts grid\nUse StyleSheet. Handle loading + empty states.' },
  { icon:'🔧', n:4, title:'Native APIs', sub:'Camera, GPS, Push',
    h:'Step 4 — Native Features',
    desc:'Claude writes exact Expo API code for camera, geolocation, push notifications, or Stripe payments — with permission handling.',
    code:'Add camera to my Expo app:\n1. Button: open camera or photo library\n2. Preview selected image\n3. Compress + upload to Supabase Storage\n4. Return public URL\n\nHandle iOS + Android permissions properly.' },
  { icon:'🧪', n:5, title:'Testing', sub:'Jest + RNTL',
    h:'Step 5 — Testing',
    desc:'Generate Jest + React Native Testing Library tests for components, hooks, and navigation flows.',
    code:'Write RNTL tests for this component:\n[paste component]\n\nTest with @testing-library/react-native:\n- Renders without crash\n- Button press triggers action\n- Shows loading spinner\n- Handles error state\n- Snapshot test' },
  { icon:'📦', n:6, title:'App Store', sub:'Submit & publish',
    h:'Step 6 — App Store Submission',
    desc:'Claude generates your eas.json, app.json with all required metadata, and a step-by-step App Store + Play Store checklist.',
    code:'Help me submit my Expo app to\nApp Store and Google Play.\n\nGenerate:\n- eas.json (production profile)\n- app.json with all required fields\n- App Store checklist (screenshots, metadata)\n- Play Store checklist\n- Privacy policy template' },
]

function CopyCode({ code }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className='code-block'>
      <button className='copy-btn' onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(()=>setCopied(false),1500) }}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
      {code}
    </div>
  )
}

export default function Workflow() {
  const [tab, setTab] = useState('web')
  const [step, setStep] = useState(0)
  const steps = tab === 'web' ? WEB : MOBILE
  const accentColor = tab === 'web' ? '#7c3aed' : '#06b6d4'

  return (
    <section id='workflow' style={{ padding:'8rem 0', position:'relative', overflow:'hidden' }}>
      <span className='bg-num'>02</span>
      <div className='section-wrap'>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <p className='s-label'>Step by Step</p>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:800, letterSpacing:'-0.03em', marginBottom:'0.75rem' }}>
            <span className='grad-text'>How to Build</span> an App with AI
          </h2>
          <p style={{ color:'var(--muted)', marginBottom:'2.5rem', maxWidth:520 }}>Click any step to see the exact prompt to use, which tool to open, and what output to expect.</p>
        </motion.div>

        {/* Tab row */}
        <div style={{ display:'flex', background:'var(--bg2)', borderRadius:999, padding:4, gap:4, width:'fit-content', marginBottom:'3rem', border:'1px solid var(--border)' }}>
          {[['web','🌐 Web App'],['mobile','📱 Mobile App']].map(([k,label]) => (
            <motion.button key={k} onClick={() => { setTab(k); setStep(0) }}
              style={{ padding:'0.6rem 1.5rem', borderRadius:999, border:'none', cursor:'pointer',
                background: tab===k ? 'var(--bg3)' : 'transparent',
                color: tab===k ? 'var(--text)' : 'var(--muted)',
                fontWeight:500, fontSize:'0.9rem',
                boxShadow: tab===k ? '0 2px 10px rgba(0,0,0,0.4)' : 'none',
                transition:'all 0.2s'
              }}
              whileTap={{ scale:0.97 }}
            >{label}</motion.button>
          ))}
        </div>

        {/* Steps */}
        <motion.div style={{ display:'flex', gap:0, overflowX:'auto', paddingBottom:'0.5rem', marginBottom:'2rem' }}
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }}
        >
          {steps.map((s, i) => (
            <div key={i} style={{ flex:1, minWidth:130, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', position:'relative', padding:'0 0.5rem', cursor:'pointer' }}
              onClick={() => setStep(i)}
            >
              {i < steps.length-1 && (
                <div style={{ position:'absolute', top:28, left:'calc(50% + 28px)', right:'calc(-50% + 28px)', height:2,
                  background:`linear-gradient(90deg, ${accentColor}60, ${accentColor}10)` }} />
              )}
              <motion.div
                animate={{ borderColor: step===i ? accentColor : 'var(--border)', background: step===i ? `${accentColor}1a` : 'var(--bg2)', boxShadow: step===i ? `0 0 24px ${accentColor}40` : 'none' }}
                transition={{ duration:0.3 }}
                style={{ width:56, height:56, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', border:'2px solid var(--border)', marginBottom:'0.75rem', position:'relative', zIndex:1, cursor:'pointer' }}
              >
                {s.icon}
                <span style={{ position:'absolute', top:-6, right:-6, width:20, height:20, borderRadius:'50%', background:accentColor, fontSize:'0.62rem', fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff' }}>{s.n}</span>
              </motion.div>
              <div style={{ fontSize:'0.82rem', fontWeight:600, marginBottom:'0.2rem', color: step===i ? 'var(--text)' : 'var(--text2)' }}>{s.title}</div>
              <div style={{ fontSize:'0.73rem', color:'var(--muted)' }}>{s.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* Detail panel */}
        <AnimatePresence mode='wait'>
          <motion.div key={`${tab}-${step}`}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-10 }}
            transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
            style={{ background:'var(--bg2)', border:`1px solid var(--border)`, borderRadius:'var(--r)', padding:'2rem' }}
          >
            <h4 style={{ fontSize:'1.05rem', fontWeight:700, color: accentColor==='#7c3aed' ? 'var(--purple-l)' : 'var(--cyan-l)', marginBottom:'0.6rem' }}>{steps[step].h}</h4>
            <p style={{ color:'var(--muted)', fontSize:'0.9rem', marginBottom:'1.25rem', lineHeight:1.7 }}>{steps[step].desc}</p>
            <CopyCode code={steps[step].code} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
