import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsDashLg, BsPlusLg, BsThreeDots } from "react-icons/bs";
import { useQuery } from "react-query";
import { createBook, listBooks } from "../api/books";
import { IStackResponse } from "../api/response";
import AddBook from "./AddBook";
import Book from "./Book";
import "./hover.css";

interface StackProps {
  stack: IStackResponse;
  onEditStackName: (id: number, newName: string) => any;
  onDeleteStack: (id: number) => any;
  onDeleteBook: (id: number) => any;
  isOwnProfile: boolean;
}

const Stack: React.FC<StackProps> = function (props) {
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
              <MenuButton
                as={IconButton}
                aria-label="stack settings"
                variant="ghost"
                size="md"
                _focus={{
                  boxShadow: "none",
                }}
                _active={{
                  boxShadow: "none",
                }}
                icon={<BsThreeDots />}
              />

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
            <GridItem key={book.id} rowSpan={1} colSpan={1}>
              <Box pos="relative" className="book">
                <Book
                  book={book}
                  showAddBook={showAddBook}
                  onDeleteBook={props.onDeleteBook}
                  refetch={refetch}
                />
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};

export default Stack;
