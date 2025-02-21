import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const Header = styled.header`
  height: 60px;
  background-color: #2196f3;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const SideNavigation = styled.nav`
  width: 240px;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NavButton = styled.button<{ active?: boolean }>`
  padding: 12px 16px;
  background-color: ${props => props.active ? '#2196f3' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#1976d2' : '#e0e0e0'};
  }
`;

const ContentArea = styled.main`
  flex: 1;
  overflow: hidden;
  background-color: #fafafa;
`;

const Footer = styled.footer`
  height: 40px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header>
        <h1>JSON Friendly</h1>
      </Header>
      <MainContent>
        <SideNavigation>
          <NavButton active>Parse/Visual</NavButton>
          <NavButton>Formatter/Beautifier</NavButton>
          <NavButton>Compare JSON</NavButton>
          <NavButton>Code Snippet Conversion</NavButton>
          <NavButton>YAML to JSON</NavButton>
          <NavButton>JSON to CSV / CSV to JSON</NavButton>
          <NavButton>Base64 Encoder/Decoder</NavButton>
        </SideNavigation>
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
      <Footer>
        Version 1.0.0
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;