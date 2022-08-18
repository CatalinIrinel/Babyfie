import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Icon,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
import { SidebarContainer, SidebarWrapper } from './SidebarElem';

function Sidebar({ isOpen, toggle }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarWrapper>
        <Box w="100%" p="2rem" display="flex" justifyContent="flex-end">
          <CloseIcon color="#000" boxSize={6} onClick={toggle} />
        </Box>
        <UnorderedList listStyleType="none" fontSize="1.5rem" color="#000">
          <ListItem mb="1rem" onClick={toggle}>
            <Link to="/">Acasa</Link>
          </ListItem>
          <ListItem mb="1rem" onClick={toggle}>
            <Link to="/our-products">Produse</Link>
          </ListItem>
          <ListItem mb="1rem" onClick={toggle}>
            <Link to="/about">Despre</Link>
          </ListItem>
          <ListItem mb="1rem" onClick={toggle}>
            <Link to="/contact">Contact</Link>
          </ListItem>
        </UnorderedList>
        <Box mt="3rem">
          <Flex
            alignItems="center"
            flexDirection="column"
            gap={'2rem'}
            fontSize={'1.3rem'}
          >
            <Box w="fit-content">
              {userInfo ? (
                <Menu>
                  <MenuButton display="flex" alignItems="center">
                    <Avatar marginRight="0.5rem" size="xs" bg="brand.600" />
                    {userInfo.name}
                    <ChevronDownIcon />
                  </MenuButton>
                  <MenuList>
                    <Link to="/profile">
                      <MenuItem>Profil</MenuItem>
                    </Link>
                    <Link to="/order-history">
                      <MenuItem>Istoric Comenzi</MenuItem>
                    </Link>
                    <MenuDivider />
                    <Link to="#signout" onClick={signoutHandler}>
                      {' '}
                      <MenuItem> Delogare</MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              ) : (
                <Link to="/login">Loghează-te</Link>
              )}
            </Box>

            <Box>
              {userInfo && userInfo.isAdmin && (
                <Menu id="admin-nav-dropdown">
                  <MenuButton display="flex" alignItems="center">
                    <Avatar marginRight="0.5rem" size="xs" bg="brand.400" />
                    Administrator
                    <ChevronDownIcon />
                  </MenuButton>
                  <MenuList>
                    <Link to="/admin/dashboard">
                      {' '}
                      <MenuItem>Dashboard</MenuItem>
                    </Link>
                    <Link to="/admin/products">
                      {' '}
                      <MenuItem>Produse</MenuItem>
                    </Link>
                    <Link to="/admin/orders">
                      {' '}
                      <MenuItem>Comenzi</MenuItem>
                    </Link>
                    <Link to="/admin/users">
                      {' '}
                      <MenuItem>Utilizatori</MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              )}
            </Box>
            <Box>
              {' '}
              <Link to="/cart">
                <Icon as={RiShoppingCartLine} w={10} h={10} color="brand.600" />
                {cart.cartItems.length > 0 && (
                  <Badge
                    position={'absolute'}
                    bg={'red.300'}
                    borderRadius={'full'}
                    color={'#fff'}
                  >
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
            </Box>
          </Flex>
        </Box>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
