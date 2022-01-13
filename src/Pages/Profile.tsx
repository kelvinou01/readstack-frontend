import {
  Button,
  Flex,
  FormControl,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link as ReachLink, useParams } from "react-router-dom";
import { deleteBook } from "../api/books";
import {
  createStack,
  deleteStack,
  listStacks,
  updateStack,
} from "../api/stacks";
import Stack from "../Components/Stack";

export default function ProfilePage() {
  const params = useParams();
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newStackName, setNewStackName] = useState("");

  const {
    data: stacks,
    error,
    refetch,
  } = useQuery(["username", params.username], () =>
    listStacks({ username: params.username })
  );

  const isOwnProfile = useMemo(() => {
    return localStorage.getItem("username") === params.username;
  }, [localStorage.getItem("username"), params.username]);

  if (stacks === undefined) {
    return (
      <>
        <Flex justifyContent="center">
          <Text fontSize="5xl">🤡</Text>
        </Flex>
      </>
    );
  } else {
    return (
      <>
        {isOwnProfile && (
          <>
            <Button
              size="sm"
              backgroundColor="brand.500"
              onClick={onOpen}
              my="10px"
            >
              New stack
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await createStack({
                    name: newStackName,
                  });
                  refetch();
                }}
              >
                <ModalOverlay />
                <ModalContent backgroundColor="brand.50">
                  <ModalHeader color="brand.600" fontSize="2xl" pb="0px">
                    Create a new stack
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack spacing={4}>
                      <FormControl>
                        <Input
                          colorScheme="brand"
                          id="stackName"
                          type="text"
                          placeholder="Enter an oddly specific name"
                          onChange={(e) => {
                            setNewStackName(e.target.value);
                          }}
                        />
                      </FormControl>
                    </VStack>
                  </ModalBody>

                  <ModalFooter>
                    <Button mr={3} onClick={onClose} type="submit">
                      Save stack
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </form>
            </Modal>
          </>
        )}
        {stacks?.map((stack) => (
          <Stack
            key={stack.id}
            stack={stack}
            isOwnProfile={isOwnProfile}
            onEditStackName={async (id, newName) => {
              await updateStack(id, { name: newName });
              refetch();
            }}
            onDeleteStack={async (id) => {
              await deleteStack(id);
              queryClient.invalidateQueries(["username", params.username]);
              // invalidate queries is the same as refetch, but invalidate can be called anywhere without passsing the refetch
            }}
            onDeleteBook={async (id) => {
              await deleteBook(id);
            }}
          ></Stack>
        ))}
        {!isOwnProfile && (
          <Text
            fontSize="xl"
            fontWeight="600"
            color="brand.600"
            textAlign="center"
            mt={10}
          >
            <Link
              as={ReachLink}
              to="/register"
              style={{ textDecoration: "none" }}
            >
              Create your own readstack 📚
            </Link>
          </Text>
        )}
      </>
    );
  }
}
