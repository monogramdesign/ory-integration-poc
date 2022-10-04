import {
  SelfServiceLoginFlow,
  SelfServiceRegistrationFlow,
  SelfServiceSettingsFlow,
  SelfServiceVerificationFlow,
  SelfServiceRecoveryFlow,
  UiNode,
} from "@ory/client";
import { useForm } from "react-hook-form";

type Props<T> = {
  onSubmit: (values: T) => Promise<void>;
  buttonTitle: string;
  flow?:
    | SelfServiceLoginFlow
    | SelfServiceRegistrationFlow
    | SelfServiceSettingsFlow
    | SelfServiceVerificationFlow
    | SelfServiceRecoveryFlow;
};

const Form = (props: Props<any>) => {
  const { register, handleSubmit } = useForm();

  console.log("flow", props.flow);
  return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="flex flex-col">
      {props.flow?.ui.nodes.map((node: any) => {
        if (node.type === "input") {
          switch (node.attributes.type) {
            case "hidden":
              // Render a hidden input field
              return (
                <input
                  className="invisible"
                  value={node.attributes.value}
                  {...register(node.attributes.name)}
                />
              );
            case "text":
              // Render a hidden input field
              if (node.attributes.name === "traits.name.first") {
                return (
                  <div className="flex flex-col">
                    <label>First Name:</label>
                    <input
                      {...register(node.attributes.name)}
                      type="text"
                      required
                    />
                  </div>
                );
              } else if (node.attributes.name === "traits.name.last") {
                return (
                  <div className="flex flex-col">
                    <label>Last Name:</label>
                    <input
                      {...register(node.attributes.name)}
                      type="text"
                      required
                    />
                  </div>
                );
              } else {
                return (
                  <div className="flex flex-col">
                    <label>Email:</label>
                    <input
                      {...register(node.attributes.name)}
                      type="email"
                      required
                    />
                  </div>
                );
              }

            case "email":
              // Render a hidden input field
              return (
                <div className="flex flex-col">
                  <label>Email:</label>
                  <input
                    {...register(node.attributes.name)}
                    type="email"
                    required
                  />
                </div>
              );
            case "password":
              // Render a hidden input field
              return (
                <div className="flex flex-col">
                  <label>Password:</label>
                  <input
                    {...register(node.attributes.name)}
                    type="password"
                    required
                  />
                </div>
              );
            case "submit":
              // Render the submit button
              return (
                <input
                  type="submit"
                  value={node.attributes.value}
                  {...register(node.attributes.name)}
                  className="order-2 p-3 rounded-md bg-pink-500 text-white text-base"
                />
              );
          }
        }
      })}
    </form>
  );
};

export default Form;
