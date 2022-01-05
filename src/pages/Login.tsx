import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

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

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // localStorage.setItem("token", token)
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await login({
          username,
          password,
        });
        navigate("/" + username);
        setUsername("");
        setPassword("");
      }}
    >
      <VStack spacing={4}>
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

        <Button size="md" width="full" type="submit">
          Login
        </Button>

        <Text>
          New to Readstack?{" "}
          <Link as={ReachLink} to="/register" color="brand.600" href="">
            Register
          </Link>
        </Text>
      </VStack>
    </form>
  );
}
