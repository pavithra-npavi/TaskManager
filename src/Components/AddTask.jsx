import React, { useState } from "react";
import TasksDisplay from "./TasksDisplay";
import { RiDeleteBinLine } from "react-icons/all";
import styles from "./AddTask.module.css";
import Calendar from "react-calendar";
import moment from "moment";
import { FaRegCalendarAlt } from "react-icons/all";
import "react-calendar/dist/Calendar.css";
import { FaRegClock } from "react-icons/all";
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { add_tasks } from "../Components/Redux/TaskRedux/action";

const AddTask = ({ show, toggleShow, edit, toggleEdit }) => {
  const dispatch = useDispatch();

  const [date, setDate] = React.useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [optionsUser, setOptionsUser] = React.useState([]);

  const [taskTitle, setTaskTitle] = useState("");
  const [stateTime, setStateTime] = React.useState();
  const [stateUser, setStateUser] = React.useState();
  const [options, setOptions] = React.useState([]);

  let { isLoading, error, task } = useSelector(
    (state) => state.tasks,
    shallowEqual
  );

  const submit = (e) => {
    e.preventDefault();
  };

  const handleSave = (e) => {
    toggleShow(!show);
    e.preventDefault();
    // console.log("hey");
    dispatch(
      add_tasks({
        title: taskTitle,
        date: date,
        time: stateTime,
        username: stateUser
      })
    );
  };

  const handleChangeCalendar = (value) => {
    setDate(value);
    setShowCalendar(false);
  };

  const getOption = () => {
    return axios
      .get("https://json-server-pavithra.herokuapp.com/task-time")
      .then((res) => {
        // console.log(res.data);
        setOptions(res.data);
      });
  };
  const getOptionUser = () => {
    return axios
      .get("https://json-server-pavithra.herokuapp.com/task-username")
      .then((res) => {
        // console.log(res.data);
        setOptionsUser(res.data);
      });
  };
  const handleClick = (e) => {
    const value = e.target.value;
    setStateTime(value);
  };
  const handleClickUserName = (e) => {
    const value = e.target.value;
    setStateUser(value);
  };
  React.useEffect(() => {
    getOption();
    getOptionUser();
  }, [dispatch]);

  const handleCancel = () => {
    setTaskTitle("");
  };
  return (
    <>
      <div className={styles.taskFormContainer}>
        <form onSubmit={submit}>
          <div className={styles.taskDescription}>
            <label for="-task-desc">Task Description</label>
            <br />
            <input
              id="task-desc"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          <div className={styles.taskFromDateTime}>
            <label for="task-data">Date</label>
            <label for="task-desc">Time</label>
          </div>
          <div className={styles.taskFromDateTimeInput}>
            <div>
              <p>
                <FaRegCalendarAlt className="claendar-icon" />
                <input
                  className={styles.taskDate}
                  value={moment(date).format("L")}
                  onFocus={() => setShowCalendar(true)}
                />
              </p>
              <Calendar
                className={showCalendar ? "" : "hide"}
                value={date}
                onChange={handleChangeCalendar}
                style={{ width: "50px" }}
              />
            </div>
            <div>
              <div className="select-container">
                <FaRegClock className="time-icon" />
                <select onChange={handleClick} className={styles.taskTime}>
                  <option>Time</option>
                  {options.map((option) => (
                    <option
                      style={{ marginTop: "10px", padding: "10px" }}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.taskUserName}>
            <div>
              <label className={styles.tasklabelUserName}>Assign User</label>{" "}
              &nbsp;
              <div className="select-container">
                <select
                  onChange={handleClickUserName}
                  className={styles.taskUserNameSelect}
                >
                  {optionsUser.map((option) => (
                    <option
                      style={{ marginTop: "10px", padding: "10px" }}
                      value={option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.taskFormButton}>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTask;
