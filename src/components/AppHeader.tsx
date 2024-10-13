import { Box, xcss } from "@atlaskit/primitives";
import Textfield from "@atlaskit/textfield";
import { ChangeEvent, FC, useState } from "react";
import SearchIcon from "@atlaskit/icon/glyph/search";
import { ButtonAction } from "../helpers/types";
import Button from "@atlaskit/button/new";

interface Props {
   onSearch: (searchText: string) => void;
   actions?: ButtonAction[];
}

const AppHeader: FC<Props> = (props) => {
   const { onSearch, actions = [] } = props;

   const [searchText, setSearchText] = useState<string>("");

   const onChangeSearchText = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchText(value);
      onSearch(value.trim());
   };

   return (
      <Box
         xcss={xcss({
            height: "75px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid transparent",
            borderBottomColor: "color.border",
            paddingLeft: "space.200",
            paddingRight: "space.200",
         })}
      >
         <Box xcss={xcss({ width: "250px" })}>
            <Textfield
               placeholder="Search"
               value={searchText}
               onChange={onChangeSearchText}
               elemBeforeInput={
                  <Box
                     xcss={xcss({ marginLeft: "space.100", display: "flex" })}
                  >
                     <SearchIcon label="Search" size="small" />
                  </Box>
               }
               isCompact
            />
         </Box>

         {actions.length > 0 && (
            <Box
               xcss={xcss({
                  display: "flex",
                  alignItems: "center",
                  gap: "space.100",
               })}
            >
               {actions.map((action, index) => {
                  const { label, ...restButtonProps } = action;
                  return (
                     <Button key={index} {...restButtonProps}>
                        {label}
                     </Button>
                  );
               })}
            </Box>
         )}
      </Box>
   );
};

export default AppHeader;
