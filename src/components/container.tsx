import styled from 'styled-components';

const ContainerLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const Container = styled(ContainerLayout)`
  h1,h2,h3,h4,h5,h6 {
    color: var(--primary-font-color);
  }
  --container-initial-height: 90%;
  --container-initial-width: 90%;
  --container-border-radius: 4px;
  --article-padding: 64px;

  @media (max-width: 1200px) {
    --container-initial-height: 100%;
    --container-initial-width: 100%;
    --container-border-radius: 0;
    --article-padding: 32px;
  }
`;

export default Container;
