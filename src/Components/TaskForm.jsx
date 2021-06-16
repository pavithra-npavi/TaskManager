import React from "react";
import AddTask from "./AddTask";
import styles from "./TaskForm.module.css";
import { GoPlus } from "react-icons/all";
import TasksDisplay from "./TasksDisplay";
import { RiDeleteBinLine } from "react-icons/all";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axios from "axios";

const TaskForm = () => {
  const [show, toggleShow] = React.useState(false);
  const [edit, toggleEdit] = React.useState(true);
  const [options, setOptions] = React.useState(0);
  const [showAddedData, toggleShowAddedData] = React.useState(true);

  let { tasks } = useSelector((state) => state.tasks, shallowEqual);
  console.log(tasks, "tasks");

  const getData = () => {
    return axios
      .get("https://json-server-pavithra.herokuapp.com/tasks")
      .then((res) => {
        // console.log(res.data);
        setOptions(res.data);
      });
  };

  React.useEffect(() => {
    getData();
  });
  return (
    <>
      <div className={styles.maincontainer}>
        <p> TASKS : &nbsp; &nbsp; {options.length} </p>
        <div className={styles.taskPlusIcon} onClick={() => toggleShow(!show)}>
          <GoPlus />
        </div>
      </div>
      {showAddedData && (
        <div>
          <TasksDisplay />
        </div>
      )}
      {show && (
        <div>
          <AddTask
            show={show}
            toggleShow={toggleShow}
            eidt={edit}
            toggleEdit={toggleEdit}
          />
        </div>
      )}
    </>
  );
};
export default TaskForm;
