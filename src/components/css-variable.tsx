import styled from 'styled-components';

const ContainerLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const CSSVariable = styled(ContainerLayout)`
  --menu-bg-color: #1a1c1d;
  --menu-font-color: #eee;
  --primary-color: #ce3334;
  --primary-font-color: #ce3334;
  --tag-bg-color: #8a8a8a;
  --tag-font-color: #fff;
  --border-color: #eee;
  --container-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  --container-border-radius: 4px;
  --container-initial-height: 90%;
  --container-initial-width: 90%;
  --article-padding: 64px;

  h1,h2,h3,h4,h5,h6 {
    color: var(--primary-font-color);
  }

  @media (max-width: 1200px) {
    --container-initial-height: 100%;
    --container-initial-width: 100%;
    --container-border-radius: 0;
    --article-padding: 32px;
  }
`;

export default CSSVariable;
