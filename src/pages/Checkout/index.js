import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//add sweetalert lib for confirm

import AuthContext from '../../contexts/AuthContext';

import Header from '../../components/Header';

import { Container } from './style';
import FormOfPayment from './FormOfPayment';
import api from '../../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [hide, setHide] = useState(true);

  const [formsOfPayment, setFormsOfPayment] = useState(null);

  useEffect(getFormsOfPayment, []);

  function getFormsOfPayment() {
    if (token) {
      const promise = api.getFormsOfPaymentData(token);
      promise.then((res) => setFormsOfPayment(res.data));
    }
  }

  function handleClickAdd(e) {
    e.preventDefault();
    navigate(`/add-form-of-payment/${e.target.value}`);
  }
  function handleClickOrder() {}

  if (!token) {
    return (
      <p>
        Por favor, <Link to='sign-in'>faça login</Link> ou{' '}
        <Link to='sign-up'>cadastre-se</Link>.
      </p>
    );
  }
  if (!formsOfPayment) {
    return '';
  }

  return (
    <>
      <Header />
      <Container>
        <p>Total: </p>
        <form>
          <p onClick={() => setHide(!hide)}>Adicionar forma de pagamento</p>
          {hide ? (
            ''
          ) : (
            <>
              <button value='credit' onClick={(e) => handleClickAdd(e)}>
                Cartão de crédito
              </button>
              <button value='blood' onClick={(e) => handleClickAdd(e)}>
                Pacto de sangue
              </button>
            </>
          )}
        </form>
        {formsOfPayment.map((data) => (
          <FormOfPayment {...data} />
        ))}
      </Container>
    </>
  );
}
