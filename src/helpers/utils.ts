import axios from "axios";
import { format } from "date-fns";

export const getFormattedDate = (date: string) => {
   return format(date, "dd-MM-yyyy");
};

export const getAxiosError = (error: unknown, fallbackErrorMsg: string) => {
   let errorMessage = fallbackErrorMsg;
   if (axios.isAxiosError(error)) {
      const errorData = error.response?.data ?? {};
      if (errorData.message) errorMessage = errorData.message;
   }
   return errorMessage;
};
