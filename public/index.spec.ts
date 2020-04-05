import { Index } from './index';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

describe('Index', () => {
  const component = new Index(
    Header,
    Footer
  );

  it('componentが初期化されること', () => {
    expect(component).toBeDefined();
  });
});
