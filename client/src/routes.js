import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue'
import Registration from './components/Registration.vue'
import Job from './components/Job.vue'
import Companies from './components/Companies.vue'
import Company from './components/Company.vue'
import LoginDashboard from './components/dashboard/Login.vue'
import RegistrationDashboard from './components/dashboard/Registration.vue'
import CreateJob from './components/dashboard/job/Create.vue'
import EditJob from './components/dashboard/job/Edit.vue'
import IndexCompany from './components/dashboard/company/Index.vue'
import EditCompany from './components/dashboard/company/Edit.vue'


const routes = [
    { path: '/', component: Login },
    { path: '/registration', component: Registration },
    { path: '/companies', component: Companies },
    { path: '/companies/:id', component: Company },
    { path: '/companies/:id/job/:jobId', component: Job },
    { path: '/dashboard', component: LoginDashboard },
    { path: '/dashboard/registration', component: RegistrationDashboard },
    { path: '/dashboard/company', component: IndexCompany },
    { path: '/dashboard/company/edit', component: EditCompany },
    { path: '/dashboard/company/job/create', component: CreateJob },
    { path: '/dashboard/company/job/:id/edit', component: EditJob },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;