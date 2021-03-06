import {
	Box,
	FormControl,
	Grid,
	GridItem,
	Image,
	Input,
	VStack,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { useState } from "react";

interface AddBookProps {
	onAddBook: (title: string, author: string, coverPhotoUrl: string) => any;
}

const AddBook: React.FC<AddBookProps> = function (props) {
	const [items, setItems] = useState<any[]>();

	return (
		<FormControl mb={4}>
			<Box pos="relative">
				<Input
					pr="4.5rem"
					type="text"
					placeholder="Search books"
					onInput={debounce((e) => {
						const query = (e.target as any).value.replaceAll(" ", "+");
						fetch(
							`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12`
						)
							.then((res) => res.json())
							.then((data) => {
								setItems(data.items);
							});
					}, 400)}
					onBlur={() => {
						setTimeout(() => setItems([]), 300);
					}}
				/>
				<VStack
					background="white"
					width="full"
					alignItems="flex-start"
					pos="absolute"
					top="100%"
					mt={1}
					zIndex={100}
					borderRadius={6}
					boxShadow="md"
					overflow="hidden"
				>
					<Grid templateColumns="repeat(6, 1fr)" gap="5px">
						{items?.map((item: any) => {
							if (item.volumeInfo.imageLinks?.thumbnail) {
								const coverImageUrl =
									item.volumeInfo.imageLinks.thumbnail.replace(
										"http://",
										"https://"
									);
								return (
									<GridItem>
										<Image
											boxSize="150px"
											src={coverImageUrl}
											onClick={() => {
												const title = item.volumeInfo.title;
												const authors = item.volumeInfo.authors
													.join()
													.replace(",", ", ");
												props.onAddBook(title, authors, coverImageUrl);
											}}
											_hover={{
												cursor: "pointer",
											}}
										></Image>
									</GridItem>
								);
							}
						})}
					</Grid>
				</VStack>
			</Box>
		</FormControl>
	);
};

export default AddBook;
