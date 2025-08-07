import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from "react-spinners"
import Error from './error'
import * as Yup from 'yup'
import useFetch from '@/hooks/useFetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Login = () => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const {data, error, loading, fn:fnlogin} = useFetch(login, formData);
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if(error===null&&data){
      navigate(`/dashboard${longLink?`createNew=${longLink}`:``}`)
    }
  }, [data, error])
  

  const handleLogin = async () => {
    setErrors({})
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
      })

      await schema.validate(formData, { abortEarly: false })
      
      await fnlogin()
    } catch (e) {
      const newErrors = {}
      e?.inner?.forEach((error) => {
        newErrors[error.path] = error.message
      })
      setErrors(newErrors)
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className='space-y-1'>
            <Input name="email" type="email" placeholder="Enter email" onChange={handleInputChange} />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className='space-y-1'>
            <Input name="password" type="password" placeholder="Enter password" onChange={handleInputChange} />
            {errors.password && <Error message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {loading ? <BeatLoader size={10} /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
