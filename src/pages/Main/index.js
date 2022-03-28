import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from "styled-components";

import { FiChevronRight } from 'react-icons/fi';

import ClientRepository from '../../resources/RepoClient';

import logo from '../../assets/images/git-hub-logo.png'

const Button = styled.button`
  background-color: grey;
  width: 200px;
  height: 80px;
  font-size: 20px;
  font-weight: bold; 
  color: white;
  padding: 5px 15px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #adadad;
  }
  @media screen and (max-width: 850px) {
    font-size: 15px;
    width: 100px;
    height: 60px;
  }
`;

const Input = styled.input`
  background-color: white;
  width: 630px;
  height: 80px;
  font-size: 18px;
  color: grey;
  padding: 5px 15px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 0.5px solid white;
  @media screen and (max-width: 850px) {
    font-size: 12px;
    width: 330px;
    height: 60px;
  }
`;

const Card = styled.div`
  background-color: white;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    transform: translateX(20px);
    box-shadow: 10px 10px 5px rgba(0,0,0,0.31);
  }
  @media screen and (max-width: 850px) {
    width: 420px;
    &:hover {
      transform: translateX(0px);
      box-shadow: 10px 10px 5px rgba(0,0,0,0.31);
    }
  }
`

const Logo = styled.img`
  width: 400px;
  padding: 50px;
  @media screen and (max-width: 850px) {
    width: 300px;
  }
`

const Form = styled.form`
  display: flex;
  align-items: center;
`

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: grey;
  &:hover {
    color: #2b2b2b;
  }
`;

const Avatar = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  @media screen and (max-width: 850px) {
    width: 64px;
    height: 64px;
  }
`;

const Title = styled.strong`
  font-size: 25px; 
  color: '#2b2b2b';
  text-align: end;
  @media screen and (max-width: 850px) {
    font-size: 15px; 
  }
`;

const SubTitle = styled.p`
  font-size: 18px; 
  color: grey;
  margin-top: 4px;
  text-align: end;
  @media screen and (max-width: 850px) {
    font-size: 12px; 
  }
`;

function Main() {

  const [repo, setRepo] = useState('');
  const [state, setState] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await ClientRepository.consultRepo(repo);

    if (result.status === 200) {
      setRepo(result.data);
      setState(true);
    } else {
      setState(false);
      toast.error('Repositorio não encontrado! Tente novamente!');
    }
  };

  const styles = {
    container: {
      width: '100%',
      height: '100%',
    },

    div: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },

    divTitle: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      margin: '0 30px',
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.div}>
        <Logo src={logo} alt="Github" />
        <Form onSubmit={handleSubmit}>
          <Input placeholder='Digite o autor/nome do repositorio' type="text" onChange={(e) => setRepo(e.target.value)} />
          <Button type='submit'>Pesquisar</Button>
        </Form>
        {state &&
          <StyledLink to={`/${repo.full_name}`}>
            <Card>
              <Avatar src={repo.owner.avatar_url} alt={repo.owner.login} />
              <div style={styles.divTitle}>
                <Title>{repo.full_name}</Title>
                <SubTitle>{repo.description}</SubTitle>
              </div>

              <FiChevronRight size={20} />
            </Card>
          </StyledLink>
        }
      </div>
    </div>
  )
}

export default Main;