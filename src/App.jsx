import Demo from "./Components/Demo"
import Hero from "./Components/Hero"


const App = () => {
  return (
    <main>
        <div className="main">
            <div className="gradient"/>
        </div>
        <div className="app">
            <Hero/>
            <Demo/>

        </div>

    </main>
  )
    
}

export default App