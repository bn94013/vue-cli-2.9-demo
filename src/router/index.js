import Vue from 'vue';
import VueRouter from 'vue-router';

// import HelloWorld from '@/components/HelloWorld';
import dashboard from '@/components/dashboard';
import login from '@/components/pages/login';
import products from '@/components/pages/products';



import index from '@/components/master/index';
import indexheader from '@/components/master/indexheader';
import indexmain from '@/components/master/indexmain';
import indexbox from '@/components/master/indexbox';

Vue.use(VueRouter);

export default new VueRouter({
routes:[{
    path:'*',                   
    redirect:'login',       //避免用戶隨便亂打頁尾
    },  
    // {
    //     path:'/123',
    //     name:'HelloWorld',
    //     component:HelloWorld,
    //     meta: { requiresAuth: true },
    // },
    {
        path:'/login',
        name:'login',
        component:login,
        
    },

    {
        path:'/admin',
        name:'dashboard',
        component:dashboard,     
        children:[
            {
                path:'products',
                name:'products',
                component:products,
                meta: { requiresAuth: true },  
            }
        ] 
    },




 

    {
        path:'/',      //前端頁面網址位置
        name:'index',
        component:index,
        children:[
            {
                path:'indexheader',
                name:'indexheader',
                component:indexheader,
            },
            {
                path:'indexmain',
                name:'indexmain',
                component:indexmain,
            },
            {
                path:'indexbox',
                name:'indexbox',
                component:indexbox,
            }
        ] 
    },


],
});