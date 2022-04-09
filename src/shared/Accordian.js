import { Accordion, AccordionPanel, Box, Text } from "grommet";
import { useState } from "react";
const dummytitles = [
  "[2021UPDATE] INTRODUCTION",
  "ONE SECTIKON",
  "TWO SECTION",
];
const dummy = [
  { section: 1, name: "one", playtime: 259, link: "#" },
  { section: 1, name: "two", playtime: 300, link: "#" },
  { section: 2, name: "2-1", playtime: 300, link: "#" },
  { section: 2, name: "2-2", playtime: 300, link: "#" },
  { section: 2, name: "2-3", playtime: 300, link: "#" },
  { section: 3, name: "3-1", playtime: 300, link: "#" },
  { section: 3, name: "3-1", playtime: 300, link: "#" },
  { section: 3, name: "3-1", playtime: 300, link: "#" },
  { section: 3, name: "3-1", playtime: 300, link: "#" },
  { section: 3, name: "3-1", playtime: 300, link: "#" },
  { section: 3, name: "3-1", playtime: 300, link: "#" },
  { section: 3, name: "3-1", playtime: 300, link: "#" },
  { section: 3, name: "3-1", playtime: 300, link: "#" },
  { section: 3, name: "3-1", playtime: 300, link: "#" },
  { section: 3, name: "3-1", playtime: 300, link: "#" },
];

const InnerBox = ({ content }) => (
  <Box pad="small" background="light-2">
    <Text>{content}</Text>
  </Box>
);

const InnerContent = ({ selected }) => {
  return (
    <>
      {selected.map((select, idx) => {
        return (
          <InnerBox
            key={`inner-${select.section}-${idx}`}
            content={select.name}
          />
        );
      })}
    </>
  );
};

function AccordianSection({
  titles = dummytitles,
  contents = dummy,
  openAll = false,
}) {
  return (
    <Accordion
      activeIndex={openAll ? [...Array(contents.length).keys()] : undefined}
    >
      {titles.map((title, idx) => {
        const section = idx + 1;
        const selected = contents.filter(
          (content) => content.section === section
        );
        return (
          <AccordionPanel key={`selected-section-${idx + 1}`} label={title}>
            <InnerContent selected={selected} />
          </AccordionPanel>
        );
      })}
    </Accordion>
  );
}

export default AccordianSection;
