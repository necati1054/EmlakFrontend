import React from "react";

import Filter from "../common/Filter";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
// import { filterTabs } from "../data/HomeOneData/HomeOneData";

const filterTabs = [
  {
    id: 1,
    text: "konut",
  },
  {
    id: 2,
    text: "isyeri",
  },
  {
    id: 3,
    text: "arsa",
  },
];

const TabFilter = (props) => {
  return (
    <>
      <Tabs>
        <TabList className={"common-tab nav nav-pills"}>
          {filterTabs.map((filterTab, index) => (
            <Tab key={index} className={"nav-link"}>
              {filterTab.text}
            </Tab>
          ))}
          <Link to="/map">
            <Tab className={"nav-link"}>Harita İle Ara</Tab>
          </Link>
        </TabList>
        {filterTabs.map((filterTab, index) => (
          <TabPanel key={index}>
            <Filter
              colClass={props.colClass}
              buttonText={filterTab.text}
              FilterTabId={filterTab.id}
            />
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
};

export default TabFilter;
