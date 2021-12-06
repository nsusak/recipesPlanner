
const routes = [

  {

    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: "/users",
        name: "register",
        component: () => import('../components/Register.vue')
      },
      {
        path: "/",
        name: "Home",
        component: () => import('../components/Home.vue')
      },
      {
        path: "/recipes",
        name: "Recipes",
        component: () => import('../components/Recipes.vue')
      },
      {
        path: "/ingredients",
        name: "Ingredients",
        component: () => import('../components/Ingredients.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
