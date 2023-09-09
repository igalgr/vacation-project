import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from '../../redux/Store';
import { getVacationsAction } from '../../redux/VacationReducer';
import { api } from '../../utils/dbURL_key';
import { ChangeEvent, useEffect, useState } from 'react';
import VacationCard from '../VacationCard/VacationCard';
import './VacationList.css';

interface CheckState {
  favorites: boolean;
  notStarted: boolean;
  inProgress: boolean;
}

const VacationList = () => {
  const vacations = useSelector((state: RootState) => state.vacation.vacations);
  const followers = useSelector((state: RootState) => state.follows.follows);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.level === 1 ? true : false;

  const [checked, setChecked] = useState<CheckState>({
    favorites: false,
    notStarted: false,
    inProgress: false,
  });

  const [filteredVacations, setFilteredVacations] = useState(vacations);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the filteredVacations array to get the items for the current page
  const currentItems = filteredVacations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };

  const currentDate = new Date().toISOString();

  useEffect(() => {
    if (checked.favorites || checked.notStarted || checked.inProgress) {
      const sortedVacations = vacations
        .filter(vacation => {
          const isFavorited = followers.some(
            follow =>
              follow.vacationId === vacation.id &&
              follow.userId === currentUser?.id
          );
          const hasNotStarted =
            new Date(vacation.startDate) > new Date(currentDate);
          const isInProgress =
            new Date(vacation.startDate) <= new Date(currentDate) &&
            new Date(vacation.endDate) >= new Date(currentDate);

          return (
            (checked.favorites && isFavorited) ||
            (checked.notStarted && hasNotStarted) ||
            (checked.inProgress && isInProgress)
          );
        })
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );

      setFilteredVacations(sortedVacations);
    } else {
      const sortedVacations = vacations.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
      setFilteredVacations(sortedVacations);
    }
  }, [checked, currentDate, currentUser?.id, followers, vacations]);

  const getVacations = async () => {
    try {
      const response = await api.get('/vacations');
      if (response.status === 200) {
        store.dispatch(getVacationsAction(response.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVacations();
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredVacations.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [checked]);

  return (
    <>
      {!isAdmin ? (
        <div>
          <label>FAVORITES</label>
          <label className="toggler-wrapper style-6">
            <input
              type="checkbox"
              checked={checked.favorites}
              onChange={handleChange}
              name="favorites"
            />
            <div className="toggler-slider">
              <div className="toggler-knob"></div>
            </div>
          </label>
          <label>IN PROGRESS</label>
          <label className="toggler-wrapper style-6">
          <input
              type="checkbox"
              checked={checked.inProgress}
              onChange={handleChange}
              name="inProgress"
            />
            <div className="toggler-slider">
              <div className="toggler-knob"></div>
            </div>
          </label>
          <label>NOT STARTED</label>
          <label className="toggler-wrapper style-6">
          <input
              type="checkbox"
              checked={checked.notStarted}
              onChange={handleChange}
              name="notStarted"
            />
            <div className="toggler-slider">
              <div className="toggler-knob"></div>
            </div>
          </label>
        </div>
      ) : (
        <></>
      )}
      <div className="vacationList">
        {currentItems.map(vacation => (
          <VacationCard key={vacation.id} vacation={vacation} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default VacationList;
