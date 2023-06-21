const ClassOverview = () => {
  return (
    <div>
      <h1>Class Overview</h1>
      <div>
        <h2>This is where we see the different periods.</h2>
      </div>
      <div>
        <h2>Option to add/remove students, or entire class</h2>

        <form className="create-classes-form">
          <label>Add class or student</label>
          <div htmlFor="add-buttons">
            <button id="add-class-button">Add Class</button>
            <button id="add-student-button">Add Student</button>
          </div>
          <div className="input-container">
            <input
              type="text"
              id="create-class-input"
              placeholder="Class name"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassOverview;
