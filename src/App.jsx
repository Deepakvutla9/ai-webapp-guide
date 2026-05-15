import Nav from './components/Nav'
import Hero from './components/Hero'
import Compare from './components/Compare'
import Workflow from './components/Workflow'
import Tools from './components/Tools'
import Architecture from './components/Architecture'
import PromptBuilder from './components/PromptBuilder'
import Footer from './components/Footer'

export default function App() {
  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <Compare />
        <Workflow />
        <Tools />
        <Architecture />
        <PromptBuilder />
      </main>
      <Footer />
    </div>
  )
}
