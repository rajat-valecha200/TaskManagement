const Dashboard = () => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/";
    };
  
    return (
      <div>
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
          <h1>Dashboard</h1>
          <button onClick={handleLogout}>Logout</button>
        </nav>
        <main className="p-4">
          <h2>Your Tasks</h2>
        </main>
      </div>
    );
  };
  
  export default Dashboard;
  