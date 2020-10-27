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
import DetailProfilePage from '../pages/user/DetailProfile';
import CardServicePage from '../pages/user/cardService'; //Thẻ dịch vụ
import SchedulePage from '../pages/user/schedule'; //Đặt lịch
import BarCodePage from '../pages/user/barcode';
import EditEmailPage from '../pages/user/editEmail';
import EditPasswordPage from '../pages/user/editPassword';

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
        path: '/detail-profile/',
        component: DetailProfilePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/edit-email/',
        component: EditEmailPage
    },
    {
        path: '/edit-password/',
        component: EditPasswordPage
    },
    {
        path: '/cardservice/', // Thẻ dịch vụ
        component: CardServicePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/schedule/', // Thẻ dịch vụ
        component: SchedulePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/barcode/', // Check In
        component: BarCodePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;