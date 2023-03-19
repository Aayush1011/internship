import TopBar from "../TopBar";

const NotFound = () => (
  <>
    <TopBar />
    <div style={{ margin: "0 auto", width: "100%", height: "100%" }}>
      <img
        style={{ width: "100%", objectFit: "cover" }}
        src="/assets/not-found.jpg"
        alt="404-not-found"
      />
    </div>
  </>
);

export default NotFound;
