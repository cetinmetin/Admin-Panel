import React from 'react'

const HomePage = React.lazy(() => import('./pages/HomePage/Dashboard'))
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginScreen'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage/RegisterScreen'))
const ProductPage = React.lazy(() => import('./pages/ProductPage/ProductScreen'))
const CompanyPage = React.lazy(() => import('./pages/CompanyPage/CompanyScreen'))
const NotFound = React.lazy(() => import('./components/NotFound'))
const routes = [
    { path: '/', exact: true, name: 'Login', component: LoginPage },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: HomePage },
    { path: '/login', exact: true, name: 'Login', component: LoginPage },
    { path: '/register', exact: true, name: 'Register', component: RegisterPage },
    { path: '/product', exact: true, name: 'Product', component: ProductPage },
    { path: '/company', exact: true, name: 'Company', component: CompanyPage },
    { path: '', exact: true, name: 'NotFound', component: NotFound }
]

export default routes