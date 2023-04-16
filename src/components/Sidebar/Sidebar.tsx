import React from "react";
import { Box, VStack, Heading, Button, Icon } from "@chakra-ui/react";
import {
  ArrowRightIcon,
  BellIcon,
  ChatIcon,
  StarIcon,
  AddIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

import Link from "next/link";

interface BoardItem {
  id: number;
  title: string;
  path: string;
  icon: React.ElementType;
}

const Sidebar = () => {
  const boards: BoardItem[] = [
    { id: 1, title: "Help Desk", path: "/helpdesk", icon: ArrowRightIcon },
    { id: 2, title: "Notifications", path: "/another-page", icon: BellIcon },
    { id: 3, title: "Messages", path: "/third-page", icon: ChatIcon },
    { id: 4, title: "Bookmarks", path: "/third-page", icon: StarIcon },
    { id: 5, title: "Lists", path: "/third-page", icon: StarIcon },
    {
      id: 6,
      title: "Subscriptions",
      path: "/third-page",
      icon: StarIcon,
    },
    { id: 7, title: "Add card", path: "/third-page", icon: AddIcon },
    { id: 8, title: "My profile", path: "/third-page", icon: StarIcon },
    { id: 9, title: "More", path: "/third-page", icon: SettingsIcon },
    // ...
  ];

  return (
    <Box>
      <VStack spacing={2} alignItems="stretch">
        {boards.map((board) => (
          <Link href={board.path} key={board.id}>
            <Button
              bg="white"
              borderColor="transparent"
              color="yellow.500"
              _hover={{ bg: "gray.100" }}
              leftIcon={<board.icon />}
            >
              {board.title}
            </Button>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
