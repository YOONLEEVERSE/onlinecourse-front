import { gql } from "@apollo/client";
import { UserInfo } from "./fragment";

export const GET_USER = gql`
  ${UserInfo}
  query getUser {
    getUser {
      ...UserInfo
    }
  }
`;

export const GET_ALL_TECH = gql`
  query getAllTech {
    getAllTech {
      id
      name
      logo
    }
  }
`;

export const GET_ALL_COURSE = gql`
  query getAllCourse {
    getAllCourse {
      title
      slug
      subTitle
      logo
      mainColor
      level
      price
      isEnrolled
      progress
      progressVideos
      mainTechs {
        id
        name
        logo
      }
      prerequisite {
        title
      }
      videoCategories {
        id
        title
        videos {
          videoId
          title
          time
          link
          freePreview
          text
          isCompleted
        }
      }
    }
  }
`;
export const GET_COURSE = gql`
  query getCourse($courseId: String) {
    getCourse(courseid: $courseId) {
      courseId
      title
      subTitle
      logo
      mainColor
      level
      price
      mainTechs {
        id
        name
        logo
      }
      prerequisite
      videoCategories {
        categoryId
        title
        videos {
          videoId
          title
          time
          link
        }
      }
    }
  }
`;

export const GET_ALL_COMMENT = gql`
  query getAllComment($videoId: String) {
    getAllComment(videoId: $videoId) {
      commentId
      writer
      content
      parentI
    }
  }
`;
