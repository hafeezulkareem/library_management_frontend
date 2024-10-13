import ModalWrapper, {
   ModalBody,
   ModalHeader,
   ModalTitle,
   ModalTransition,
} from "@atlaskit/modal-dialog";
import { FC, PropsWithChildren, useRef } from "react";

interface Props {
   title: string;
   open: boolean;
   onClose: () => void;
}

const Modal: FC<PropsWithChildren<Props>> = (props) => {
   const { title, open, onClose, children } = props;

   const focusRef = useRef<HTMLSpanElement>(null);

   return (
      <ModalTransition>
         {open && (
            <ModalWrapper autoFocus={focusRef} onClose={onClose}>
               <ModalHeader>
                  <ModalTitle>
                     <span tabIndex={-1} ref={focusRef}>
                        {title}
                     </span>
                  </ModalTitle>
               </ModalHeader>
               <ModalBody>{children}</ModalBody>
            </ModalWrapper>
         )}
      </ModalTransition>
   );
};

export default Modal;
