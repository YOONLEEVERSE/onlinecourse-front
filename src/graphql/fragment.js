import { gql } from "@apollo/client";

export const UserInfo = gql`
  fragment UserInfo on UserType {
    name
    email
    emailAgreed
    avatar
  }
`;

export const ResultInfo = gql`
  fragment ResultInfo on ResultType {
    success
    error
  }
`;
