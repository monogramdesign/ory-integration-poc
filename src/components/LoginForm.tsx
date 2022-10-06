import {
  SelfServiceLoginFlow,
  SelfServiceRegistrationFlow,
  SelfServiceSettingsFlow,
  SelfServiceVerificationFlow,
  SelfServiceRecoveryFlow
} from '@ory/client'
import { useForm } from 'react-hook-form'

type Props<T> = {
  onSubmit: (values: T) => Promise<void>
  buttonTitle: string
  flow?:
    | SelfServiceLoginFlow
    | SelfServiceRegistrationFlow
    | SelfServiceSettingsFlow
    | SelfServiceVerificationFlow
    | SelfServiceRecoveryFlow
}

const LoginForm = (props: Props<any>) => {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="flex flex-col">
      {props.flow?.ui.nodes.map((node: any) => {
        if (node.type === 'input') {
          switch (node.attributes.type) {
            case 'hidden':
              // Render a hidden input field
              return (
                <input
                  className="invisible"
                  value={node.attributes.value}
                  {...register(node.attributes.name)}
                />
              )
            case 'text':
              // Render a First Name and Last Name input field
              return (
                <div className="flex flex-col">
                  <label>{node.meta.label.text}:</label>
                  <input {...register(node.attributes.name)} type="text" required />
                </div>
              )

            case 'email':
              // Render a email input field
              return (
                <div className="flex flex-col">
                  <label>Email:</label>
                  <input {...register(node.attributes.name)} type="email" required />
                </div>
              )
            case 'password':
              // Render a password input field
              return (
                <div className="flex flex-col">
                  <label>Password:</label>
                  <input {...register(node.attributes.name)} type="password" required />
                </div>
              )
            case 'submit':
              // Render the submit button
              return (
                <button value={node.attributes.value} {...register(node.attributes.name)}>
                  {node.attributes.value === 'google' ? 'Google' : props.buttonTitle}
                </button>
              )
          }
        }
      })}
    </form>
  )
}

export default LoginForm
