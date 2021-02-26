import React, { ReactElement } from 'react';

// STyles
import Wrapper from './MainTemplate.styles';

interface MainTemplateProps {
  children: ReactElement;
}

const MainTemplate: React.FC<MainTemplateProps> = ({
  children,
}: MainTemplateProps) => {
  return (
    <Wrapper>
      <div className="main">
        <h1>
          Wiser <span className="mark">Teaching</span> Platform
        </h1>
        {children}
      </div>
    </Wrapper>
  );
};

export default MainTemplate;
