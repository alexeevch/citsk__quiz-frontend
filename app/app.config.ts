import { Permissions } from "~/types/api/auth/persmissions";

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
            permission: Permissions.Quiz.View,
            children: [
              {
                key: "quiz-list",
                label: "Список викторин",
                icon: "pi pi-list",
                to: "/quiz",
                permission: Permissions.Quiz.View
              },
              {
                key: "quiz-create",
                label: "Создать викторину",
                icon: "pi pi-plus",
                to: "/quiz/create",
                permission: Permissions.Quiz.Add
              }
            ]
          },
          {
            key: "question",
            label: "Вопросы",
            icon: "pi pi-question-circle",
            permission: Permissions.Question.View,
            children: [
              {
                key: "question-list",
                label: "Список вопросов",
                icon: "pi pi-list",
                to: "/questions",
                permission: Permissions.Question.View
              },
              {
                key: "question-create",
                label: "Создать вопрос",
                icon: "pi pi-plus",
                to: "/questions/create",
                permission: Permissions.Question.Add
              }
            ]
          },
          {
            key: "answer",
            label: "Ответы",
            icon: "pi pi-check-circle",
            permission: Permissions.Answer.View,
            children: [
              {
                key: "answer-list",
                label: "Список ответов",
                icon: "pi pi-list",
                to: "/answers",
                permission: Permissions.Answer.View
              },
              {
                key: "answer-create",
                label: "Создать ответ",
                icon: "pi pi-plus",
                to: "/answers/create",
                permission: Permissions.Answer.Add
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
            permission: Permissions.UserResult.View,
            children: [
              {
                key: "userresult-list",
                label: "Все результаты",
                icon: "pi pi-list",
                to: "/results",
                permission: Permissions.UserResult.View
              }
            ]
          },
          {
            key: "useranswer",
            label: "Ответы пользователей",
            icon: "pi pi-comments",
            permission: Permissions.UserAnswer.View,
            children: [
              {
                key: "useranswer-list",
                label: "Все ответы",
                icon: "pi pi-list",
                to: "/user-answers",
                permission: Permissions.UserAnswer.View
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
            permission: Permissions.CustomUser.View,
            children: [
              {
                key: "customuser-list",
                label: "Список пользователей",
                icon: "pi pi-list",
                to: "/users",
                permission: Permissions.CustomUser.View
              },
              {
                key: "customuser-create",
                label: "Создать пользователя",
                icon: "pi pi-user-plus",
                to: "/users/create",
                permission: Permissions.CustomUser.Add
              }
            ]
          },
          {
            key: "organization",
            label: "Организации",
            icon: "pi pi-building",
            permission: Permissions.Organization.View,
            children: [
              {
                key: "organization-list",
                label: "Список организаций",
                icon: "pi pi-list",
                to: "/organizations",
                permission: Permissions.Organization.View
              },
              {
                key: "organization-create",
                label: "Создать организацию",
                icon: "pi pi-plus",
                to: "/organizations/create",
                permission: Permissions.Organization.Add
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
