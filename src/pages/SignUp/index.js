import React, { useState } from "react";
import api from "../../services/api";
import { Container, Form, Input, Button, StyledLink, Title } from "./style";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas devem ser idênticas");
      return;
    }

    const user = { ...formData };
    delete user.confirmPassword;

    try {
      await api.signUp(user);
    } catch (error) {
      console.error(error);
      alert("Erro! Tente novamente.");
    }
  }

  return (
    <Container>
      <Title>FangTastic</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          type="text"
          onChange={(e) => handleChange(e)}
          name="name"
          value={formData.name}
          required
        />
        <Input
          placeholder="E-mail"
          type="email"
          onChange={(e) => handleChange(e)}
          name="email"
          value={formData.email}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="password"
          value={formData.password}
          required
        />
        <Input
          placeholder="Confirme a senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="confirmPassword"
          value={formData.confirmPassword}
          required
        />
        <Button type="submit">Cadastrar</Button>
      </Form>
      <StyledLink>Já tem uma conta? Entre Agora</StyledLink>
    </Container>
  );
}
