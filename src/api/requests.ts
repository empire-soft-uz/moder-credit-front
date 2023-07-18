import axios from 'axios';
import { Client, Credit, Expense, Payment, Product, User } from "../types";

// const REMOTE_URL = "";
const LOCAL_URL = "http://localhost:8080/api"

const axiosInstance = axios.create({
  baseURL: LOCAL_URL,
  url: LOCAL_URL,
});

export const REQUESTS = {
  client: {
    add: (data: Partial<Client>) => axiosInstance.post("/clients", data),
    get: (params?: any) => axiosInstance.get("/clients", { params }),
    getById: (id: number) => axiosInstance.get(`/clients/${id}`),
    delete: (id: number) => axiosInstance.delete(`/clients/${id}`),
    edit: (data: Partial<Client>) => axiosInstance.put(`/clients/${data.id}`, data)
  },
  credit: {
    add: (data: Partial<Credit>) => axiosInstance.post("/credits", data),
    get: (params?: any) => axiosInstance.get("/credits", { params }),
    getById: (id: number) => axiosInstance.get(`/credits/${id}`,),
    delete: (id: number) => axiosInstance.delete(`/credits/${id}`),
    edit: (data: Partial<Credit>) => axiosInstance.put(`/credits/${data.id}`, data)
  },

  user: {
    add: (data: Partial<User>) => axiosInstance.post("/auth/users", data),
    get: () => axiosInstance.get("/auth/users"),
    getById: (id: number) => axiosInstance.get(`/auth/users/${id}`),
    // delete: (id: string) => axiosInstance.delete(`/auth/users/${id}`),
    // edit: (data: Partial<User>) => axiosInstance.put(`auth/users/${data._id}`, data)
  },
  product: {
    add: (data: Partial<Product>) => axiosInstance.post("/products", data),
    get: (params?: any) => axiosInstance.get("/products", { params }),
    getById: (id: number) => axiosInstance.get(`/products/${id}`),
    delete: (id: string) => axiosInstance.delete(`/products/${id}`),
    edit: (data: Partial<Product>) => axiosInstance.put(`products/${data.id}`, data)
  },
  payment: {
    add: (data: Partial<Payment>) => axiosInstance.post("/payments", data),
    get: (params?: any) => axiosInstance.get("/payments", { params }),
    getById: (id: number) => axiosInstance.get(`/payments/${id}`),
    delete: (id: string) => axiosInstance.delete(`/payments/${id}`),
    edit: (data: Partial<Payment>) => axiosInstance.put(`payments/${data.id}`, data)
  },
  expense: {
    add: (data: Partial<Expense>) => axiosInstance.post("/main/expenses", data),
    get: () => axiosInstance.get("/main/expenses"),
    delete: (id: number) => axiosInstance.delete(`/main/expenses/${id}`),
    edit: (data: Partial<Expense>) => axiosInstance.put(`/main/expenses/${data.id}`, data)
  },
  main: {
    get: (params?: any) => axiosInstance.get("/main", { params }),
    getPayments: (params?: any) => axiosInstance.get("/main/payments", { params })
  }
};