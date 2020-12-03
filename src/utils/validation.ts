import { isEmail, isPhoneNumber } from 'class-validator';

// import { regexPatterns } from './text';
// import { up18, tomorrow } from './time';

/* eslint max-classes-per-file: 0 */

export const isValidPhone = (number: string, region = 'ZZ') => isPhoneNumber(number, region);
export const isValidEmail = (mail: string, options?: any) => isEmail(mail, options);

// export const isValidPhone = (number: string, region = 'ZZ') => validator.isPhoneNumber(number, region);

// const isEqualTo = (property: string, validationOptions?: ValidationOptions) => (
//   object: object,
//   propertyName: string
// ) => {
//   registerDecorator({
//     propertyName,
//     name: 'isEqualTo',
//     target: object.constructor,
//     constraints: [property],
//     options: validationOptions,
//     validator: {
//       validate(value: any, args: ValidationArguments) {
//         const [relatedPropertyName] = args.constraints;
//         const relatedValue = args.object[relatedPropertyName];
//         return typeof value === 'string' && typeof relatedValue === 'string' && value === relatedValue;
//       },
//     },
//   });
// };

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
