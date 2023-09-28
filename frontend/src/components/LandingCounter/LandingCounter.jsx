import React, { useState, useEffect } from "react";

const LandingCounter = ({ count, speed }) => {
  const [courseCounter, setCourseCounter] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCourseCounter((prevCount) => prevCount + 1);
    }, speed);

    if (courseCounter === count) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [courseCounter]);

  return <span className="font-bold text-4xl my-6">{courseCounter}</span>;
};

export default LandingCounter;
