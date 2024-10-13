import { useFlags } from "@atlaskit/flag";
import ErrorIcon from "@atlaskit/icon/glyph/error";

export const useFlagMethods = () => {
   const { showFlag } = useFlags();

   const showErrorFlag = (content: string) => {
      showFlag({
         title: content,
         icon: (
            <ErrorIcon
               label="Error"
               secondaryColor="color.background.danger.bold"
            />
         ),
         isAutoDismiss: true,
         appearance: "error",
      });
   };

   return { showErrorFlag };
};
