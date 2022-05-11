import { TextInput, Box, Button } from "grommet";
import { View, Hide } from "grommet-icons";
import { useInput } from "../../hooks/useInput";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { updateGraphqlHeaders } from "../../apolloClient.config";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../../graphql/mutation";

export function Login() {
  const { getState, handleChange } = useInput();
  const [reveal, setReveal] = useState(false);
  const { authorization } = useLogin();
  const [signIn, { loading, error, data, client }] = useMutation(SIGNIN);
  const navigate = useNavigate();
  if (loading) return <p>loading...</p>;
  else if (error) {
    return <p>에러</p>;
  } else if (data) {
    return <p>{data?.signIn.name}</p>;
  }
  return (
    <>
      <Box
        width="medium"
        direction="row"
        margin="large"
        align="center"
        round="small"
        border
      >
        <TextInput
          plain
          type="email"
          name="email"
          value={getState.email}
          onChange={handleChange}
        ></TextInput>
      </Box>
      <Box
        width="medium"
        direction="row"
        margin="large"
        align="center"
        round="small"
        border
      >
        <TextInput
          plain
          type={reveal ? "text" : "password"}
          name="password"
          value={getState.password}
          onChange={handleChange}
        />
        <Button
          icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
          onClick={() => setReveal(!reveal)}
        />
      </Box>
      <Button
        primary
        onClick={(e) => {
          e.preventDefault();
          const { email, password } = getState();
          signIn({
            variables: {
              email,
              password,
            },
            onCompleted: (data) => {
              localStorage.setItem("accessToken", data.signIn.accessToken);
              console.log("accessToken", data.signIn.accessToken);
              authorization(data.signIn.user);
              updateGraphqlHeaders();
              navigate(-1);
            },
            onError: (e) => {
              console.error("error", e);
            },
          });
        }}
      >
        로그인
      </Button>
    </>
  );
}
//name, email, emailverify,password,passwordDoubleCheck

/**
 * name: String
email: String
emailAgreed: Boolean
password: String
 */
