import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { register } from "../api/auth";

function PasswordInput(props: any) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Password"
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

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/" + localStorage.getItem("username"));
    }
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await register({
            username,
            email,
            password,
          });
          setShowFailureMessage(false);
          navigate("/" + username);
        } catch {
          setShowFailureMessage(true);
        } finally {
          setEmail("");
          setUsername("");
          setPassword("");
        }
      }}
    >
      <VStack spacing={4}>
        <FormControl>
          <Input
            colorScheme="brand"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <Input
            colorScheme="brand"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <PasswordInput
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </FormControl>
      </VStack>

      {showFailureMessage ? (
        <Text color="red.500" align="center" mt={1}>
          The username or email you entered has already been taken{" "}
        </Text>
      ) : (
        <Flex mt={4}></Flex>
      )}

      <VStack spacing={4}>
        <Button size="md" width="full" type="submit">
          Create an account
        </Button>

        <Text>
          Have an account?{" "}
          <Link as={ReachLink} to="/login" color="brand.600" href="">
            Login
          </Link>
        </Text>
      </VStack>
    </form>
  );
}
