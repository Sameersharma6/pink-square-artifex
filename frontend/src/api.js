import axios from 'axios'

export const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:8080/api'})
api.interceptors.request.use(c=>{const t=localStorage.getItem('psa_token');if(t)c.headers.Authorization=`Bearer ${t}`;return c})

export const getProducts=()=>api.get('/products')
export const getProduct=id=>api.get(`/products/${id}`)
export const searchProducts=q=>api.get('/products/search',{params:{q}})
export const login=d=>api.post('/auth/login',d)
export const register=d=>api.post('/auth/register',d)
export const me=()=>api.get('/auth/me')
export const getAdminProducts=()=>api.get('/admin/products')
export const createProduct=d=>api.post('/admin/products',d)
export const updateProduct=(id,d)=>api.put(`/admin/products/${id}`,d)
export const deleteProduct=id=>api.delete(`/admin/products/${id}`)
