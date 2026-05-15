import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--border)', padding:'3rem 2rem', textAlign:'center' }}>
      <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        viewport={{ once:true }}
        transition={{ duration:0.6 }}
      >
        <div style={{ fontWeight:800, fontSize:'1.1rem', marginBottom:'0.75rem' }}>
          🤖 <span className='grad-text'>AI App Builder Guide</span>
        </div>
        <p style={{ color:'var(--muted)', fontSize:'0.85rem', marginBottom:'1rem' }}>
          Claude by Anthropic · Codex by OpenAI · GitHub Copilot by Microsoft
        </p>
        <a
          href='https://github.com/Deepakvutla9/ai-webapp-guide'
          target='_blank'
          rel='noreferrer'
          style={{ color:'var(--purple-l)', fontSize:'0.85rem', textDecoration:'none', fontWeight:500 }}
        >
          View on GitHub ↗
        </a>
      </motion.div>
    </footer>
  )
}
