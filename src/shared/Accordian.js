import { Accordion, AccordionPanel, Box, Text } from "grommet";

const InnerContent = ({ selected }) => {
  return (
    <>
      {selected.map((select, idx) => {
        return (
          <Box pad="small" background="light-2" key={select.title + idx}>
            <Text>{select.title}</Text>
            <Text>{select.time}</Text>
          </Box>
        );
      })}
    </>
  );
};

function AccordianSection({ data, openAll }) {
  console.log("DATA", data);
  console.log("OPENALL", openAll);
  //video ID를 보내주는 편으로 하는 게 좋겠구만.1
  return (
    <Accordion
      activeIndex={openAll ? [...Array(data.length).keys()] : undefined}
    >
      {data.map((category, idx) => {
        return (
          <AccordionPanel
            key={`selected-section-${idx + 1}`}
            label={category.title}
          >
            <InnerContent selected={category.videos} />
          </AccordionPanel>
        );
      })}
    </Accordion>
  );
}

export default AccordianSection;
