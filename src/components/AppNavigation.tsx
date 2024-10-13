import { ButtonItem } from "@atlaskit/menu";
import { Box, xcss } from "@atlaskit/primitives";
import { TabsType } from "../helpers/constants";
import { FC, useMemo } from "react";
import Heading from "@atlaskit/heading";
import BookIcon from "@atlaskit/icon/glyph/book";

interface Props {
   activeTab: TabsType;
   onChangeTab: (tab: TabsType) => void;
}

const AppNavigation: FC<Props> = (props) => {
   const { activeTab, onChangeTab } = props;

   const tabs = useMemo(
      () => [
         { label: "Books", value: TabsType.BOOKS },
         { label: "Members", value: TabsType.MEMBERS },
         { label: "Transactions", value: TabsType.TRANSACTIONS },
      ],
      []
   );

   return (
      <Box
         xcss={xcss({
            width: "250px",
            height: "100%",
            position: "fixed",
            left: "0px",
            top: "0px",
            borderRight: "1px solid transparent",
            borderRightColor: "color.border",
         })}
      >
         <Box
            xcss={xcss({
               display: "flex",
               alignItems: "center",
               gap: "space.050",
               padding: "space.150",
            })}
         >
            <BookIcon label="Library" size="large" />
            <Heading size="medium">Library Manager</Heading>
         </Box>
         {tabs.map((tab) => {
            const { label, value } = tab;
            return (
               <ButtonItem
                  key={value}
                  isSelected={value === activeTab}
                  onClick={() => onChangeTab(value)}
               >
                  {label}
               </ButtonItem>
            );
         })}
      </Box>
   );
};

export default AppNavigation;
