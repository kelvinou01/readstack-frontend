import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsDashLg, BsPlusLg, BsThreeDots } from "react-icons/bs";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { createBook, listBooks } from "../api/books";
import { IStackResponse } from "../api/response";
import AddBook from "./AddBook";
import "./hover.css";

interface onEditStackName {
  (id: number, newName: string): any;
}

interface onDeleteStack {
  (id: number): any;
}

interface onDeleteBook {
  (id: number): any;
}

interface StackProps {
  stack: IStackResponse;
  onEditStackName: onEditStackName;
  onDeleteStack: onDeleteStack;
  onDeleteBook: onDeleteBook;
  isOwnProfile: boolean;
}

const Stack: React.FC<StackProps> = function (props) {
  const params = useParams();
  const queryClient = useQueryClient();
  const { stack, isOwnProfile } = props;

  const [showAddBook, setShowAddBook] = useState(false);
  const [stackNameEditable, setStackNameEditable] = useState(false);
  const [stackName, setStackName] = useState(stack.name);

  const {
    data: books,
    error,
    refetch,
  } = useQuery(["books", stack.id], () => listBooks({ stack_id: stack.id }));

  return (
    <>
      <Heading mb={1} size="lg" color="brand.600" fontWeight="600">
        <Flex
          mb={2}
          width="full"
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStackNameEditable(false);
                props.onEditStackName(stack.id, stackName);
              }}
            >
              {stackNameEditable ? (
                <Input
                  onBlur={() => {
                    setStackNameEditable(false);
                  }}
                  outline={0}
                  defaultValue={stack.name}
                  fontSize="xl"
                  fontWeight="600"
                  onChange={(e) => {
                    setStackName(e.target.value);
                  }}
                ></Input>
              ) : (
                <Text>{stack.name}</Text>
              )}
              <button type="submit" hidden></button>
            </form>
            {isOwnProfile && (
              <IconButton
                aria-label="Add Book"
                variant="ghost"
                size="md"
                _focus={{
                  boxShadow: "none",
                }}
                icon={showAddBook ? <BsDashLg /> : <BsPlusLg />}
                onClick={() => setShowAddBook(!showAddBook)}
              />
            )}
          </HStack>
          {isOwnProfile && (
            <Menu placement="bottom-end">
              <MenuButton>
                <IconButton
                  aria-label="stack settings"
                  variant="ghost"
                  size="md"
                  _focus={{
                    boxShadow: "none",
                  }}
                  icon={showAddBook ? <BsThreeDots /> : <BsThreeDots />}
                />
              </MenuButton>

              <MenuList>
                <MenuItem
                  fontSize="md"
                  color="brand.700"
                  onClick={() => {
                    setStackNameEditable(true);
                  }}
                >
                  Edit stack name
                </MenuItem>
                <MenuItem
                  fontSize="md"
                  color="brand.700"
                  onClick={() => {
                    props.onDeleteStack(stack.id);
                  }}
                >
                  Delete stack
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Heading>

      {showAddBook && (
        <AddBook
          onAddBook={async (title, author, coverPhotoUrl) => {
            await createBook({
              title,
              author,
              cover_photo_url: coverPhotoUrl,
              stack_id: stack.id,
            });
            refetch();
          }}
        />
      )}

      <Grid templateColumns="repeat(5, 1fr)" gap="8px" mb="20px">
        {books?.map((book) => {
          return (
            <GridItem rowSpan={1} colSpan={1}>
              {showAddBook ? (
                <Box pos="relative" className="book">
                  <Image
                    borderRadius={4}
                    src={book.cover_photo_url}
                    alt={book.title}
                    onMouseOver={() => null}
                  />
                  <Box
                    className="book-overlay"
                    pos="absolute"
                    width="full"
                    height="full"
                    top="0"
                    left="0"
                    background="rgba(0,0,0,.5)"
                    transition="opacity 200ms"
                    opacity={0}
                    color="white"
                  >
                    <Flex justifyContent="flex-end">
                      <CloseIcon
                        cursor="pointer"
                        margin={3}
                        color="white"
                        onClick={async () => {
                          await props.onDeleteBook(book.id);
                          refetch();
                        }}
                      />
                    </Flex>
                  </Box>
                </Box>
              ) : (
                <Image
                  borderRadius={4}
                  src={book.cover_photo_url}
                  alt={book.title}
                />
              )}
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};

export default Stack;
