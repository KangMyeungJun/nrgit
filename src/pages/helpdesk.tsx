import { NextPage } from "next";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
} from "@chakra-ui/react";
import PersonalHome from "../components/Community/PersonalHome";
import Premium from "../components/Community/Premium";
import Recommendations from "../components/Community/Recommendations";
import PageContentLayout from "../components/Layout/PageContent";
import Sidebar from "../components/Sidebar/Sidebar";

type HelpDeskProps = {};

const HelpDesk: NextPage<HelpDeskProps> = () => {
  return (
    <PageContentLayout>
      <Sidebar />
      <>
        <Box>
          <Heading as="h1" size="xl" textAlign="center" my={4}>
            Help Desk
          </Heading>
          <Box width="50%" mx="auto">
            <FormControl>
              <FormLabel htmlFor="name">이름</FormLabel>
              <Input id="name" placeholder="이름을 입력하세요." />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="email">이메일</FormLabel>
              <Input id="email" placeholder="이메일을 입력하세요." />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="title">제목</FormLabel>
              <Input id="title" placeholder="제목을 입력하세요." />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="content">내용</FormLabel>
              <Textarea id="content" placeholder="내용을 입력하세요." />
            </FormControl>
            <Button mt={4} colorScheme="blue">
              제출하기
            </Button>
          </Box>
        </Box>
      </>
      <Stack spacing={5} position="sticky" top="14px">
        <Recommendations />
        <Premium />
        <PersonalHome />
      </Stack>
    </PageContentLayout>
  );
};

export default HelpDesk;
