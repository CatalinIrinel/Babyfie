import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarContainer, SidebarWrapper } from './SidebarElem';

function Sidebar({ isOpen, toggle }) {
  const navigate = useNavigate();
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <SidebarWrapper>
        <Box w="100%" p="2rem" display="flex" justifyContent="flex-end">
          <CloseIcon color="#000" boxSize={6} onClick={toggle} />
        </Box>
        <Box mb="3rem">
          <Flex alignItems="center" flexDirection="column">
            <InputGroup>
              <Input
                borderColor="#000"
                variant="flushed"
                placeholder="Cauta produs..."
              />{' '}
              <InputRightElement>
                <IconButton
                  variant="unstyled"
                  color="#000"
                  aria-label="Search database"
                  icon={<SearchIcon />}
                />
              </InputRightElement>
            </InputGroup>
            <Box mt="1rem" w="fit-content">
              <Button
                type="button"
                size="lg"
                variant="outline"
                p="6"
                _focus={{ boxShadow: 'none' }}
                onClick={() => navigate('/login')}
                color="#000"
                borderColor="brand.600"
                borderWidth="2px"
              >
                Log In
              </Button>
              {/* <Avatar size="sm" bg="teal.500" /> */}
            </Box>
          </Flex>
        </Box>
        <UnorderedList listStyleType="none">
          <ListItem mb="1rem" fontSize="1.5rem" color="#000">
            <Link to="/">Acasa</Link>
          </ListItem>
          <ListItem mb="1rem" fontSize="1.5rem" color="#000">
            <Link to="/produse">Produse</Link>
          </ListItem>
          <ListItem mb="1rem" fontSize="1.5rem" color="#000">
            <Link to="/despre">Despre</Link>
          </ListItem>
          <ListItem mb="1rem" fontSize="1.5rem" color="#000">
            <Link to="/contact">Contact</Link>
          </ListItem>
        </UnorderedList>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
