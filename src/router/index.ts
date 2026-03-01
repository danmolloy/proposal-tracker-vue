import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/components/Index.vue' 
import LoginView from '@/components/Login.vue'
import RegisterView from '@/components/Register.vue'
import CreateView from '@/components/proposals/Create.vue'
import EditView from '@/components/proposals/Edit.vue'
import DetailView from '@/components/proposals/Detail.vue'
import ReviewView from '@/components/proposals/Review.vue'

const routes = [
  
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: DetailView
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditView
  },
  {
    path: '/review/:id',
    name: 'review',
    component: ReviewView
  },
  {
    path: '/',
    name: 'index',
    component: IndexView,
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(), 
  routes
})

export default router