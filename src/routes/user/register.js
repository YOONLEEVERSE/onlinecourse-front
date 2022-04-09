import { TextInput, Box, Button, CheckBox } from "grommet";
import { View, Hide } from "grommet-icons";
import { useInput } from "../../hooks/useInput";
import { useState, useCallback } from "react";
export function Register() {
  const { getState, handleChange } = useInput();
  const [reveal, setReveal] = useState(false);

  const MsBox = useCallback(({ children }) => {
    return (
      <Box
        width="medium"
        margin="small"
        align="center"
        round="small"
        direction="row"
        border
      >
        {children}
      </Box>
    );
  }, []);

  return (
    <>
      <MsBox>
        <TextInput
          placeholder="email"
          plain
          type="email"
          name="email"
          value={getState().email || ""}
          onChange={handleChange}
        ></TextInput>
      </MsBox>
      <p>이메일 제공 동의</p>
      <CheckBox
        onClick={handleChange}
        name="emailAgreed"
        value={getState().emailAgreed || false}
      ></CheckBox>
      <MsBox>
        <TextInput
          placeholder="name"
          plain
          type="name"
          name="name"
          value={getState().name || ""}
          onChange={handleChange}
        ></TextInput>
      </MsBox>
      <MsBox>
        <TextInput
          placeholder="password"
          plain
          type={reveal ? "text" : "password"}
          name="password"
          value={getState().password || ""}
          onChange={handleChange}
        />
        <Button
          icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
          onClick={() => setReveal(!reveal)}
        />
      </MsBox>
      <MsBox>
        <TextInput
          plain
          placeholder="passwordCheck"
          type={reveal ? "text" : "password"}
          name="checkpassword"
          value={getState().checkpassword || ""}
          onChange={handleChange}
        />
        <Button
          icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
          onClick={() => setReveal(!reveal)}
        />
      </MsBox>
      <Button primary onClick={(e) => console.log("출력", getState())}>
        회원가입
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
