import React, { useReducer } from "react";

const countReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      return {
        count: state.count + 1,
      };
    }
    case "MINUS": {
      return {
        count: state.count - 1,
      };
    }
    default: {
      return state.count;
    }
  }
};

const TestReducer = () => {
  const [counter, dispatch] = useReducer(countReducer, { count: 0 });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mx-auto">{counter.count}</h1>
      <button
        className="bg-blue-600 py-4 px-8 text-white rounded-lg"
        onClick={() => dispatch({ type: "ADD" })}
      >
        ADD
      </button>
      <button
        className="bg-blue-600 py-4 px-8 text-white rounded-lg"
        onClick={() => dispatch({ type: "MINUS" })}
      >
        MINUS
      </button>
    </div>
  );
};

export default TestReducer;
