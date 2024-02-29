import { store } from 'shared/redux/store';
import { Provider } from 'react-redux';
import { Header } from 'entities/header/ui';
import { MainPage } from './main';
export const Routing = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <MainPage />
      </Provider>
    </>
  );
};
