const ChangeMail = () => {
  return (
    <>
      <div className="ui-section__header">
        <h2>Change Email</h2>
        <hr />
      </div>
      <div className="ui-section__content">
        <form>
          <label>Master Password:</label>
          <input type="password"></input>
          <label>New Email Id:</label>
          <input type="email"></input>
          <div className="ui-section__content--button">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangeMail;
