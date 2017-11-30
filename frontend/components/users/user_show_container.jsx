import { connect } from 'react-redux';
import { fetchSongs, deleteSong } from '../../actions/song_actions';
import UserShow from './user_show';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../../actions/user_actions';
import { playSong, pauseSong, playNewSong } from '../../actions/player_actions';


const mapStateToProps = (state, ownProps) => {
  let currentUser = state.session.currentUser;
  let user = state.users[ownProps.match.userId];
  let songs = Object.keys(state.songs).map((key) =>
   state.songs[key]).filter((song) => song.userId === user.id);
  let player = state.player;
  return { songs, user, currentUser, player};
};


const mapDispatchToProps = (dispatch) => {
  return {
    deleteSong: (id) => dispatch(deleteSong(id)),
    playSong: () => dispatch(playSong()),
    pauseSong: () => dispatch(pauseSong()),
    playNewSong: (id) => dispatch(playNewSong(id))
  };
};

export default
  withRouter(connect(mapStateToProps,mapDispatchToProps)(UserShow));
