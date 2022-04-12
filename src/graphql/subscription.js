import { gql } from "@apollo/client";

export const SUBSCRIPTION_TEST = gql`
  subscription time {
    time {
      currentTime
    }
  }
`;
