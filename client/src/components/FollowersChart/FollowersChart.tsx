import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { saveAs } from "file-saver";
import { RootState } from "../../redux/Store";
import "./FollowersChart.css";

Chart.register(CategoryScale, LinearScale, BarElement);

export default function FollowersGraph() {
  const vacations = useSelector(
    (state: RootState) => state.vacation.vacations
  );
  const followers = useSelector((state: RootState) => state.follows.follows);

  const vacationsWithFollowersCount = vacations.map((vacation) => {
    const followersCount = followers.filter(
      (follow) => follow.vacationId === vacation.id
    ).length;
    return { ...vacation, followersCount };
  });

  const filteredVacations = vacationsWithFollowersCount.filter(
    (vacation) => vacation.followersCount > 0
  );

  const data = {
    labels: filteredVacations.map((vacation) => vacation.destination),
    datasets: [
      {
        label: "# of Followers",
        data: filteredVacations.map((vacation) => vacation.followersCount),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    scales: {
      x: {
        type: "category",
        labels: filteredVacations.map((vacation) => vacation.destination),
        color: "#333",
      },
      y: {
        type: "linear",
        beginAtZero: true,
        color: "#333",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleDownloadCSV = () => {
    let csvContent = "";
    csvContent += "Destination,FollowersCount\n";

    filteredVacations.forEach((vacation) => {
      csvContent += `${vacation.destination.split(",")[0]}, ${
        vacation.followersCount
      }\n`;
    });

    const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

    saveAs(csvBlob, "vacation_followers.csv");
  };

  return (
    <div className="followers-graph-container">
      <div className="download-csv-container">
        <button className="download-csv-button" onClick={handleDownloadCSV}>
          Download CSV
        </button>
      </div>
      <div className="chart-container">
        {filteredVacations.length > 0 ? (
          <div className="chart-wrapper">
            <Bar data={data} options={options} />
          </div>
        ) : (
          <h5 className="no-data-message">No vacations with followers to display.</h5>
        )}
      </div>
    </div>
  );
}