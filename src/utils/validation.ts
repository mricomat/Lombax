import {
  IsNotEmpty,
  Matches,
  MinLength,
  ValidationOptions,
  ValidationArguments,
  registerDecorator,
} from "class-validator";

// import { regexPatterns } from './text';
// import { up18, tomorrow } from './time';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|^$/;
const BIRTH_DATE = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
// export const isValidPhone = (number: string, region = "ZZ") => isPhoneNumber(number, region);
// export const isValidEmail = (mail: string, options?: any) => isEmail(mail, options);

const isEqualTo = (property: string, validationOptions?: ValidationOptions) => (
  object: object,
  propertyName: string
) => {
  registerDecorator({
    propertyName,
    name: "isEqualTo",
    target: object.constructor,
    constraints: [property],
    options: validationOptions,
    validator: {
      validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];
        return typeof value === "string" && typeof relatedValue === "string" && value === relatedValue;
      },
    },
  });
};

export const IsAlphaBlank = (property?: string, validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isAlphaBlank",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === "string" && /^[a-zA-ZÀ-ÖØ-öø-ÿ]*$/.test(value.replace(/\s+/g, ""));
        },
      },
    });
  };
};

export class LogInValidation {
  @IsNotEmpty()
  @Matches(EMAIL_REGEX)
  public email: string;
  @IsNotEmpty()
  public password: string;
}

export class InfoRegisterValidation {
  @IsNotEmpty()
  @IsAlphaBlank()
  public name: string;

  @IsAlphaBlank()
  public lastName: string;

  @IsNotEmpty()
  @IsAlphaBlank()
  public username: string;

  @IsNotEmpty()
  @Matches(EMAIL_REGEX)
  public email: string;

  @IsNotEmpty()
  @Matches(BIRTH_DATE)
  public birth: string;

  @IsNotEmpty()
  @Matches(/[A-Z]/, { message: "passwordMustContainUppercase" })
  @Matches(/[a-z]/, { message: "passwordMustContainLowercase" })
  @MinLength(8, { message: "passwordTooShort" })
  public password: string;
}

// export const isValidPhone = (number: string, region = 'ZZ') => validator.isPhoneNumber(number, region);

// export class EmailValidation {
//   @IsEmail()
//   @IsNotEmpty({ message: 'isNotEmpty' })
//   public email = '';
// }

// export class CreateAccountValidation {
//   @IsEmail()
//   @IsNotEmpty({ message: 'isNotEmpty' })
//   public email = '';

//   // TODO check pass requirements

//   @Matches(/[A-Z]/, { message: 'passwordMustContainUppercase' })
//   @Matches(/[a-z]/, { message: 'passwordMustContainLowercase' })
//   @MinLength(8, { message: 'passwordTooShort' })
//   //  @Matches(/\d/, { message: 'passwordMustContainDigit' })yarn
//   @IsNotEmpty({ message: 'isNotEmpty' })
//   public password = '';
// }
