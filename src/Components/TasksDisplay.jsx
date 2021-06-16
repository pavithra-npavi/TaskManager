import React from "react";
import { useFetch } from "../CustomHooks/useFetch";
import styles from "./TasksDisplay.module.css";
import { FiEdit3, RiDeleteBinLine, TiTickOutline } from "react-icons/all";
import axios from "axios";
const TasksDisplay = () => {
  const [showAddedData, toggleShowAddedData] = React.useState(false);

  const url = "https://json-server-pavithra.herokuapp.com/tasks ";
  const { data } = useFetch(url);

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelte = (id) => {
    console.log("hye");
    axios.delete(`https://json-server-pavithra.herokuapp.com/tasks/${id}`);
  };
  return (
    <>
      {data &&
        data.map((item) => (
          <p key={item.id} className={styles.taskDisplay}>
            <img
              className={styles.taskUserPic}
              src="data:image/png;base64,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"
              alt=""
            />
            <p>
              {item.title} &nbsp; &nbsp;
              {item.username}{" "}
            </p>
            <p className={styles.editIcon} onClick={() => handleEdit(item.id)}>
              <FiEdit3 />
            </p>

            <p className={styles.editTick}>
              <TiTickOutline />
            </p>
            <p
              className={styles.taskFormDelButton}
              onClick={() => handleDelte(item.id)}
            >
              <RiDeleteBinLine />
            </p>
          </p>
        ))}
    </>
  );
};

export default TasksDisplay;
