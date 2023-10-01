import React, { useEffect, useReducer } from "react";
import validator from "./../../Validators/validator";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations),
      };
    }
    default: {
      return state;
    }
  }
};

const Input = (props) => {
  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const { value, isValid } = mainInput;
  const { id, inputHandler } = props;

  useEffect(() => {
    inputHandler(id, value, isValid);
  }, [value]);

  const onChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validations: props.validations,
      isValid: true,
    });
  };

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`${props.className} ${
          mainInput.isValid
            ? "!border-2 !border-solid !border-primary"
            : "!border-2 !border-solid !border-red-600"
        }`}
        value={mainInput.value}
        onChange={onChangeHandler}
      />
    ) : (
      <textarea
        placeholder={props.placeholder}
        className={`${props.className} ${
          mainInput.isValid
            ? "border-2 border-solid border-primary"
            : "border-2 border-solid border-red-600"
        }`}
        value={mainInput.value}
        onChange={onChangeHandler}
      />
    );

  return <div>{element}</div>;
};

export default Input;
