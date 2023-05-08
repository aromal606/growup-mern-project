import axious from 'axios'
const API=axious.create({baseURL:"http://localhost:4000"})
export const signIn=(formValues)=>API.post("users/signin",formValues)