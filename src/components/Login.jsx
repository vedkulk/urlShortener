import React, { useState } from 'react'
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

  const handleLogin = async () => {
    setErrors({})
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
      })

      await schema.validate(formData, { abortEarly: false })
      // ✅ Handle successful login here
      console.log("Login success!")
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
            {false ? <BeatLoader size={10} /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
