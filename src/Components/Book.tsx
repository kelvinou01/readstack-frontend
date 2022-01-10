import { CloseIcon } from "@chakra-ui/icons";
import { AspectRatio, Box, Flex, Image, Text } from "@chakra-ui/react";
import { IBookResponse } from "../api/response";

interface BookProps {
  book: IBookResponse;
  showAddBook: boolean;
  onDeleteBook: (id: number) => any;
  refetch: () => any;
}

const Book: React.FC<BookProps> = function (props) {
  return (
    <>
      <AspectRatio ratio={2 / 3}>
        <Image
          borderRadius={4}
          src={props.book.cover_photo_url}
          alt={props.book.title}
        />
      </AspectRatio>

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
        {props.showAddBook ? (
          <Flex justifyContent="flex-end">
            <CloseIcon
              cursor="pointer"
              margin={3}
              color="white"
              onClick={async () => {
                await props.onDeleteBook(props.book.id);
                props.refetch();
              }}
            />
          </Flex>
        ) : (
          <Box padding="5px">
            <Text fontSize="sm" fontWeight={500}>
              {props.book.title}
            </Text>
            <Text fontSize="xs">{"by " + props.book.author}</Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Book;
