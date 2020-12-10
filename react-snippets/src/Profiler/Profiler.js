import React, { Profiler, useState, useEffect } from "react";

const ToDo = function () {
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setToDos(json);
      });
    return () => {};
  }, []);

  const onRender = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    const metric = {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    }
    console.table(metric);
  };

  const onClick = (index) => () => {
    const newToDos = [...toDos];
    newToDos[index].complete = true;
    setToDos(newToDos);
  }

  return (
    <Profiler id="todo" onRender={onRender}>
      <ul>
        {toDos.map(({id, title, complete }, index) => (
          <li key={id} onClick={onClick(index)}>
            {complete ? (
              <strike>{title}</strike>
            ) : (
              <div>
                <div>{title}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Profiler>
  );
};

export default ToDo;
