import {useState} from "react";

const modules = import.meta.glob('./cases/*/index.jsx', {
  import: 'default',
  eager: true,
})

const moduleKeys = Object.keys(modules)

function App() {
  const [activeModuleName, setActiveModuleName] = useState(moduleKeys[1])
  console.log('active module name', modules[activeModuleName])
  const ActiveModuleComponent  = modules[activeModuleName]
  return (
    <div className="root">
      <div className="side-bar">
        {
          moduleKeys.map(moduleName => (<button key={moduleName} onClick={() => setActiveModuleName(moduleName)}>{moduleName}</button>))
        }
      </div>
      <div className="container">
        <ActiveModuleComponent key={activeModuleName}></ActiveModuleComponent>
      </div>
    </div>
  )
}

export default App;
