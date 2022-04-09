import { Grid, Box, Heading, Button } from "grommet";
import Banner from "../../shared/banner";

export function Pay({ total = 25000 }) {
  return (
    <Grid
      rows={["10vh", "70vh"]}
      columns={["50%", "50%"]}
      gap="small"
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "nav", start: [0, 1], end: [0, 1] },
        { name: "main", start: [1, 1], end: [1, 1] },
      ]}
    >
      <Box gridArea="header">
        <Heading level="1" size="medium" textAlign="center">
          Complete Purchase
        </Heading>
      </Box>
      <Box gridArea="nav">
        <Banner />
      </Box>
      <Box gridArea="main">
        <Heading level="3" size="medium">
          Payment Options
        </Heading>
        <form>
          <input type="radio" name="payment" value="국내카드 결제" />
          국내카드 결제
          <input type="radio" name="payment" value="카카오페이 결제" />
          카카오페이 결제
          <input type="radio" name="payment" value="해외카드 결제" />
          해외카드 결제
        </form>
        <Heading level="5" size="medium">
          최종가격 : ₩ {total}
        </Heading>
        <Button primary> Pay Now </Button>
      </Box>
    </Grid>
  );
}
