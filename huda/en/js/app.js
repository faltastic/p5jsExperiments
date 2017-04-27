Vue.use(VueRouter)

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
    base: 'p5jsExperiments/huda/en',//window.location.href,
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
// at pieces.js



var app = new Vue({
    router, data: pieces
}).$mount('#app');
