import {
  Avatar,
  Badge,
  Box,
  Flex,
  Icon,
  // IconButton,
  // Input,
  // InputGroup,
  // InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Store } from '../Store';

function Navbar({ toggle }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <Box
      minW="100%"
      bg="brand.100"
      display="flex"
      height="fit-content"
      flexDirection="row"
      p="6"
      overflow="hidden"
    >
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Box fontSize="6xl">
          <Link to="/">
            <p className="logo">Babyfie</p>
          </Link>
        </Box>
        <Box display={['block', 'none', 'none']} onClick={toggle}>
          <HamburgerIcon color="brand.600" boxSize={8} />
        </Box>
        <Box
          maxW="md"
          w="100%"
          display={['none', 'flex', 'flex']}
          alignItems="center"
          justifyContent="space-evenly"
          fontWeight="bold"
          fontSize={'1.3rem'}
          letterSpacing={3}
          gap={10}
        >
          <Link to="/">Acasă</Link>
          <Link to="/our-products">Produse</Link>
          <Link to="/about">Despre</Link>
          <Link to="/contact">Contact</Link>
        </Box>

        <Box display={['none', 'none', 'flex']} alignItems="center">
          <Box marginRight="1rem">
            {' '}
            <Link to="/cart">
              <Icon as={RiShoppingCartLine} w={6} h={6} color="brand.600" />
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
          <Box mx="0.5rem" w="fit-content">
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
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;
