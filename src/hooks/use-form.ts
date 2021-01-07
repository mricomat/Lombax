import { useRef, useReducer, useState } from "react";

import { validate } from "class-validator";
import { getLangFile } from "src/utils/text";
import { langType } from "src/utils/types";

export const useForm = <IValues>(
  initialValues: IValues,
  ValidationObjectParam?: object,
  onSubmit?: (formValues: IValues) => void,
  lang?: langType
) => {
  type IBoolValues = { [key in keyof IValues]: boolean };
  type IStriValues = { [key in keyof IValues]: string };

  const updateFormReducer = (state: IValues, newState: Partial<IValues>) => ({ ...state, ...newState });
  const updateFormBooleanReducer = (state: IBoolValues, newState: Partial<IBoolValues>) => ({ ...state, ...newState });
  const updateFormMessageReducer = (state: IStriValues, newState: Partial<IStriValues>) => ({ ...state, ...newState });
  // TODO change to useTranslation
  const langFile = getLangFile(lang);

  // TODO add extra param for global error, like generalError or whatever
  const fillObject = (obj: IValues, value: "" | boolean) => {
    const newObject: any = {};
    Object.keys(obj).forEach(k => (newObject[k] = value));
    return newObject;
  };

  const defaultErrors: IBoolValues = fillObject(initialValues, false);
  const errorsTrue: IBoolValues = fillObject(initialValues, true);
  const defaultMessages: IStriValues = fillObject(initialValues, "");

  const ValidationObject = useRef(ValidationObjectParam).current;

  const [isChecking, setIsChecking] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  // const isChecking = useRef(false);
  const isGeneralError = useRef(false);
  const [values, setStateForm] = useReducer(updateFormReducer, initialValues);
  const [errors, setErrors] = useReducer(updateFormBooleanReducer, defaultErrors);
  const [messages, setMessages] = useReducer(updateFormMessageReducer, defaultMessages);

  const updateForm = (newForm: Partial<IValues>) => {
    setStateForm(newForm);
    if (ValidationObject) Object.keys(newForm).forEach(key => (ValidationObject[key] = newForm[key]));
  };

  const checkForm = async (key?: string | string[]) => {
    if (!ValidationObject) return true;
    // TODO ValidationObject not working properly
    // @ts-ignore TODO This expression is not constructable. Type '{}' has no construct signatures
    const Form = new ValidationObject();
    Object.entries(values).forEach(([k, val]) => {
      // @ts-ignore // TODO
      Form[k] = typeof val === "object" ? val?.value : val;
    });
    const validation = await validate(Form);
    let valid = true;
    const newErrors = isGeneralError.current || !key ? defaultErrors : { ...errors };
    const newMessages = isGeneralError.current || !key ? defaultMessages : { ...messages };

    if (isGeneralError.current) isGeneralError.current = false;
    const setMessage = ({ property, constraints }) => {
      const messageKey = Object.keys(constraints)[0];
      newErrors[property] = true;
      newMessages[property] =
        langFile[messageKey] || langFile[messageKey.charAt(0).toUpperCase() + messageKey.slice(1)] || messageKey;
      valid = false;
    };

    if (!key) {
      // validate ALL
      validation.forEach(errorItem => setMessage(errorItem));
    } else {
      if (typeof key === "string") {
        // validate ONE key
        const errorItem = validation.find(i => i.property === key);
        if (errorItem) setMessage(errorItem);
      } else {
        // validate MULTIPLE keys
        validation.forEach(errorItem => {
          if (key.findIndex(i => i === errorItem.property)) setMessage(errorItem);
        });
      }
    }

    setErrors(newErrors);
    setMessages(newMessages);
    if (!valid) setIsChecking(false);

    return valid;
  };

  const toogleErrorsForm = (
    infoData?: string | { newMessages?: Partial<IValues>; newErrors?: any },
    isGeneral = false
  ) => {
    if (infoData) {
      if (typeof infoData === "string") {
        if (isGeneral) {
          isGeneralError.current = true;
          setMessages({ [Object.keys(messages)[0]]: infoData } as Partial<IStriValues>);
          setErrors(errorsTrue);
        } else {
          setMessages({ [infoData]: "" } as Partial<IStriValues>);
          setErrors({ [infoData]: false } as Partial<IBoolValues>);
        }
      } else {
        const { newMessages, newErrors } = infoData;
        if (newMessages) setMessages(newMessages as Partial<IStriValues>);
        if (newErrors) setErrors(newErrors);
      }
    } else {
      setMessages(defaultMessages);
      setErrors(defaultErrors);
    }
  };

  const onSubmitForm = async () => {
    if (isSubmiting) return;
    setIsSubmiting(true);
    if ((await checkForm()) && onSubmit) onSubmit(values);
    setIsSubmiting(false);
  };

  return {
    values, // current input values
    errors, // inputs error
    messages, // inputs message
    setErrors,
    setMessages,
    updateForm, // === setState
    checkForm, // apply validator to all, one or some keys, false if no validator passde
    toogleErrorsForm, // manually aply style
    onSubmitForm, // apply validation if has one and call submit
    isChecking: isSubmiting || isChecking, // if it's checking loader purspose
  };
};
