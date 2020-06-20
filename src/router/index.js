import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Proflie = () => import("views/proflie/Proflie")
const Detail = () => import("views/detail/Detail")
Vue.use(VueRouter)

const routes = [
  {
    path:"",
    redirect:"/home"
  },
  {
    path:"/home",
    component:Home
  },
  {
    path:"/category",
    component:Category
  },
  {
    path:"/cart",
    component:Cart
  },
  {
    path:"/proflie",
    component:Proflie
  },
  {
    path:"/detail/:iid",
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
