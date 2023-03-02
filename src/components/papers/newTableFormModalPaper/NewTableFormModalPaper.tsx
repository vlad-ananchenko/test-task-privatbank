import { ReactNode } from 'react';

import './newTableFormModalPaper.css';

type INewTableFormModalPaperProps = {
  children: ReactNode;
};

const NewTableFormModalPaper = ({ children }: INewTableFormModalPaperProps) => (
  <div className="paper-container">{children}</div>
);

export default NewTableFormModalPaper;
