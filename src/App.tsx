import Sidebar from './components/Sidebar.tsx'
import Topbar from './components/Topbar.tsx'

//This is the parent of the entire web app.
function App() {
    return (
        //Use 'className' instead of 'class'
        <div className="app">
            <Sidebar />
            <main className="main">
                <Topbar />
            </main>
        </div>
    )
}

//Export the HTML when done
export default App