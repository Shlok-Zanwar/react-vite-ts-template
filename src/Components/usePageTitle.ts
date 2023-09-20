// This a hook that will change the page title based on the current route and also the navbar title
// Every page / Component will
import { useDocumentTitle, useIsomorphicLayoutEffect } from 'usehooks-ts'
import { useAppDispatch } from '../Reducers/store';
import { gr_setNavbarTitle } from '../Reducers/globalReducer';

export const usePageTitle = (title: string, navbarTitle: string[] = []) => {
  useDocumentTitle(title);
  const dispatch = useAppDispatch();

  useIsomorphicLayoutEffect(() => {
    dispatch(gr_setNavbarTitle(navbarTitle));
  }, []);
}

export default usePageTitle;
