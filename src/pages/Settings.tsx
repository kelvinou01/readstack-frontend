import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

function PasswordInput(props: { placeholder: string }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder={props.placeholder}
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
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <>
      <Heading mb={3} size="lg" color="brand.600" fontWeight="600">
        Reset password
      </Heading>

      <VStack spacing={2} mb={10}>
        <FormControl>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            colorScheme="brand"
            id="email"
            type="email"
            placeholder="Enter email"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Old Password</FormLabel>
          <PasswordInput placeholder="Enter old password" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">New password</FormLabel>
          <PasswordInput placeholder="Enter new password" />
        </FormControl>

        <Button size="md" width="full">
          Reset my password
        </Button>
      </VStack>
    </>
  );
}
