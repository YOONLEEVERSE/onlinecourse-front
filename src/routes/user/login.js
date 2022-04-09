import { TextInput, Box, Button } from "grommet";
import { View, Hide } from "grommet-icons";
import { useInput } from "../../hooks/useInput";
import { useEffect, useState } from "react";
export function Login() {
  const { getState, handleChange } = useInput();
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    console.log("IMRENDERING ON LOGIN");
  });
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
      <Button primary onClick={(e) => console.log("출력", getState())}>
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
