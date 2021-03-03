import React, { ReactElement } from 'react';

// STyles
import { Wrapper, Container } from './MainTemplate.styles';

interface MainTemplateProps {
  children: ReactElement;
}

const MainTemplate: React.FC<MainTemplateProps> = ({
  children,
}: MainTemplateProps) => {
  return (
    <Container>
      <Wrapper>
        <div className="main">
          <h1>
            Wiser <span className="mark">Teaching</span> Platform
          </h1>
          {children}
        </div>
      </Wrapper>
    </Container>
  );
};

export default MainTemplate;
