import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface PageContentLayoutProps {
  maxWidth?: string;
  children?: React.ReactNode[];
}

const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  children,
  maxWidth,
}) => {
  if (React.Children.count(children) === 2) {
    return (
      <Flex justify="center" p="16px 0px">
        <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"}>
          <Flex
            direction="column"
            width={{ base: "100%", md: "65%" }}
            mr={{ base: 0, md: 6 }}
          >
            {children && children[0]}
          </Flex>
          {/* Right Content */}
          <Box
            display={{ base: "none", md: "flex" }}
            flexDirection="column"
            flexGrow={1}
          >
            {children && children[1]}
          </Box>
        </Flex>
      </Flex>
    );
  } else if (React.Children.count(children) === 3) {
    return (
      <Flex justify="center" p="16px 0px">
        <Flex width="100%" maxWidth={maxWidth || "100%"}>
          {/* Left Sidebar */}
          <Box
            display={{ base: "none", md: "flex" }}
            flexDirection="column"
            flexGrow={1}
            flexBasis={{ base: "100%", md: "16.67%" }} // 1/6 (1 part)
            mr={{ base: 0, md: 6 }}
            ml={{ base: 0, md: 4 }} // 왼쪽 마진 추가
          >
            {children && children[0]}
          </Box>
          {/* Main Content */}
          <Flex
            direction="column"
            flexGrow={6}
            flexBasis={{ base: "100%", md: "66.67%" }} // 6/9 (6 parts)
            mr={{ base: 0, md: 6 }}
          >
            {children && children[1]}
          </Flex>
          {/* Right Content */}
          <Box
            display={{ base: "none", md: "flex" }}
            flexDirection="column"
            flexGrow={2}
            flexBasis={{ base: "100%", md: "22.22%" }} // 2/9 (2 parts)
            mr={{ base: 0, md: 4 }} // 오른쪽 마진 추가
          >
            {children && children[2]}
          </Box>
        </Flex>
      </Flex>
    );
  } else {
    return null;
  }
};

export default PageContentLayout;
