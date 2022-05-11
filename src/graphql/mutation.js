import { gql } from "@apollo/client";
import { UserInfo, ResultInfo } from "./fragment";
export const SIGNIN = gql`
  ${UserInfo}
  mutation signin($email: String, $password: String) {
    signIn(input: { email: $email, password: $password }) {
      user {
        ...UserInfo
      }
      accessToken
      success
    }
  }
`;

export const SIGNUP = gql`
  mutation signUp(
    $name: String
    $email: String
    $emailAgreed: Boolean
    $password: String
  ) {
    signUp(
      input: {
        name: $name
        email: $email
        emailAgreed: $emailAgreed
        password: $password
      }
    ) {
      success
    }
  }
`;

export const VERIFY_EMAIL = gql`
  ${ResultInfo}
  mutation verifyEmail($code: String) {
    verifyEmail(code: $code) {
      ...ResultInfo
    }
  }
`;

export const RE_ISSUE = gql`
  mutation {
    reIssue {
      success
      error
      accessToken
    }
  }
`;

export const UPDATE_USER = gql`
  ${ResultInfo}
  mutation updateUser($name: String!, $emailAgreed: Boolean!) {
    updateUser(input: { name: $name, emailAgreed: $emailAgreed }) {
      ...ResultInfo
    }
  }
`;

export const UPDATE_EMAIL = gql`
  ${ResultInfo}
  mutation updateEmail($email: String) {
    updateEmail(email: $emalil) {
      ...ResultInfo
    }
  }
`;

export const UPDATE_AVATAR = gql`
  ${ResultInfo}
  mutation updateAvatar($avatar: String) {
    updateAvatar(avatar: $avatar) {
      ...ResultInfo
    }
  }
`;

export const REMOVE_USER = gql`
  ${ResultInfo}
  mutation removeUser {
    removeUser {
      ...ResultInfo
    }
  }
`;

export const ADD_TECH = gql`
  ${ResultInfo}
  mutation addTech($name: String, $logo: Upload) {
    addTech(input: { name: $name, logo: $logo }) {
      ...ResultInfo
    }
  }
`; //logo 업로드 타입이 바뀌었음!
export const ADD_TECH_TEST = gql`
  ${ResultInfo}
  mutation addTech($name: String, $logo: Upload) {
    addTech(name: $name, logo: $logo) {
      ...ResultInfo
    }
  }
`;

export const REMOVE_TECH = gql`
  ${ResultInfo}
  mutation removeTech($id: Long) {
    removeTech(id: $id) {
      ...ResultInfo
    }
  }
`;

export const ADD_COURSE = gql`
  ${ResultInfo}
  mutation addCourse(
    $title: String
    $subTitle: String
    $logo: Upload
    $mainColor: String
    $level: String
    $price: Int
    $mainTechs: [Long]
    $prerequisite: [String]
    $videoCategories: [CategoryInput]
  ) {
    addCourse(
      input: {
        title: $title
        subTitle: $subTitle
        mainColor: $mainColor
        level: $level
        price: $price
        mainTechs: $mainTechs
        prerequisite: $prerequisite
        videoCategories: $videoCategories
      }
      logo: $logo
    ) {
      ...ResultInfo
    }
  }
`;

export const UPDATE_COURSE = gql`
  ${ResultInfo}
  mutation updateCourse(
    $courseId: String
    $title: String
    $subTitle: String
    $logo: String
    $mainColor: String
    $level: String
    $price: Int
    $mainTechs: [Long]
    $prerequisite: [String]
    $videoCategories: [CategoryInput]
  ) {
    updateCourse(
      input: {
        courseId: $courseId
        title: $title
        subTitle: $subTitle
        logo: $logo
        mainColor: $mainColor
        level: $level
        price: $price
        mainTechs: $mainTechs
        prerequisite: $prerequisite
        videoCategories: $videoCategories
      }
    ) {
      ...ResultInfo
    }
  }
`;
export const REMOVE_COURSE = gql`
  ${ResultInfo}
  mutation removeCourse($courseId: String) {
    removeCourse(courseId: $courseId) {
      ...ResultInfo
    }
  }
`;

export const ADD_COMMENT = gql`
  ${ResultInfo}
  mutation addComment($videoId: String, $parentId: String, $content: String) {
    addComment(
      input: { videoId: $videoId, parentId: $parentId, content: $content }
    ) {
      ...ResultInfo
    }
  }
`;

export const UPDATE_COMMENT = gql`
  ${ResultInfo}
  mutation updateComment($commentId: String, $content: String) {
    updateComment(input: { commentId: $commentId, content: $contetn }) {
      ...ResultInfo
    }
  }
`;

export const REMOVE_COMMENT = gql`
  ${ResultInfo}
  mutation removeComment($commentId: String) {
    removeComment(commentId: $commentId) {
      ...ResultInfo
    }
  }
`;
