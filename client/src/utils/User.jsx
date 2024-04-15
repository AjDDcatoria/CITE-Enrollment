export const ROLE = {
  STUDENT: "student",
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
};

export const createTableHeaders = (role) => {
  const tableHeader = [];
  switch (role) {
    case ROLE.ADMIN:
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
  switch (user.role) {
    case ROLE.STUDENT:
      nav.push(
        {
          to: "/student",
          text: "Room",
          icon: <i className="pt-2 fi fi-sr-book-open-cover"></i>,
        },
        {
          to: "/student/todo-list/1", // ! temp id = 1
          text: "Todo-List",
          icon: <i className="pt-2 fi fi-sr-journal"></i>,
        },
        {
          to: "/message",
          text: "Message",
          icon: <i className="pt-2 fi fi-sr-comment-alt"></i>,
        },
        {
          to: "/student/enroll",
          text: "Enroll",
          icon: <i className="pt-2 fi fi-sr-graduation-cap"></i>,
        },
        {
          to: "/settings",
          text: "Settings",
          icon: <i className="pt-2 fi fi-sr-settings"></i>,
        }
      );
      break;

    case ROLE.ADMIN:
      nav.push(
        {
          to: "/admin",
          text: "DashBoard",
          icon: <i className="fi fi-sr-chart-simple"></i>,
        },
        {
          to: "/message",
          text: "Message",
          icon: <i className="pt-2 fi fi-sr-comment-alt"></i>,
        },
        {
          to: "/admin/add-subjects",
          text: "Add Subjects",
          icon: <i className="fi fi-sr-book-open-cover"></i>,
        },
        {
          to: "/admin/request-accounts",
          text: "Request Accounts",
          icon: <i className="fi fi-sr-user-check"></i>,
        }
      );
    case ROLE.INSTRUCTOR:
      nav.push(
        {
          to: "/instructor",
          text: "Room",
          icon: <i className="pt-2 fi fi-sr-book-open-cover"></i>,
        },
        {
          to: "/message",
          text: "Message",
          icon: <i className="pt-2 fi fi-sr-comment-alt"></i>,
        },
        {
          to: "/settings",
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
