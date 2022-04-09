import React from "react";
import { Box, Tab, Tabs } from "grommet";
import Banner from "./banner";
export const ScrollableTabs = ({ Banners1, Banners2, Banners3 }) => (
  <Box fill>
    <Tabs flex>
      <Tab title="클론코딩">
        <Box fill overflow="auto" align="center" flex direction="row">
          <Banner techs={"ABSC"}></Banner>
          <Banner techs={"ABSC"}></Banner>
          <Banner techs={"ABSC"}></Banner>
        </Box>
      </Tab>
      <Tab title="무료강의">
        <Box fill overflow="auto" align="center" flex direction="row">
          <Banner techs={"무료"}></Banner>
          <Banner techs={"무료"}></Banner>
          <Banner techs={"무료"}></Banner>
        </Box>
      </Tab>
      <Tab title="마스터클래스">
        <Box fill overflow="auto" align="center" flex direction="row">
          <Banner techs={"마스터"}></Banner>
          <Banner techs={"마스터"}></Banner>
          <Banner techs={"마스터"}></Banner>
        </Box>
      </Tab>
    </Tabs>
  </Box>
);
