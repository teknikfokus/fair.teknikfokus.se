import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import Registration from '@/views/Registration.vue'
import Job from '@/views/Job.vue'
import Companies from '@/views/Companies.vue'
import Company from '@/views/Company.vue'
import LoginDashboard from '@/views/dashboard/Login.vue'
import RegistrationDashboard from '@/views/dashboard/Registration.vue'
import CreateJob from '@/views/dashboard/job/Create.vue'
import EditJob from '@/views/dashboard/job/Edit.vue'
import IndexCompany from '@/views/dashboard/company/Index.vue'
import EditCompany from '@/views/dashboard/company/Edit.vue'
import ListJobs from '@/views/dashboard/job/List.vue/'


const routes = [
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/registration', component: Registration },
    { path: '/forgotpassword', component: ForgotPassword },
    { path: '/companies', component: Companies },
    { path: '/companies/:id', component: Company },
    { path: '/companies/:id/job/:jobId', component: Job },
    { path: '/dashboard', component: LoginDashboard },
    { path: '/dashboard/registration', component: RegistrationDashboard },
    { path: '/dashboard/company', component: IndexCompany },
    { path: '/dashboard/company/edit', component: EditCompany },
    { path: '/dashboard/company/job/create', component: CreateJob },
    { path: '/dashboard/company/job/:id/edit', component: EditJob },
    { path: '/dashboard/company/job/list/', component: ListJobs },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const allowedRoutes = [
  '/',
  '/login',
  '/registration',
  '/forgotpassword',
  '/dashboard',
  '/dashboard/registration',
]

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (!allowedRoutes.includes(to.path) && !isAuthenticated) {
    if(to.path.includes("dashboard")) {
      next("/dashboard")
    } else {
      next("/")
    }
  } else {
    next()
  }
})

export default router;