import {
  Avatar,
  Badge,
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
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
    window.location.href = '/signin';
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
            <h1 className="logo">Babyfie</h1>
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
        >
          <Link to="/">Acasa</Link>
          <Link to="/products">Produse</Link>
          <Link to="/about">Despre</Link>
          <Link to="/contact">Contact</Link>
        </Box>
        <Box display={['none', 'flex', 'flex']}>
          <Flex alignItems="center">
            <InputGroup>
              <Input
                borderColor="#000"
                variant="flushed"
                placeholder="Cauta produs..."
              />{' '}
              <InputRightElement>
                <IconButton
                  variant="unstyled"
                  aria-label="Search database"
                  icon={<SearchIcon />}
                />
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Box>
        <Box display="flex" alignItems="center">
          <Box marginRight="1rem">
            {' '}
            <Link to="/cart">
              <Icon as={RiShoppingCartLine} w={6} h={6} color="brand.600" />
              {cart.cartItems.length > 0 && (
                <Badge variant="solid" colorScheme="brand.500">
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
                    <MenuItem>Profile</MenuItem>
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
              <Link to="/login">Log In</Link>
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
                  <MenuItem>
                    <Link to="/admin/dashboard"> Dashboard</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/admin/products"> Produse</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/admin/orders"> Comenzi</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/admin/users"> Utilizatori</Link>
                  </MenuItem>
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
