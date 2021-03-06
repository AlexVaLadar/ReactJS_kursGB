import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';
import { loadProfile } from '../actions/profileActions';
import CircularProgress from 'material-ui/CircularProgress';

class Profile extends React.Component {

  static propTypes = {
    data:      PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.loadProfile();
  }

  render() {
    if (this.props.isLoading) {
      return <CircularProgress />
    }
    const { name, phone, email } = this.props.data;
    return <div className="background-field">
      <div className="header">
        <AppBar
          title="Chat on React"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        >

          <span style={ { fontSize: '20px', color: 'white', margin: '3%' } }>Profile</span>
          <Link to="/">
            <IconMenu
              className="icon-menu"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
            </IconMenu>
          </Link>
        </AppBar>
      </div>
      <div className="body-block">
        <div className="profile-block">
          <span className="message">
            <p className="bold">Имя: </p>
              { name }
            <p className="bold">Номер телефона: </p>
              { phone }
            <p className="bold">Email: </p>
              { email }
          </span>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({ profileReducer }) => ({
  data: profileReducer.data,
  isLoading: profileReducer.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);