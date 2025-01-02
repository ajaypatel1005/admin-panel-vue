// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '',
    component: () => import('../layouts/auth-layout/auth-layout.vue'),
    children: [
      {
        path: '',
        name: '/login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '../views/auth/login/login.vue'),
        meta: {
          page_title: 'Login'
        }
      },
      {
        path: '/forgot-password', name: 'forgot-password',
        component: () => import('../views/auth/forgot-password/forgot-password.vue'),
        meta: {
          page_title: 'Forgot Password'
        }
      },
      
      {
        path: '/reset-password/:reset_token', name: 'reset-password',
        component: () => import('../views/auth/reset-password/reset-password.vue'),
        meta: {
          page_title: 'Reset Password'
        }
      },
    ],
  },
 
  {
    path: '/',
    component: () => import('../layouts/admin-layout/admin-layout.vue'),
    children: [
      {
        path: '/dashboard', name: 'dashboard', component: () => import('../views/dashboard/dashboard.vue'),
        meta: {
          breadcrumb: [
            { title: 'Home', to: '/dashboard' },
            { title: 'Dashboard', disabled: true }
          ],
          page_title: 'Dashboard'
        }
      },
      {
        path: '/profile', name: 'profile', component: () => import('../views/auth/profile/profile.vue'),
        meta: {
          breadcrumb: [
            { title: 'Home', to: '/dashboard' },
            { title: 'Profile', disabled: true },
          ],
          page_title: 'Profile'
        }
      },
      {
        path: '/change-password', name: 'change-passowrd', component: () => import('../views/auth/change-password/change-password.vue'),
        meta: {
          breadcrumb: [
            { title: 'Home', to: '/dashboard' },
            { title: 'Change Password', disabled: true },
          ],
          page_title: 'Change Password'
        }
      },
      //--------User Type
      {
        path: '/to-do', name: 'to-do', component: () => import('../views/todo/manage-todo/manage-todo.vue'),
        meta: {
          breadcrumb: [
            { title: 'Home', to: '/dashboard' },
            { title: 'To Do List', disabled: true },
          ],
          page_title: 'To Do List'
        }
      },

      {
        path: '/tags', name: 'tags', component: () => import('../views/tags/manage-tags/manage-tags.vue'),
        meta: {
          breadcrumb: [
            { title: 'Home', to: '/dashboard' },
            { title: 'Tags', disabled: true },
          ],
          page_title: 'Tags'
        }
      },
     
      {
        path: '/:catchAll(.*)*',
        component: () => import('../views/page-not-found/page-not-found.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   document.title = to.meta.page_title;
//   next();
// });

export default router