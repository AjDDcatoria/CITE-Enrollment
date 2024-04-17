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
  switch (user?.role) {
    case ROLE.STUDENT:
      nav.push(
        {
          to: `/student/${user.id}`,
          text: "Room",
          icon: <i className="pt-2 fi fi-sr-book-open-cover"></i>,
        },
        {
          to: `/student/todo-list/${user.id}`, // ! temp id = 1
          text: "Todo-List",
          icon: <i className="pt-2 fi fi-sr-journal"></i>,
        },
        {
          to: `/message/${user.id}`,
          text: "Message",
          icon: <i className="pt-2 fi fi-sr-comment-alt"></i>,
        },
        {
          to: `/student/enroll/${user.id}`,
          text: "Enroll",
          icon: <i className="pt-2 fi fi-sr-graduation-cap"></i>,
        },
        {
          to: `/settings/${user.id}`,
          text: "Settings",
          icon: <i className="pt-2 fi fi-sr-settings"></i>,
        }
      );
      break;

    case ROLE.CHAIR:
      nav.push(
        {
          to: `/chair/${user.id}`,
          text: "DashBoard",
          icon: <i className="fi fi-sr-chart-simple"></i>,
        },
        {
          to: `/chair/add-subjects/${user.id}`,
          text: "Add Subjects",
          icon: <i className="fi fi-sr-book-open-cover"></i>,
        },
        {
          to: `/chair/request-accounts/${user.id}`,
          text: "Request Accounts",
          icon: <i className="fi fi-sr-user-check"></i>,
        }
      );
    case ROLE.INSTRUCTOR:
      nav.push(
        {
          to: `/instructor/${user.id}`,
          text: "Room",
          icon: <i className="pt-2 fi fi-sr-book-open-cover"></i>,
        },
        {
          to: `/message/${user.id}`,
          text: "Message",
          icon: <i className="pt-2 fi fi-sr-comment-alt"></i>,
        },
        {
          to: `/settings/${user.id}`,
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
