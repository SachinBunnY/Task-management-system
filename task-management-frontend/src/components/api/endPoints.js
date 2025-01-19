import { axios } from "./axios";

export function registerUser(formData) {
  return axios
    .post("/auth/register", formData)
    .then((res) => {
      console.log("res:", res);

      return res.data;
    })
    .catch((err) => {
      console.log("Error while registration!", err);
      return err.response.data.message;
    });
}

export function loginUser(formData) {
  return axios
    .post("/auth/login", formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error while login user!");
      return err.response.data.message;
    });
}

export function getAllProjects() {
  return axios
    .get("/projects")
    .then((res) => {
      console.log(res);

      return res.data;
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.message);
      return [];
    });
}

export function createNewProject(currentProject) {
  return axios
    .post("/projects", currentProject)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err.response.data.message);
      return [];
    });
}

export function editExistingProject(editProjectId, currentProject) {
  return axios
    .put(`/projects/${editProjectId}`, currentProject)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err.response.data.message);
      return [];
    });
}

export function deleteExistingProject(projectId) {
  return axios
    .delete(`/project/${projectId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err.response.data.message);
      return [];
    });
}

export function getAllTask(selectedProjectId) {
  return axios
    .get(`/tasks/grouped/${selectedProjectId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
}

export function createNewTask(currentTask) {
  return axios
    .post(`/tasks/`, currentTask)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err.response.data.message);
      return [];
    });
}

export function editExistingTask(editTaskId, currentTask) {
  return axios
    .put(`/tasks/${editTaskId}`, currentTask)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err.response.data.message);
      return [];
    });
}

export function deleteExistingTask(taskId) {
  return axios
    .delete(`/tasks/${taskId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err.response.data.message);
      return [];
    });
}
