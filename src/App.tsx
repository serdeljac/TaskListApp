import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'

//Pages
import Dashboard from './pages/Dashboard'
import MyTasks from './pages/MyTasks'


//This is the parent of the entire web app.
function App() {
    return (
        //Use 'className' instead of 'class'
        <div className="app">
            <Sidebar />
            <main className="main">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/tasks" element={<MyTasks />} />
                </Routes>
            </main>
        </div>
    )
}

//Export the HTML when done
export default App