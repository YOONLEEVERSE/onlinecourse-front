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
// const CourseType = gql`
//   fragment CourseInfo on CourseType {
//     courseId
//     title
//     subTitle
//     logo
//     mainColor
//     level
//     price
//     mainTechs{

//     }
//     prerequisite {
//       ...CourseInfo
//     }
//     videoCategories {
//       categoryId
//       title
//     }
//   }
// `;
