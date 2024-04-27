import { useParams } from "react-router-dom";

export const ROLE = {
  STUDENT: "student",
  CHAIR: "chair",
  INSTRUCTOR: "instructor",
};

export const createTableHeaders = (role) => {
  const tableHeader = [];
  switch (role) {
    case ROLE.CHAIR:
      tableHeader.push(
        "No.",
        "Fullname",
        "Department",
        "Email",
        "ID",
        "Action"
      );
      break;
    default:
      return null;
  }
  return tableHeader;
};

const NavigationUSER = (user) => {
  const nav = [];
  const { id } = useParams();
  switch (user?.role) {
    case ROLE.STUDENT:
      nav.push(
        {
          to: `/student/${id}`,
          text: "Room",
          icon: <i className="pt-2 fi fi-sr-book-open-cover"></i>,
        },
        // {
        //   to: `/student/todo-list/${id}`,
        //   text: "Todo-List",
        //   icon: <i className="pt-2 fi fi-sr-journal"></i>,
        // },
        {
          to: `/message/${id}`,
          text: "Message",
          icon: <i className="pt-2 fi fi-sr-comment-alt"></i>,
        },
        {
          to: `/student/enroll/${id}`,
          text: "Enroll",
          icon: <i className="pt-2 fi fi-sr-graduation-cap"></i>,
        },
        {
          to: `/settings/${id}`,
          text: "Settings",
          icon: <i className="pt-2 fi fi-sr-settings"></i>,
        }
      );
      break;

    case ROLE.CHAIR:
      nav.push(
        // {
        //   to: `/chair/${id}`,
        //   text: "DashBoard",
        //   icon: <i className="fi fi-sr-chart-simple"></i>,
        // },
        // {
        //   to: `/chair/add-subjects/${id}`,
        //   text: "Add Subjects",
        //   icon: <i className="fi fi-sr-book-open-cover"></i>,
        // },
        {
          to: `/chair/${id}`,
          text: "Request Accounts",
          icon: <i className="fi fi-sr-user-check"></i>,
        }
      );
    case ROLE.INSTRUCTOR:
      nav.push(
        {
          to: `/instructor/${id}`,
          text: "Room",
          icon: <i className="pt-2 fi fi-sr-book-open-cover"></i>,
        },
        {
          to: `/enrollee/${id}`,
          text: "Enrollee",
          icon: <i className="fi fi-sr-user-add"></i>,
        },
        {
          to: `/message/${id}`,
          text: "Message",
          icon: <i className="pt-2 fi fi-sr-comment-alt"></i>,
        },
        {
          to: `/settings/${id}`,
          text: "Settings",
          icon: <i className="pt-2 fi fi-sr-settings"></i>,
        }
      );
      break;
    default:
      return "";
  }

  return nav;
};

export default NavigationUSER;
