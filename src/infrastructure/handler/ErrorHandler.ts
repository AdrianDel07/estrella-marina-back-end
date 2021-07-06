import { HttpException } from '@nestjs/common';

export const ErrorHandler = (errorCode: number, message: string) => {
  throw new HttpException(
    {
      status: errorCode,
      error: message,
    },
    errorCode,
  );
};
