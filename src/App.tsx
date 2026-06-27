import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import StatsGrid from './components/StatsGrid'
import WeeklyGoals from './components/WeeklyGoals'
import ProgressReport from './components/ProgressReport'
import TasksForToday from './components/TasksForToday'

//This is the parent of the entire web app.
function App() {
    return (
        //Use 'className' instead of 'class'
        <div className="app">
            <Sidebar />
            <main className="main">
                <Topbar />
                <StatsGrid />

                <section className="dashboard-grid">
                    <WeeklyGoals />
                    <ProgressReport />
                    <TasksForToday />
                </section>
            </main>
        </div>
    )
}

//Export the HTML when done
export default App