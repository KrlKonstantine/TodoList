import { useForm } from 'react-hook-form'

import { Button } from '@/components'
import {Checkbox} from "@/components/ui/checkbox";
import { CardsInput } from '@/components/ui/input'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form style={{ height: '500px', border: '1px solid green' }} onSubmit={handleSubmit(onSubmit)}>
      <CardsInput value={' '} {...register('email')} label={'email'} />
      <CardsInput value={' '} {...register('password')} label={'password'} />
      <Checkbox {...register('rememberMe')} label={'remember me'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
