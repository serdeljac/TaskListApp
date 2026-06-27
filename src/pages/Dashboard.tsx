import Topbar from '../components/Topbar'
import StatsGrid from '../components/StatsGrid'
import WeeklyGoalsCard from '../components/WeeklyGoalsCard'
import ProgressReport from '../components/ProgressReport'
import TasksForToday from '../components/TasksForToday'

function Dashboard() {
    return (
        <>
        <Topbar />
        <StatsGrid />

        <section className="dashboard-grid">
            <WeeklyGoalsCard />
            <ProgressReport />
            <TasksForToday />
        </section>
        </>
    )
}

export default Dashboard