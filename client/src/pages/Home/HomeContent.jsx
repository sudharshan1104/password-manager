import HomeNavbar from "../../components/HomeComponents/HomeNavbar";

const HomeContent = () => {
  return (
    <>
      <HomeNavbar />
      <section className="home">
        <main className="home__intro">
          <h1>Welcome</h1>
          <p>MERN Stack project</p>
          <p>A simple password manager with enterprise features</p>
          <button>
            <a
              href="https://github.com/Mohit-3430/CredPass"
              target={"_blank"}
              rel="noreferrer"
            >
              Code
            </a>
          </button>
        </main>
      </section>
    </>
  );
};

export default HomeContent;
