// import functions via scripts resources
import * as Enums from "../resources/constants/enums";

// import components
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

// import styles
import './index.scss';

export class Index {
  constructor(
    header: Header,
    footer: Footer
  ) {}
}

new Index(
  Header,
  Footer
);
