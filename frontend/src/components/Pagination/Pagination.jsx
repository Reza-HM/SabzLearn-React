import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ items, itemsCount, pathname, setShownCourses }) => {
  const [pagesCount, setPagesCount] = useState(null);
  const { page } = useParams();

  useEffect(() => {
    let endIndex = itemsCount * page;
    let startIndex = endIndex - itemsCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    setShownCourses(paginatedItems);

    let pagesNumber = Math.ceil(items.length / itemsCount);
    setPagesCount(pagesNumber);
  }, [page, items]);

  return (
    <div className="my-12">
      <ul className="flex justify-center items-center">
        <li>
          {!pathname.includes("backend") ? (
            <Link
              to={
                page > 1
                  ? `${pathname}/${Number(page) - 1}`
                  : `${pathname}/${3}`
              }
              className="rounded-lg w-16 h-16 flex justify-center items-center text-2xl bg-[#f0f0f1] mx-2 hover:text-white hover:bg-primary"
            >
              <EastIcon />
            </Link>
          ) : null}
        </li>
        {Array(pagesCount)
          .fill(0)
          .map((item, index) => (
            <li>
              {index + 1 === Number(page) ? (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="rounded-lg w-16 h-16 flex justify-center items-center text-2xl bg-[#f0f0f1] mx-2 hover:text-white hover:bg-primary courses__pagination-link--active"
                >
                  {index + 1}
                </Link>
              ) : (
                <Link
                  to={`${pathname}/${index + 1}`}
                  className="rounded-lg w-16 h-16 flex justify-center items-center text-2xl bg-[#f0f0f1] mx-2 hover:text-white hover:bg-primary"
                >
                  {index + 1}
                </Link>
              )}
            </li>
          ))}

        <li>
          {!pathname.includes("backend") ? (
            <Link
              to={
                page < 3
                  ? `${pathname}/${Number(page) + 1}`
                  : `${pathname}/${1}`
              }
              className="rounded-lg w-16 h-16 flex justify-center items-center text-2xl bg-[#f0f0f1] mx-2 hover:text-white hover:bg-primary"
            >
              <WestIcon />
            </Link>
          ) : null}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
