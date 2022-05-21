import { useApolloClient, gql, useMutation } from "@apollo/client";
import { Grid, Box, Heading, Button } from "grommet";
import _ from "lodash";
import { useParams } from "react-router-dom";
import Banner from "../../shared/banner";

const PAYDATA = gql`
  fragment payData on CourseType {
    title
    subTitle
    level
    price
    logo
  }
`;

const PAYMENTS = gql`
  mutation payment(
    $slug: String
    $impUid: String
    $merchantUid: Long
    $amount: Int
  ) {
    payment(
      input: {
        slug: $slug
        impUid: $impUid
        merchantUid: $merchantUid
        amount: $amount
      }
    ) {
      success
      error
    }
  }
`;
const IMP = window.IMP;
const impUid = "imp17826522";
IMP.init(impUid);

export function Pay({ total = 25000 }) {
  const { slug } = useParams();
  const client = useApolloClient();
  const data = client.readFragment({
    id: `CourseType:{"slug":"${slug}"}`,
    fragment: PAYDATA,
  });
  const [payments] = useMutation(PAYMENTS, {
    onCompleted: (res) => {
      console.log("결제 성공");
    },
    onError: (error) => {
      console.log("결제 에러", error);
    },
  });

  const onClick = () => {
    // IMP.request_pay(param, callback) 결제창 호출
    const merchant_uid = Date.now();
    console.log("merchant_uid", merchant_uid);
    IMP.request_pay(
      {
        // param
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: merchant_uid,
        name: slug,
        // amount: data.price,
        amount: 100,
        buyer_email: "bebus1998@naver.com",
        buyer_name: "이진희",
        buyer_tel: "010-9061-6840",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          console.log(rsp.imp_uid, rsp.merchant_uid);
          payments({
            variables: {
              slug,
              impUid: rsp.imp_uid,
              merchantUid: merchant_uid,
              // amount: data.price,
              amount: 100,
            },
          });
        } else {
          console.log("FAIL");
        }
      }
    );
  };

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
        <Banner {...data} />
      </Box>
      <Box gridArea="main">
        <Heading level="3" size="medium">
          Payment Options
        </Heading>
        <form>
          <input type="radio" name="payment" value="국내카드 결제" />
          국내카드 결제
        </form>
        <Heading level="5" size="medium">
          최종가격 : ₩ {data.price}
        </Heading>
        <Button primary pad="xsmall" onClick={onClick}>
          Pay Now
        </Button>
      </Box>
    </Grid>
  );
}
