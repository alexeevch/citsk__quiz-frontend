export default defineAppConfig({
  menu: {
    sidebarMenu: [
      {
        label: "Главная",
        items: [
          {
            key: "home",
            label: "Дашборд",
            icon: "pi pi-home",
            to: "/"
          }
        ]
      },
      {
        label: "Администрирование",
        meta: {
          adminOnly: true
        },
        items: [
          {
            key: "admin-users",
            icon: "pi pi-users",
            label: "Пользователи",
            to: "/admin/users",
            disabled: true
          },
          {
            key: "admin-organizations",
            icon: "pi pi-building",
            label: "Организации",
            to: "/admin/organizations"
          }
        ]
      },
      {
        label: "Викторины",
        items: [
          {
            key: "quiz",
            label: "Викторины",
            icon: "pi pi-list-check",
            to: "/quiz",
            meta: {
              permissions: ["api.view_quiz"]
            }
          },
          {
            key: "quiz-stat",
            label: "Статистика",
            icon: "pi pi-chart-bar",
            to: "/quiz/stat",
            disabled: true
          },
          {
            key: "quiz-answers",
            label: "Ответы пользователей",
            icon: "pi pi-comments",
            to: "/quiz/user-answers",
            disabled: true
          },
          {
            key: "quiz-winners",
            label: "Победители",
            icon: "pi pi-trophy",
            to: "/quiz/winners",
            disabled: true
          }
        ]
      }
    ]
  }
});
