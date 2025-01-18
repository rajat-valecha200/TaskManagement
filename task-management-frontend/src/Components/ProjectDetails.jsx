import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(apiUrl + `projects/${projectId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProject(data.project);
          setTasks(data.tasks);
        } else {
          console.error("Failed to fetch project details");
        }
      } catch (error) {
        console.error("Error fetching project details", error);
      }
    };

    fetchProjectDetails();
  }, [projectId, navigate]);

  const handleAddTask = async () => {
    if (!taskTitle) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiUrl + "tasks", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, title: taskTitle }),
      });

      if (response.ok) {
        setTaskTitle("");
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        {project && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">{project.title}</h1>
            <p>{project.description}</p>
            <h2 className="text-xl mt-6">Tasks</h2>
            <div className="mt-4">
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="New Task Title"
                className="border p-2 w-72 rounded-md"
              />
              <button
                onClick={handleAddTask}
                className="bg-green-600 text-white py-2 px-4 rounded-md ml-2"
              >
                Add Task
              </button>
            </div>

            <div className="mt-6">
              {tasks.length === 0 ? (
                <p>No tasks available</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-gray-100 p-4 mb-4 rounded-lg"
                  >
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm">{task.description}</p>
                    <div className="mt-2">
                      <button className="bg-yellow-500 text-white py-1 px-3 rounded-md">
                        Edit Task
                      </button>
                      <button className="bg-red-500 text-white py-1 px-3 rounded-md ml-2">
                        Delete Task
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
