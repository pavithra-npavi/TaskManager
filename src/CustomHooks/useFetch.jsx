import axios from "axios";
import React, { useState } from "react";

// const url = "https://json-server-pavithra.herokuapp.com/producut_routes "
// // const url = "https://json-server-pavithra.herokuapp.com/students"
// const {isLoading, isError, data} = useFetch(url)

// return isLoading ? <div>Loading ...</div>
// : isError ? <div> Error..... </div>
// : <div>
//     {
//         data && data.map((item)=><h1 key ={item.id}> {item.name}</h1>)
//     }

export function useFetch(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const getFetch = () => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    getFetch();
  }, [url]);

  return { isLoading, isError, data };
}
