import { Box, xcss } from "@atlaskit/primitives";
import { useMemo, useState } from "react";
import { TabsType } from "./helpers/constants";
import AppNavigation from "./components/AppNavigation";
import Books from "./components/Books";
import Members from "./components/Members";
import Transactions from "./components/Transactions";

const App = () => {
   const [activeTab, setActiveTab] = useState<TabsType>(TabsType.BOOKS);

   const components = useMemo(
      () => ({
         [TabsType.BOOKS]: Books,
         [TabsType.MEMBERS]: Members,
         [TabsType.TRANSACTIONS]: Transactions,
      }),
      []
   );

   const ActiveTabComponent = useMemo(() => components[activeTab], [activeTab]);

   return (
      <Box xcss={xcss({ width: "100vw", minHeight: "100vh" })}>
         <AppNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
         <Box
            xcss={xcss({
               width: "calc(100vw - 250px)",
               height: "100vh",
               position: "relative",
               left: "250px",
               overflowY: "auto",
            })}
         >
            <ActiveTabComponent />
         </Box>
      </Box>
   );
};

export default App;
