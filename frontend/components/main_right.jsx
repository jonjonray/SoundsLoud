import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import SongShowContainer from './songs/song_show_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import PlaceholderCloud from './placeholder_cloud';


const MainRight = () => (
  <div className="main-right">
    <Switch>
    <ProtectedRoute path="/songs/:songId" component={SongShowContainer} />
    <ProtectedRoute path="/songs" component={PlaceholderCloud} />
    </Switch>
  </div>
);

export default MainRight;
