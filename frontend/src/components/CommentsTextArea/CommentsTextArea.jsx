import CommentIcon from "@mui/icons-material/Comment";
import CheckIcon from "@mui/icons-material/Check";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AuthContext from "./../../contexts/authContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const CommentsTextArea = ({ comments, submitCommentHandler }) => {
  const authContext = useContext(AuthContext);

  const [commentBody, setCommentBody] = useState("");
  const [commentScore, setCommentScore] = useState("");
    return (
    <div className="mt-8 rounded-lg shadow-lg py-8 px-10">
      <div className="flex items-center mb-20">
        <div className="bg-primary text-white w-16 h-16 flex justify-center items-center rounded-2xl">
          <CommentIcon className="!text-4xl" />
        </div>
        <span className="mr-4">نظرات</span>
      </div>
      <div>
        {comments.length === 0 ? (
          <div className="bg-yellow-100 border-yellow-400 border-l-4 p-4">
            <p className="text-yellow-700">
              هنوز کامنتی برای این دوره ثبت نشده
            </p>
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <>
                <div
                  className="bg-[#f9fafd] rounded-2xl border border-dashed border-[#ccc] p-12 mb-12"
                  key={comment._id}
                >
                  <div className="comments__question">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <span className="comments__question-name text-2xl font-bold text-darkColor">
                          {comment.creator.name}
                        </span>
                        <span className="comments__question-status flex items-center bg-primary text-white text-xl font-bold py-2 px-4 rounded-lg my-4 mx-0">
                          {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                        </span>
                        <span className="comments__question-date text-2xl text-[#adb5bd]">
                          {comment.createdAt.slice(0, 10)}
                        </span>
                      </div>
                      <div className="comments__question-header-left">
                        <a
                          className="comments__question-header-link text-xl text-[#b1bbbf] border border-solid border-[#b1bbbf] py-2 px-5 rounded-md bg-[#fff]"
                          href="#"
                        >
                          پاسخ
                        </a>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="comments__question-paragraph text-xl text-[#7d7e7f]">
                        {comment.body}
                      </p>
                    </div>
                    {comment.answerContent && (
                      <div
                        className="bg-[#f9fafd] rounded-2xl border border-dashed border-[#ccc] p-12 my-12"
                        key={comment.answerContent._id}
                      >
                        <div className="comments__question">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <span className="comments__question-name text-2xl font-bold text-darkColor">
                                {comment.answerContent.creator.name}
                              </span>
                              <span className="comments__question-status flex items-center bg-primary text-white text-xl font-bold py-2 px-4 rounded-lg my-4 mx-0">
                                {comment.answerContent.creator.role === "ADMIN"
                                  ? "مدیر"
                                  : "کاربر"}
                              </span>
                              <span className="comments__question-date text-2xl text-[#adb5bd]">
                                {comment.answerContent.createdAt.slice(0, 10)}
                              </span>
                            </div>
                            <div className="comments__question-header-left">
                              <a
                                className="comments__question-header-link text-xl text-[#b1bbbf] border border-solid border-[#b1bbbf] py-2 px-5 rounded-md bg-[#fff]"
                                href="#"
                              >
                                پاسخ
                              </a>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="comments__question-paragraph text-xl text-[#7d7e7f]">
                              {comment.answerContent.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ))}
            <div className="comments__pagantion">
              <ul className="flex items-center justify-center">
                <li className="comments__pagantion-item">
                  <a
                    href="#"
                    className="rounded-lg w-16 h-16 flex items-center justify-center text-2xl bg-[#f0f0f1] my-0 mx-2"
                  >
                    <ArrowRightAltIcon />
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a
                    href="#"
                    className="rounded-lg w-16 h-16 flex items-center justify-center text-2xl bg-[#f0f0f1] my-0 mx-2"
                  >
                    1
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a
                    href="#"
                    className="rounded-lg w-16 h-16 flex items-center justify-center text-2xl bg-[#f0f0f1] my-0 mx-2"
                  >
                    2
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a
                    href="#"
                    className="rounded-lg w-16 h-16 flex items-center justify-center text-2xl bg-[#f0f0f1] my-0 mx-2 comments__pagantion-link--active"
                  >
                    3
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {authContext.isLoggedIn === true ? (
        <>
          <div className="flex flex-col mt-24">
            <span className="text-2xl font-bold text-darkColor mb-6">
              قوانین ثبت دیدگاه
            </span>
            <span className="text-xl text-[#7b868a] mb-2 gap-2 flex">
              <CheckIcon className="text-[#15cc79]" />
              اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش
              انلاین استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
            </span>
            <span className="text-xl text-[#7b868a] mb-2 gap-2 flex">
              <CheckIcon className="text-[#15cc79]" />
              دیدگاه های نامرتبط به دوره تایید نخواهد شد.
            </span>
            <span className="text-xl text-[#7b868a] mb-2 gap-2 flex">
              <CheckIcon className="text-[#15cc79]" />
              سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
            </span>
            <span className="text-xl text-[#7b868a] mb-2 gap-2 flex">
              <CheckIcon className="text-[#15cc79]" />
              از درج دیدگاه های تکراری پرهیز نمایید.
            </span>
          </div>
          <div className="bg-[#f0f2f7] rounded-lg p-12">
            <div>
              <span className="text-2xl text-[#6c757d]">امتیاز شما</span>
              <div className="flex justify-between items-center bg-white py-3 pr-4 pl-8 my-2 mx-0 rounded-lg border border-solid border-[#e5e5e5] cursor-pointer text-[#7d7e7f] transition-all duration-300 ease-linear hover:bg-[#1e83f0] hover:text-white">
                <select
                  className="bg-unset w-full"
                  value={commentScore}
                  onChange={(event) => setCommentScore(event.target.value)}
                >
                  <option value="-1">امتیاز خود را انتخاب کنید</option>

                  <option value="1" className="text-darkColor">
                    ضعیف
                  </option>
                  <option value="2" className="text-darkColor">
                    متوسط
                  </option>
                  <option value="3" className="text-darkColor">
                    خوب
                  </option>
                  <option value="4" className="text-darkColor">
                    بسیار خوب
                  </option>
                  <option value="5" className="text-darkColor">
                    عالی
                  </option>
                </select>
              </div>
            </div>
            <div className="comments__respond-content">
              <div className="text-2xl text-[#6c757d] mb-2">دیدگاه شما *</div>
              <textarea
                className="w-full h-[20rem] outline-none border border-solid border-[#e5e5e5] rounded-lg py-2 px-4"
                value={commentBody}
                onChange={(event) => setCommentBody(event.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary text-white text-2xl rounded-lg py-2 px-8 mt-8"
              onClick={() => submitCommentHandler(commentBody, commentScore)}
            >
              ارسال
            </button>
          </div>
        </>
      ) : (
        <div className="bg-red-100 border-red-400 border-l-4 p-4 mt-8">
          <p className="text-red-700">
            برای ثبت کامنت باید{" "}
            <Link to="/login" className="!text-2xl text-primary">
              لاگین کنید
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentsTextArea;
