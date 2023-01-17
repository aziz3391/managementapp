import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import StaffInfo from '@/components/StaffInfo'
import MapsVue from '@/components/MapsVue'
import LogOut from '@/components/LogOut'
import HelpVue from '@/components/HelpVue'
import StaffDepartment from '@/components/inner/StaffDepartment'

const routes = [{
    path: '/home',
    component: HomePage,

},
{
    path: '/about',
    component: AboutPage
},
{
    path: '/staff',
    component: StaffInfo
}, {
    path: '/maps',
    component: MapsVue
},
{
    path: '/logout',
    component: LogOut
},
{
    path: '/help',
    component: HelpVue
},
{
    path: '/home/:id',
    component: StaffDepartment
}



]


const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router 