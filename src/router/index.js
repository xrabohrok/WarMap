import Vue from "vue"
import VueRouter from "vue-router"
import MainPage from "../views/MainPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Map",
    component: MainPage
  },
  {
    path: "/chars",
    name: "Chars",
    component: () => import("../views/CharacterEditor.vue")
  },
  {
    path: "/pics",
    name: "Pics",
    component: () => import("../views/PicZoomer.vue")
  },
  {
    path: "/final",
    name: "Final",
    component: () => import("../views/RoundNine.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
