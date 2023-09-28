import Index from "./pages/Index/Index";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Category from "./pages/Category/Category";
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo";
import Courses from "./pages/Courses/Courses";
import Articles from "./pages/Articles/Articles";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Contact from "./pages/Contact/Contact";
import Search from "./pages/Search/Search";

import AdminPanel from "./pages/AdminPanel/Index";
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/Courses/Courses";
import Menus from "./pages/AdminPanel/Menus/Menus";
import AdminArticles from "./pages/AdminPanel/Articles/Articles";
import AdminCategory from "./pages/AdminPanel/Category/Category";
import Messages from "./pages/AdminPanel/Messages/Messages";
import Sessions from "./pages/AdminPanel/Sessions/Sessions";
import Session from "./pages/Session/Session";
import Comments from "./pages/AdminPanel/Comments/Comments";
import Offs from "./pages/AdminPanel/Offs/Offs";
import Draft from "./pages/AdminPanel/Articles/Draft";
import PAdminIndex from "./pages/AdminPanel/PAdminIndex/PAdminIndex";
import AdminPanelAnswerToTickets from "./pages/AdminPanel/Tickets/Tickets";
import Campaigns from "./pages/AdminPanel/Campaigns/Campaigns";

import PAdminPrivate from "./components/Privates/PAdminPrivate";

import UserPanel from "./pages/UserPanel/Index";
import UserPanelIndex from "./pages/UserPanel/Index/Index";
import Orders from "./pages/UserPanel/Orders/Orders";
import UserCourses from "./pages/UserPanel/Courses/Courses";
import SendTicket from "./pages/UserPanel/Tickets/SendTicket";
import Tickets from "./pages/UserPanel/Tickets/Tickets";
import UserPanelTicketAnswer from "./pages/UserPanel/Tickets/TicketAnswer";
import UserPanelEditAccount from "./pages/UserPanel/EditAccount/EditAccount";

const routes = [
  { path: "/", element: <Index /> },
  {
    path: "/course-info/:courseName",
    element: <CourseInfo />,
  },
  {
    path: "/category-info/:categoryName/:page",
    element: <Category />,
  },
  {
    path: "/article-info/:articleName",
    element: <ArticleInfo />,
  },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:value", element: <Search /> },
  { path: "/:courseName/:sessionID", element: <Session /> },

  {
    path: "/p-admin/*",
    element: (
      <PAdminPrivate>
        <AdminPanel />
      </PAdminPrivate>
    ),
    children: [
      { path: "", element: <PAdminIndex /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "articles/draft/:shortName", element: <Draft /> },
      { path: "categories", element: <AdminCategory /> },
      { path: "messages", element: <Messages /> },
      { path: "sessions", element: <Sessions /> },
      { path: "comments", element: <Comments /> },
      { path: "offs", element: <Offs /> },
      { path: "tickets", element: <AdminPanelAnswerToTickets /> },
      { path: "campaigns", element: <Campaigns /> },
    ],
  },
  {
    path: "/my-account/*",
    element: <UserPanel />,
    children: [
      { path: "", element: <UserPanelIndex /> },
      { path: "orders", element: <Orders /> },
      { path: "courses", element: <UserCourses /> },
      { path: "tickets", element: <Tickets /> },
      { path: "send-ticket", element: <SendTicket /> },
      { path: "tickets/answer/:id", element: <UserPanelTicketAnswer /> },
      { path: "edit-account", element: <UserPanelEditAccount /> },
    ],
  },
];

export default routes;
