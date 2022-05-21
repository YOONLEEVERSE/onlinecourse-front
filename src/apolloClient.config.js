import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

// const wsLink = new WebSocketLink({
//   uri: "ws://192.168.219.110:8080/subscriptions",
// });
const httpLink = createUploadLink({
  //createHttpLink로 다시 바꾸기
  credentials: "same-origin",
  uri: "http://online-course-api.kro.kr:8000/graphql",
  //uri: "http://192.168.219.100:8000/graphql",
}); //for the mutation and query. 한번 연결하고 데이터 주고 받고 끊고,, mutation과 query는 굳이 websocket이 필요X

//헤더에 토큰 추가
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("acessToken") || "testtoken";
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const splitLink = split(
//   (operation) => operation.operationName === "TimeWatch",
//   wsLink,
//   authLink.concat(httpLink)
// );

const localState = {
  typePolicies: {
    CourseType: {
      keyFields: ["slug"],
      fields: {
        techNames: {
          read(_) {
            return "test";
          },
        },
      },
    },
  },
};

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(localState),
});

export function updateGraphqlHeaders() {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("accessToken");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  apolloClient.setLink(authLink.concat(httpLink));
}
//init
updateGraphqlHeaders();
