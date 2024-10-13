import { AxiosResponse } from "axios";
import { useState } from "react";

export function useFetchData<T>(
   fetchAPI: (query: string) => Promise<AxiosResponse<T[]>>
) {
   const [data, setData] = useState<T[]>([]);

   const fetchData = async (query: string = "") => {
      try {
         const response = await fetchAPI(query);
         if (response.status !== 200)
            throw new Error("Error while fetching books");
         setData(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   return { data, fetchData };
}
