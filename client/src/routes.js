import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/Index.vue'
import GDPR from '@/views/GDPR.vue'
import EmailVerified from '@/views/EmailVerified.vue'
import Login from '@/views/Login.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import RecoveryPassword from '@/views/RecoveryPassword.vue'
import Registration from '@/views/Registration.vue'
import StudentProfile from '@/views/StudentProfile.vue'
import Job from '@/views/Job.vue'
import Companies from '@/views/Companies.vue'
import Company from '@/views/Company.vue'
import LoginDashboard from '@/views/dashboard/Login.vue'
import RegistrationDashboard from '@/views/dashboard/Registration.vue'
import ResetPasswordCompany from '@/views/dashboard/ResetPassword.vue'
import CreateCompany from '@/views/dashboard/company/Create.vue'
import StudentList from '@/views/dashboard/StudentList.vue'
import EditCompanyImage from '@/views/dashboard/company/Image.vue'
import CreateJob from '@/views/dashboard/job/Create.vue'
import EditJob from '@/views/dashboard/job/Edit.vue'
import IndexCompany from '@/views/dashboard/company/Index.vue'
import EditCompany from '@/views/dashboard/company/Edit.vue'
import ListJobs from '@/views/dashboard/job/List.vue/'
    

const routes = [
    { path: '/', component: Index },
    { path: '/integritetspolicy', component: GDPR },
    { path: '/login', component: Login },
    { path: '/registration', component: Registration },
    { path: '/forgotpassword', component: ForgotPassword },
    { path: '/recovery/:id', component: RecoveryPassword },
    { path: '/verify/:token', component: EmailVerified },
    { path: '/student/profile', component: StudentProfile },
    { path: '/companies', component: Companies },
    { path: '/companies/:id', component: Company },
    { path: '/companies/:id/job/:jobId', component: Job },
    { path: '/dashboard', component: LoginDashboard },
    { path: '/dashboard/registration', component: RegistrationDashboard },
    { path: '/dashboard/resetpassword', component: ResetPasswordCompany },
    { path: '/dashboard/company', component: IndexCompany },
    { path: '/dashboard/students', component: StudentList },
    { path: '/dashboard/company/create', component: CreateCompany },
    { path: '/dashboard/company/image', component: EditCompanyImage },
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
  '/verify',
  '/dashboard',
  '/dashboard/registration',
]

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  const isCompany = localStorage.getItem('company_slug');
  if(to.path == "/dashboard" && isAuthenticated) {
    if(isCompany) {
      next("/dashboard/company");
    } else {
      next("/companies");
    }
  } else if(to.path == "/login" && isAuthenticated) {
    next("/companies");
  } else if(to.path.includes("dashboard") 
    && to.path !== "/dashboard/company/create"
    && isCompany == "0") {
    next("/dashboard/company/create")
  } else {
    next()
  }
})

export default router;