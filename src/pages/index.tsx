import { store } from 'shared/api/redux';
import { Provider } from 'react-redux';
import { Header } from 'entities/header';
import { MainPage } from './main';
export const Routing = () => {
  return (
    <Provider store={store}>
      <Header />
      <MainPage />
    </Provider>
  );
};
