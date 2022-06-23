import { gql, useQuery } from "@apollo/client";

//로그인 되어 있는 경우에만 접근 가능.
//내 프로필이랑
// My Course 확인 가능 ==> getPayments로.
const GET_PAYMENTS = gql`
  query getPayments {
    getPayments {
      amount
      status
      course {
        title
        slug
        logo
        mainColor
        level
        price
        progress
        progressVideos
        isEnrolled
      }
    }
  }
`;

export function MyPage() {
  const { data, error, loading } = useQuery(GET_PAYMENTS);
  return <div>MyPage</div>;
}
