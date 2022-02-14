import { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header';
import Product from './Product';
import { Container, StyledLink } from './style';

//add sweetalert lib for confirm

import api from '../../services/api';

export default function Cart() {
  const [productData, setProductData] = useState(null);
  const [cartIds, setCartIds] = useState([])
  useEffect(getCart, []);
  const toProducts = true

  let cart = []

  function getCart() {
    //GET cart
    //if logged in, get through api
    
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((item) => {
      cartIds.push(item.id);
    });

    getProductData(cartIds);

  }

  function getProductData(ids) {
    const promise = api.getProductsById(ids);
    promise.then((res) => {
      setProductData(res.data);
    });
    promise.catch();
  }

  function emptyCart() {
    localStorage.removeItem('cart')
  }

  function calculateTotal() {
    //pegar do mywallet
  }

  if (!productData || !cart) {
    return '';
  }
  return (
    <>
      <Header toProducts={toProducts}/>
      <Container>
        {productData.map((product) => 
          <Product product={product}/>
        )}
        <p>Total: R$ 0,00</p>
        <div>
        <button onClick={() => emptyCart()}>Esvaziar carrinho</button>
        <StyledLink to='/checkout'>
        Prosseguir para compra</StyledLink>
        </div>
      </Container>
    </>
  );
}
