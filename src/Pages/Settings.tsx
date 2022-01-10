import {
  Button,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../api/users";

function PasswordInput(props: any) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
        value={props.value}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/");
    }
  });

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const token = localStorage.getItem("token") as string;
            await updateUser(parseInt(token), {
              old_password: oldPassword,
              new_password: newPassword,
            });
            setShowFailureMessage(false);
            setShowSuccessMessage(true);
          } catch {
            setShowFailureMessage(true);
          } finally {
            setOldPassword("");
            setNewPassword("");
          }
        }}
      >
        <Heading mb={3} size="lg" color="brand.600" fontWeight="600">
          Reset password
        </Heading>

        <VStack spacing={4}>
          <FormControl>
            <PasswordInput
              onChange={(e: any) => {
                setOldPassword(e.target.value);
              }}
              value={oldPassword}
              placeholder="Old Password"
            />
          </FormControl>

          <FormControl>
            <PasswordInput
              onChange={(e: any) => {
                setNewPassword(e.target.value);
              }}
              value={newPassword}
              placeholder="New Password"
            />
          </FormControl>

          <Button size="md" width="full" type="submit">
            Reset my password
          </Button>
        </VStack>
      </form>

      {showFailureMessage && (
        <Text color="red.500" align="center" mt={3}>
          The old password that you entered is incorrect
        </Text>
      )}

      {showSuccessMessage && (
        <Text color="green.500" align="center" mt={3}>
          You have successfully changed your password
        </Text>
      )}
    </>
  );
}
