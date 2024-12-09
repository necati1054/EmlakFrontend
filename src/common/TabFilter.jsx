import React from "react";

import Filter from "../common/Filter";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TabFilter = (props) => {
  const { t, i18n } = useTranslation();
  let lang = i18n.resolvedLanguage;
  const filterTabs = [
    {
      id: 1,
      text: t("konut"),
      text2: "konut",
    },
    {
      id: 2,
      text: t("isyeri"),
      text2: "isyeri",
    },
    {
      id: 3,
      text: t("arsa"),
      text2: "arsa",
    },
  ];

  return (
    <>
      <Tabs>
        <TabList className={"common-tab nav nav-pills"}>
          {filterTabs.map((filterTab, index) => (
            <Tab key={index} className={"nav-link"}>
              {filterTab.text}
            </Tab>
          ))}
          <Tab key={filterTabs.length} className={"nav-link"}>
            <Link to={"/" + lang + "/map"} style={{ color: "black" }}>
              {t("Harita İle Ara")}
            </Link>
          </Tab>
        </TabList>
        {filterTabs.map((filterTab, index) => (
          <TabPanel key={index}>
            <Filter
              colClass={props.colClass}
              buttonText={filterTab.text2}
              FilterTabId={filterTab.id}
            />
          </TabPanel>
        ))}
        <TabPanel key="map">
          <p>Map content goes here</p>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default TabFilter;
