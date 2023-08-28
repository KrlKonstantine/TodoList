import { useForm } from 'react-hook-form'

import { Button } from '@/components'
import { CardsInput } from '@/components/ui/input'

type FormValues = {
  email: string
  password: string
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardsInput value={' '} {...register('email')} label={'email'} />
      <CardsInput value={' '} {...register('password')} label={'password'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
