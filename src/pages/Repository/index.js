import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from "styled-components";

import { FiChevronLeft } from 'react-icons/fi';

import ClientRepository from '../../resources/RepoClient';

import logo from '../../assets/images/git-hub-logo.png';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: grey;
  &:hover {
    color: #adadad;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  width: 100%;
`

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  @media screen and (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`;

const Title = styled.strong`
  font-size: 25px; 
  color: '#2b2b2b';
  text-align: end;
  @media screen and (max-width: 600px) {
    font-size: 20px; 
  }
`;

const SubTitle = styled.p`
  font-size: 18px; 
  color: grey;
  margin-top: 4px;
  text-align: end;
  @media screen and (max-width: 600px) {
    font-size: 14px; 
  }
`;

const Item = styled.li`
  display: flex;
  flex-direction: row;
  padding: 15px;
  align-items: center;
  justify-content: start;
`;

const TitleInfo = styled.span`
  font-size: 30px; 
  margin-left: 10px;
  @media screen and (max-width: 600px) {
    font-size: 25px; 
  }
`;

const Info = styled.span`
  font-size: 40px; 
  margin-left: 10px;
  font-weight: bold;
  color: #2b2b2b;
  @media screen and (max-width: 600px) {
    font-size: 35px; 
  }
`;

function Repository() {
  const { author, name } = useParams();

  const [repo, setRepo] = useState('');

  useEffect(() => {
    async function fetchData() {
      const result = await ClientRepository.consultRepo(`${author}/${name}`);

      if (result.status === 200) {
        setRepo(result.data);
      }
    }

    fetchData();

  }, [author, name]);

  const styles = {
    divHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '30px',
    },

    divAvatar: {
      marginLeft: '15px',
    },

    divList: {
      marginLeft: '15px',
      marginTop: '30px',
    },

    divTitle: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1, marginLeft: '15px',
      alignItems: 'end',
    }
  }

  return (
    <>
      <div style={styles.divHeader}>
        <img src={logo} alt="Github" style={{ width: '120px' }} />
        <StyledLink to="/">
          <FiChevronLeft size={16} />
          Voltar
        </StyledLink>
      </div>

      <div>
        {
          repo &&
          <>
            <Header>
              <div style={styles.divAvatar}>
                <Avatar src={repo.owner.avatar_url} alt={repo.owner.login} />
              </div>
              <div style={styles.divTitle}>
                <Title>{repo.full_name}</Title>
                <SubTitle>{repo.description}</SubTitle>
              </div>
            </Header>
            <div style={styles.divList}>
              <ul>
                <Item>
                  <TitleInfo>Stars:</TitleInfo>
                  <Info>{repo.stargazers_count}</Info>
                </Item>
                <Item>
                  <TitleInfo>Forks: </TitleInfo>
                  <Info>{repo.forks_count}</Info>
                </Item>
                <Item>
                  <TitleInfo >Issues:</TitleInfo>
                  <Info>{repo.open_issues_count}</Info>
                </Item>
              </ul>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Repository;