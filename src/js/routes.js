import NewsPage from '../pages/news/news.jsx';
import NewsListPage from '../pages/news/newsList.jsx';
import NewsDetailPage from '../pages/news/newsDetail';

import ShopPage from '../pages/shop/shop';
import ShopCatePage from '../pages/shop/shopCate';
import ShopListProductPage from '../pages/shop/shopListProduct';
import ShopListServicePage from '../pages/shop/shopListService';
import ShopDetailPage from '../pages/shop/shopDetail';

import MapsPage from '../pages/maps/maps';

import LoginPage from '../pages/user/login';
import RegistrationPage from '../pages/user/registration';
import ProfilePage from '../pages/user/profile';

import AboutPage from '../pages/about.jsx';
import FormPage from '../pages/form.jsx';
import HomePage from '../pages/home.jsx';


import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import NotFoundPage from '../pages/404.jsx';



var routes = [{
        path: '/',
        component: NewsPage
    },
    {
        path: '/about/',
        component: AboutPage,
    },
    {
        path: '/form/',
        component: FormPage,
    },
    {
        path: '/news/',
        component: NewsPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/news-list/',
        component: NewsListPage,
    },
    {
        path: '/news/detail/:postId/',
        component: NewsDetailPage,
    },
    {
        path: '/shop/',
        component: ShopPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/shop/:cateId',
        async(routeTo, routeFrom, resolve, reject) {
            const cateID = routeTo.params.cateId;
            if (cateID === "hot") {
                resolve({
                    component: ShopListProductPage,
                });
            } else {
                resolve({
                    component: ShopCatePage,

                });
            }
        }
    },
    {
        path: '/shop/list/:parentId/:cateId',
        async(routeTo, routeFrom, resolve, reject) {
            const cateParentID = routeTo.params.parentId;
            if (cateParentID === "795") {
                resolve({
                    component: ShopListServicePage,
                });
            } else {
                resolve({
                    component: ShopListProductPage,
                });
            }
        }
        //component: ShopListPage,
    },
    {
        path: '/shop/detail/:cateId',
        async(routeTo, routeFrom, resolve, reject) {},
        component: ShopDetailPage,
    },
    {
        path: '/maps/',
        component: MapsPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/login/',
        component: LoginPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/registration/',
        component: RegistrationPage,
        options: {
            transition: 'f7-cover-v',
        }
    },
    {
        path: '/profile/',
        component: ProfilePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: DynamicRoutePage,
    },
    {
        path: '/request-and-load/user/:userId/',
        async: function(routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = routeTo.params.userId;

            // Simulate Ajax Request
            setTimeout(function() {
                // We got user data from request
                var user = {
                    firstName: 'Vladimir',
                    lastName: 'Kharlampidi',
                    about: 'Hello, i am creator of Framework7! Hope you like it!',
                    links: [{
                            title: 'Framework7 Website',
                            url: 'http://framework7.io',
                        },
                        {
                            title: 'Framework7 Forum',
                            url: 'http://forum.framework7.io',
                        },
                    ]
                };
                // Hide Preloader
                app.preloader.hide();

                // Resolve route to load page
                resolve({
                    component: RequestAndLoad,
                }, {
                    context: {
                        user: user,
                    }
                });
            }, 1000);
        },
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;