let mvc = new Mvc();

let routeList = [{
    url: "/home",
    template: "pages/homepage/home.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/homepage/js/home.js"
},
{
    url: "/addnews",
    template: "pages/addnewspage/addnewpage.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/addnewspage/js/index.js"


},
{
    url: "/mynews",
    template: "pages/mynews/mynews.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/mynews/js/index.js"


},

{
    url: "/newsapprove",
    template: "pages/newsapprove/newsapprove.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/newsapprove/js/index.js"

},
{
    url: "/allnews",
    template: "pages/allnews/allnews.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/allnews/js/index.js"

},
{
    url: "/adduser",
    template: "pages/newuser/newuser.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/newuser/js/index.js"

},
{
    url: "/categories",
    template: "pages/categories/categories.html",
    title: "شبكة الوحدة الإخبارية",
    controller: "/adminpanel/pages/categories/js/index.js"
},
{
    url :"/allusers",
    template: "pages/allusers/allusers.html",
    title: "شبكة الوحدة الإخبارية",
    controller : "/adminpanel/pages/allusers/js/users.js"
},
{
    url : "/newuser/:id",
    templete : "pages/newuser/updateuser.html",
    title :  "شبكة الوحدة الإخبارية",
    controller:"/adminpanel/pages/newuser/js/updateController.js"
}
];

mvc.addRouteList(routeList);
mvc.init();