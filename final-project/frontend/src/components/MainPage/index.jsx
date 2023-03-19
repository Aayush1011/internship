import PreviousSessions from "../PreviousSessions";
import NewSession from "../NewSession";
import TopBar from "../TopBar";

const MainPage = () => {
  return (
    <>
      <TopBar />
      <div className="main-page">
        <PreviousSessions />
        <NewSession />
      </div>
    </>
  );
};

export default MainPage;
