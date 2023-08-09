import {Flex, Heading } from "@chakra-ui/react";
import React from "react";
export const Navbar = () => {
  return (
    <Flex
      h="80px"
      justifyContent={"center"}
      alignItems={"center"}
      color={"white"}
      bg="black"
      
    >
        <Heading marginLeft={"5px"} size={"xl"}>Quiz Portal Having 10 Questions</Heading>

    </Flex>
  );
};