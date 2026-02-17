
import { PATH } from '../components'
import { DashboardHome, Events, NotFound, Users } from '../pages'
import { Route, Routes } from 'react-router-dom';

const DashboardRoute = () => {
  const routeList = [
        {id: 1, path: PATH.home, element: <DashboardHome/>},
        {id: 2, path: PATH.events, element: <Events/>},
        {id: 3, path: PATH.users, element: <Users/>},
        {id: 4, path: PATH.notFound, element: <NotFound/>}
    ]
    return(
        <Routes>
            {routeList.map(item => <Route key = { item.id } path = { item.path } element={ item.element } />)}
        </Routes>
    )
}

export default DashboardRoute
