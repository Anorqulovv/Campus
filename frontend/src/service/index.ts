import toast from "react-hot-toast"
import { instance } from "../hooks"
import { PATH } from "../components"
import type { IData } from "../pages/Auth/Register"
import type { NavigateFunction } from "react-router-dom"
import type { Dispatch, SetStateAction } from "react"

export const RegisterFn = (data:IData,navigate: NavigateFunction,setLoading: Dispatch<SetStateAction<boolean>>) => {
    instance().post("/auth/signup", data).then(() => {
      toast.success(`Succes ${data.fullName}`)
      setTimeout(()=> navigate(PATH.home), 1000)
    }).finally(() => setLoading(false))
} 