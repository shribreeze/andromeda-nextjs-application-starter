import { ConnectWallet } from "@/modules/wallet";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface Props {}

const Page = async (props: Props) => {
  const {} = props;
  return (
    <>
      <div>
        <Flex mt={250} align="center" justify="center" position={"relative"}>
          <Button
            className="parentButton"
            mr={10}
            as={Link}
            href="/parent"
            variant="solid"
            p="4"
            fontSize={24}
            bg="gray.800" // Added background color
            color="white" // Text color changed to white for better contrast
            bgGradient="linear(to-r, red.400, pink.400)"
            _hover={{
              bgGradient: "linear(to-r, red.400, pink.400)",
            }}
            _active={{
              bgGradient: "linear(to-r, red.500, pink.500)",
            }}
          >
            Parents
          </Button>

          <Button
            ml={10}
            as="a"
            href="/child"
            variant="solid"
            p="4"
            fontSize={24}
            bg="gray.800" // Added background color
            color="white" // Text color changed to white for better contrast
            bgGradient="linear(to-r, green.400, teal.400)"
            _hover={{
              bgGradient: "linear(to-r, green.400, teal.400)",
            }}
            _active={{
              bgGradient: "linear(to-r, green.500, teal.500)",
            }}
          >
            Child
          </Button>
        </Flex>
      </div>
    </>
  );
};

export default Page;
