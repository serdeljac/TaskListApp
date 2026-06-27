import Sidebar from './components/Sidebar.tsx'

//This is the parent of the entire web app.
function App() {
    return (
        //Use 'className' instead of 'class'
        <div className="app">
            <Sidebar />
            <main className="app__main">
            </main>
        </div>
    )
}

//Export the HTML when done
export default App