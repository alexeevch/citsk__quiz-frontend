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
        label: "Викторины",
        items: [
          {
            key: "quiz",
            label: "Викторины",
            icon: "pi pi-list-check",
            children: [
              {
                key: "quiz-list",
                label: "Список викторин",
                icon: "pi pi-list",
                to: "/quiz"
              },
              {
                key: "quiz-create",
                label: "Создать викторину",
                icon: "pi pi-plus",
                to: "/quiz/create"
              }
            ]
          },
          {
            key: "question",
            label: "Вопросы",
            icon: "pi pi-question-circle",
            children: [
              {
                key: "question-list",
                label: "Список вопросов",
                icon: "pi pi-list",
                to: "/questions"
              },
              {
                key: "question-create",
                label: "Создать вопрос",
                icon: "pi pi-plus",
                to: "/questions/create"
              }
            ]
          },
          {
            key: "answer",
            label: "Ответы",
            icon: "pi pi-check-circle",
            children: [
              {
                key: "answer-list",
                label: "Список ответов",
                icon: "pi pi-list",
                to: "/answers"
              },
              {
                key: "answer-create",
                label: "Создать ответ",
                icon: "pi pi-plus",
                to: "/answers/create"
              }
            ]
          }
        ]
      },
      {
        label: "Результаты",
        items: [
          {
            key: "userresult",
            label: "Результаты викторин",
            icon: "pi pi-chart-bar",
            children: [
              {
                key: "userresult-list",
                label: "Все результаты",
                icon: "pi pi-list",
                to: "/results"
              }
            ]
          },
          {
            key: "useranswer",
            label: "Ответы пользователей",
            icon: "pi pi-comments",
            children: [
              {
                key: "useranswer-list",
                label: "Все ответы",
                icon: "pi pi-list",
                to: "/user-answers"
              }
            ]
          }
        ]
      },
      {
        label: "Администрирование",
        items: [
          {
            key: "customuser",
            label: "Пользователи",
            icon: "pi pi-users",
            children: [
              {
                key: "customuser-list",
                label: "Список пользователей",
                icon: "pi pi-list",
                to: "/users"
              },
              {
                key: "customuser-create",
                label: "Создать пользователя",
                icon: "pi pi-user-plus",
                to: "/users/create"
              }
            ]
          },
          {
            key: "organization",
            label: "Организации",
            icon: "pi pi-building",
            children: [
              {
                key: "organization-list",
                label: "Список организаций",
                icon: "pi pi-list",
                to: "/organizations"
              },
              {
                key: "organization-create",
                label: "Создать организацию",
                icon: "pi pi-plus",
                to: "/organizations/create"
              }
            ]
          }
        ]
      }
    ]
  },

  auth: {
    tokens: {
      accessExpiresAt: 60 * 60 * 0.5,
      refreshExpiresAt: 60 * 60 * 24 * 7
    }
  }
});
