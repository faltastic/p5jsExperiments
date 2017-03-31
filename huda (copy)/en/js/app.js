Vue.use(VueRouter)
    //var headerT =  Vue.extend({
    //   template: '#headerTemplate'
    //});
var bio = {
    template: '#bioTemplate'
};
var contact = {
    template: '#contactTemplate'
};
var works = {
    template: '#worksTemplate'
    , data: function () {
            return {
            works: this.$parent.works
        }
    }
};


// Create the router
var router = new VueRouter({
    mode: 'history', 
    base: 'en',//window.location.href,
    routes: [
        {
            path: '/'
            , component: works
        }
        , {
            path: '/bio'
            , component: bio
        }
        , {
            path: '/contact'
            , component: contact
        }
    , ]
});



var pieces = {works: preWork};



var app = new Vue({
    router, data: pieces
}).$mount('#app');