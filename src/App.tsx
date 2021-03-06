import {
  Avatar,
  Box,
  ChakraProvider,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  Link as ReachLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Homepage from "./Pages";
import LoginPage from "./Pages/Login";
import ProfilePage from "./Pages/Profile";
import RegisterPage from "./Pages/Register";
import Settings from "./Pages/Settings";
import theme from "./theme";

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

function App() {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const username = useMemo(
    () => localStorage.getItem("username"),
    [localStorage.getItem("username")]
  );

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Container maxW="825px" margin="auto">
          <Box
            padding={8}
            margin={6}
            marginTop={10}
            background="brand.50"
            borderRadius={12}
            border="1px"
            borderStyle="solid"
            borderColor="brand.200"
          >
            <Flex
              mb={4}
              width="full"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading size="2xl" color="brand.600" fontWeight="700">
                <Link as={ReachLink} to="/" style={{ textDecoration: "none" }}>
                  👋🏻 Readstack
                </Link>
              </Heading>

              {username && (
                <Menu placement="bottom-end">
                  <MenuButton>
                    <Avatar
                      width={10}
                      height={10}
                      bg="brand.500"
                      name={username.charAt(0)}
                    />
                  </MenuButton>
                  <Portal>
                    <MenuList zIndex={999} textColor="brand.600">
                      <MenuItem
                        onClick={() => {
                          navigate("/" + localStorage.getItem("username"));
                        }}
                      >
                        My Readstack
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          navigate("/settings");
                        }}
                      >
                        Settings
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("username");
                          navigate("/login");
                        }}
                      >
                        Log out
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              )}
            </Flex>
            <Divider mb={2}></Divider>
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/:username" element={<ProfilePage />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
            </Routes>
          </Box>
        </Container>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default AppWrapper;
