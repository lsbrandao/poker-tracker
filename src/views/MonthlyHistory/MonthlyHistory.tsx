import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Chart from "../../components/Chart/Chart";
import Chip from "../../components/Chip/Chip";
import { useWindowSize } from "../../hooks/useWindowSize";
import { PlayedMonths } from "../../models/user";
import "./MonthlyHistory.scss";


const MonthlyHistory = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const playedMonths = [...state.playedMonths].reverse();

  const chartData = state.playedMonths.map((month: any) => {
    let total = 0
    month.sessions.map((session: any) => {
      session.playersResults.map((player: any) => total += player.result)
    })
    return {
      month: month.monthNumber,
      total
    }
  })

  console.log(playedMonths)

  return (
    <section className="page-container monthly-history-container">
      <h1 className="page-title">Monthly History</h1>
      <h2 className="page-subtitle">{state.name}</h2>

      <div className="chart-container">
        <Chart data={chartData} width={windowSize[0] > 720 ? 720 : windowSize[0]} height={200}></Chart>
      </div>

      {playedMonths.map((month: PlayedMonths, index: number) => (
        < Card key={month._id} >
          <div onClick={() => { }} className="flex-container space-between">
            <h2 className="month-name">{month.name}</h2>
            <Chip type={month.isMonthClosed ? 'closed' : 'open'} />
          </div>
        </Card>
      ))
      }

    </section >
  );
};

export default MonthlyHistory;
